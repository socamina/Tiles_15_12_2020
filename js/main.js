const GRID = {
  rows: 13,
  cols: 21,
  cellSize: 25,
};

let CELLS = []; //2dArray

let level = 0;
let PLAYER_ID, OPPONENT_ID;

let OPPONENT, PLAYER;
let OPPONENT_TARGET, PLAYER_TARGET;

let LEVEL_STARTED = false;

/**
 *
 * ECOUTER LES CHANGEMENT DE LEVEL DEPUIS FB
 */
DATABASE.ref("level").on("value", (snap) => {
  const val = snap.val();
  //on passe l'info à toutes les cellules que le level a changé....
  // LE RESTE SE PASSE DANS LA CLASSE CELL
  const allCELLS = [].concat(...CELLS);
  allCELLS.forEach((item) => {
    item.level = val;
  });
});

window.addEventListener("load", () => {
  const urlParameter = new URLSearchParams(window.location.search);
  // PLAYER_ID = urlParameter.get("player");
  PLAYER_ID = window.location.hash.replace("#", "");
  OPPONENT_ID = PLAYER_ID === "player_1" ? "player_2" : "player_1";

  let TURN;

  showStartPannel();

  if (!PLAYER_ID)
    alert(
      'Please set the url hash to "player_1" or "player_2"\n\nEx: http://localhost:5501/#player_1"'
    );

  initTurn();
  createPlayers();
  createTargets();
  createGrid();
  PLAYER.detectTarget();

  if (PLAYER_ID === "player_1") {
    console.log("I am admin and can modify the grid and place players");
    nextLevel();
  }

  resizeContainer();
});

function randomPosition(isOdd) {
  let col, row;

  if (!isOdd) {
    col = Math.floor((GRID.cols / 2 - 1) * Math.random()) * 2 + 1;
    row = Math.floor((GRID.rows / 2 - 1) * Math.random()) * 2 + 1;
  } else {
    col = Math.floor((GRID.cols / 2) * Math.random()) * 2;
    row = Math.floor((GRID.rows / 2 - 1) * Math.random()) * 2 + 1;
  }
  return { col, row };
}

function createPlayers() {
  PLAYER = new Player(PLAYER_ID);
  OPPONENT = new Player(OPPONENT_ID);
}

function createTargets() {
  PLAYER_TARGET = new Target(PLAYER_ID);
  OPPONENT_TARGET = new Target(OPPONENT_ID);
}

function nextLevel() {
  console.log("level is next");
  let isOdd = Math.round(Math.random()) ? "player_1" : "player_2";

  let p1pos = randomPosition(isOdd);
  let p2pos = randomPosition(!isOdd);

  let t1pos = randomPosition(isOdd);
  let t2pos = randomPosition(!isOdd);

  //console.log(p1pos, p2pos, t1pos, t2pos);

  PLAYER.requestMove(p1pos.col, p1pos.row);
  OPPONENT.requestMove(p2pos.col, p2pos.row);

  PLAYER_TARGET.showTarget(t1pos.col, t1pos.row);
  OPPONENT_TARGET.showTarget(t2pos.col, t2pos.row);
  //console.log(PLAYER_TARGET);

  randomizeGrid();

  level++;
  SEND_MESSAGE("level", level);
  PLAYER.detectTarget();
  console.log(level);

  if (PLAYER_ID && OPPONENT_ID) {
    DATABASE.ref("level").on("value", (snap) => {
      level = snap.val();
      document.getElementById("level").innerHTML = `level ${level}`;
    });
  }
}

let keysPressed = {};
document.addEventListener("keydown", (event) => {
  keysPressed[event.key] = true;

  PLAYER.detectTarget();
  // if (keysPressed["ArrowUp"] && event.key == "ArrowLeft") {
  //   PLAYER.requestMoveTo(-1, -1);
  // } else if (keysPressed["ArrowUp"] && event.key == "ArrowRight") {
  //   PLAYER.requestMoveTo(1, -1);
  // } else if (keysPressed["ArrowDown"] && event.key == "ArrowRight") {
  //   PLAYER.requestMoveTo(1, 1);
  // } else if (keysPressed["ArrowDown"] && event.key == "ArrowLeft") {
  //   PLAYER.requestMoveTo(-1, 1);
  // }
  if (event.key == "è" && TURN === PLAYER_ID) {
    PLAYER.requestMoveTo(-1, -1);
    swapTurn();
  } else if (event.key == "Dead" && TURN === PLAYER_ID) {
    PLAYER.requestMoveTo(1, -1);
    swapTurn();
  } else if (event.key == "à" && TURN === PLAYER_ID) {
    PLAYER.requestMoveTo(1, 1);
    swapTurn();
  } else if (event.key == "é" && TURN === PLAYER_ID) {
    PLAYER.requestMoveTo(-1, 1);
    swapTurn();
  }
});

document.addEventListener("keyup", (event) => {
  delete keysPressed[event.key];
});

function resizeContainer() {
  const container = document.querySelector(".container");
  container.style.setProperty("--cellSize", 70 + "px");
  container.style.setProperty("--cols", GRID.cols);
  container.style.setProperty("--rows", GRID.rows);
}

function createGrid() {
  for (let row = 0; row < GRID.rows; row++) {
    const rows = [];
    CELLS[row] = rows;

    for (let col = 0; col < GRID.cols; col++) {
      rows[col] = new Cell(col, row, 0, false, level, CELLS);
    }
  }
}

function randomizeGrid() {
  for (let row = 0; row < GRID.rows; row++) {
    let cols = CELLS[row];
    for (let col = 0; col < GRID.cols; col++) {
      let cell = cols[col];
      cell.requestRotateTo(Math.round(Math.random()) * 90);
    }
  }
  // for (let row = 0; row < GRID.rows; row++) {
  //   const rows = [];
  //   // CELLS[row] = rows;

  //   for (let col = 0; col < GRID.cols; col++) {

  //     // rows[col] = new Cell(col, row, 0, false, level);
  //   }
  // }
  // for (let row = 0; row < GRID.rows; row++) {
  //   // const rows = [];
  //   // CELLS[row] = rows;

  //   const rows[row]

  //   for (let col = 0; col < GRID.cols; col++) {
  //   //   rows[col] = new Cell(col, row, 0, false, level);

  //   }
  // }
}

function showStartPannel() {
  $("#startScreen").css("left", "0");
}
function hideStartPannel() {
  $("#startScreen").css("left", "-100%");
}

function showWinPannel() {
  $("#winScreen").css("left", "0");
}
function hideWinPannel() {
  $("#winScreen").css("left", "100%");
}

function delayNextLevel() {
  setTimeout(nextLevel, 1000);
}

function delayInit() {
  setTimeout(init, 1000);
}

// function turnRandomCell(level){
//   const rotatingCell = [];
//   for(i=0; i<level; i++){
//     const col = Math.floor(Math.random()*GRID.cols);
//     const row = Math.floor(Math.random()*GRID.rows);
//     CELLS[row][col].rotateCell(null);
//     // rotatingCell.push({col:col, row:row})
//   }
//   // rotatingCell.forEach((item, index)=>{
//   //   // console.log(CELLS[item.row][item.col]);
//   //   //vérifier sens grille
//   //   CELLS[item.row][item.col].rotateCell(null);
//   // });
// }

// function showDebugPoints() {
//   const debugGrid = document.querySelector(".container .debug-grid");

//   for (let row = 0; row < GRID.rows - 1; row++) {
//     for (let col = 0; col < GRID.cols - 1; col++) {
//       createDebugPoint(col, row, debugGrid);
//     }
//   }
// }

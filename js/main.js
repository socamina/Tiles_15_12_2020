const GRID = {
  rows: 12,
  cols: 16,
  cellSize: 25,
};

let CELLS = []; //2dArray

let level = -1;
let PLAYER_ID, OPPONENT_ID;

let OPPONENT, PLAYER;
let OPPONENTTARGET, PLAYERTARGET;

let LEVEL_STARTED = false;

window.addEventListener("load", () => {
  const urlParameter = new URLSearchParams(window.location.search);
  // PLAYER_ID = urlParameter.get("player");
  PLAYER_ID = window.location.hash.replace("#", "");
  OPPONENT_ID = PLAYER_ID === "player_1" ? "player_2" : "player_1";
  if (!PLAYER_ID)
    alert(
      'Please set the url hash to "player_1" or "player_2"\n\nEx: http://localhost:5501/#player_1"'
    );

  createPlayers();
  createGrid();

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

  // PLAYERTARGET = new Target(t1pos.col, t1pos.row);
  // OPPONENTTARGET = new Target(t2pos.col, t2pos.row);

  // PLAYER.setTarget(PLAYERTARGET);
  // OPPONENT.setTarget(OPPONENTTARGET);
}

function nextLevel() {
  let isOdd = Math.round(Math.random()) ? "player_1" : "player_2";

  let p1pos = randomPosition(isOdd);
  let p2pos = randomPosition(!isOdd);

  let t1pos = randomPosition(isOdd);
  let t2pos = randomPosition(!isOdd);

  console.log(p1pos, p2pos, t1pos, t2pos);

  PLAYER.requestMove(p1pos.col, p1pos.row);
  OPPONENT.requestMove(p2pos.col, p2pos.row);

  // PLAYERTARGET = new Target(t1pos.col, t1pos.row);
  // OPPONENTTARGET = new Target(t2pos.col, t2pos.row);

  randomizeGrid();

  level++;
  SEND_MESSAGE("level", level);
}

// function turnRandomCell(level) {
//   const rotatingCell = [];
//   for (i = 0; i < level; i++) {
//     const col = Math.floor(Math.random() * GRID.cols);
//     const row = Math.floor(Math.random() * GRID.rows);
//     CELLS[row][col].rotateCell(null);
//     // rotatingCell.push({col:col, row:row})
//   }
//   // rotatingCell.forEach((item, index)=>{
//   //   // console.log(CELLS[item.row][item.col]);
//   //   //vérifier sens grille
//   //   CELLS[item.row][item.col].rotateCell(null);
//   // });
// }

let keysPressed = {};
document.addEventListener("keydown", (event) => {
  keysPressed[event.key] = true;

  // if (keysPressed["ArrowUp"] && event.key == "ArrowLeft") {
  //   PLAYER.move(-1, -1);
  // } else if (keysPressed["ArrowUp"] && event.key == "ArrowRight") {
  //   PLAYER.move(1, -1);
  // } else if (keysPressed["ArrowDown"] && event.key == "ArrowRight") {
  //   PLAYER.move(1, 1);
  // } else if (keysPressed["ArrowDown"] && event.key == "ArrowLeft") {
  //   PLAYER.move(-1, 1);
  // }

  if (event.key == "è") {
    PLAYER.requestMoveTo(-1, -1);
  } else if (event.key == "Dead") {
    PLAYER.requestMoveTo(1, -1);
  } else if (event.key == "à") {
    PLAYER.requestMoveTo(1, 1);
  } else if (event.key == "é") {
    PLAYER.requestMoveTo(-1, 1);
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
      rows[col] = new Cell(col, row, 0, false, level);
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

// function showDebugPoints() {
//   const debugGrid = document.querySelector(".container .debug-grid");

//   for (let row = 0; row < GRID.rows - 1; row++) {
//     for (let col = 0; col < GRID.cols - 1; col++) {
//       createDebugPoint(col, row, debugGrid);
//     }
//   }
// }

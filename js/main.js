// REMPLIR un tableau avec des cellules + class Cell

const GRID = {
  rows: 12,
  cols: 16,
  cellSize: 25,
};

const CELLS = []; //2dArray

let player1PosX = 0; //Math.floor(Math.random()*7)*2; //0;
let player1PosY = 0; //Math.floor(Math.random()*5)*2; //0;

let target1PosX = 12; //Math.floor(Math.random()*7)*2 //12; //est ce que position aléatoire de 2 en fonction du joueur possible eou je dois choisir dès le début ?
let target1PosY = 4; //Math.floor(Math.random()*5)*2;//4

let player2PosX = 9;
let player2PosY = 5; 

let target2PosX = 5; 
let target2PosY = 7; 


let level = -1;
let playerId;

window.addEventListener("load", () => {
  const urlParameter = new URLSearchParams(window.location.search);
  playerId = urlParameter.get("player");
  resizeContainer();

  const data = {
    id: playerId,
    player1PosXdata: player1PosX,
    player1PosYdata: player1PosY,
    target1PosXdata: target1PosX,
    target1PosYdata: target1PosY,

    player2PosXdata: player1PosX,
    player2PosYdata: player1PosY,
    target2PosXdata: target1PosX,
    target2PosYdata: target1PosY,
  };
  SEND_MESSAGE("TILES", data);

  createLevel();
});

function createLevel() {
  level++;
  createGrid();
  createPlayerPositions();

  PLAYER.create(player1PosX, player1PosY);
  PLAYER.create(player2PosX, player2PosY);
  // PLAYER.create(0, 0);
  console.log(player1PosX, player1PosY);
  console.log(player2PosX, player2PosY);

  TARGET.create(target1PosX, target1PosY);
  TARGET.create(target2PosX, target2PosY);
  // console.log(targetPosX,targetPosY);
}

function turnRandomCell(level) {
  const rotatingCell = [];
  for (i = 0; i < level; i++) {
    const col = Math.floor(Math.random() * GRID.cols);
    const row = Math.floor(Math.random() * GRID.rows);
    CELLS[row][col].rotateCell(null);
    // rotatingCell.push({col:col, row:row})
  }
  // rotatingCell.forEach((item, index)=>{
  //   // console.log(CELLS[item.row][item.col]);
  //   //vérifier sens grille
  //   CELLS[item.row][item.col].rotateCell(null);
  // });
}

let keysPressed = {};
document.addEventListener("keydown", (event) => {
  keysPressed[event.key] = true;

  if (keysPressed["ArrowUp"] && event.key == "ArrowLeft") {
    PLAYER.move(-1, -1);
  } else if (keysPressed["ArrowUp"] && event.key == "ArrowRight") {
    PLAYER.move(1, -1);
  } else if (keysPressed["ArrowDown"] && event.key == "ArrowRight") {
    PLAYER.move(1, 1);
  } else if (keysPressed["ArrowDown"] && event.key == "ArrowLeft") {
    PLAYER.move(-1, 1);
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

function createPlayerPositions() {
  const debugGrid = document.querySelector(".container .debug-grid");

  for (let row = 0; row < GRID.rows - 1; row++) {
    for (let col = 0; col < GRID.cols - 1; col++) {
      createDebugPoint(col, row, debugGrid);
    }
  }
}

// REMPLIR un tableau avec des cellules + class Cell

//paspossible de faire un rect?

const GRID = {
  rows: 11,
  cols: 17,
  cellSize: 25,
};

const CELLS = []; //2dArray

let playerPosX = 0; //Math.floor(Math.random()*7); //0;
let playerPosY = 0; //Math.floor(Math.random()*7); //0;

let targetPosX = 12; //est ce que position aléatoire de 2 en fonction du joueur possible eou je dois choisir dès le début ?
let targetPosY = 4;
let level = -1;

window.addEventListener("load", () => {
  resizeContainer();
  //mettre dans une autre fonction create 
 createLevel();
});

function createLevel(){
  level++
  createGrid();
  createPlayerPositions();

  PLAYER.create(0, 0);
   console.log(playerPosX, playerPosY);
  TARGET.create(targetPosX, targetPosY);
  // console.log(targetPosX,targetPosY);
}

function turnRandomCell(level){
  const rotatingCell = [];
  for(i=0; i<level; i++){
    const col = Math.floor(Math.random()*GRID.cols);
    const row = Math.floor(Math.random()*GRID.rows);
    CELLS[row][col].rotateCell(null);
    // rotatingCell.push({col:col, row:row})
  }
  // rotatingCell.forEach((item, index)=>{
  //   // console.log(CELLS[item.row][item.col]);
  //   //vérifier sens grille
  //   CELLS[item.row][item.col].rotateCell(null);
  // });
}

window.addEventListener("keydown", (event) => {
  // console.log(event.key, 'Dead');

  // if (event.key == "ArrowUp") {
  //   PLAYER.move(-1, -1);
  // } else if (event.key == "ArrowRight") {
  //   PLAYER.move(1, -1);
  // } else if (event.key == "ArrowDown") {
  //   PLAYER.move(1, 1);
  // } else if (event.key == "ArrowLeft") {
  //   PLAYER.move(-1, 1);
  // }

  if (event.key == "è") {
    PLAYER.move(-1, -1);
  } else if (event.key == "Dead") {
    PLAYER.move(1, -1);
  } else if (event.key == "à") {
    PLAYER.move(1, 1);
  } else if (event.key == "é") {
    PLAYER.move(-1, 1);
  }

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
      rows[col] = new Cell(col, row, 0, false,level);
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

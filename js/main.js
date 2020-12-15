// REMPLIR un tableau avec des cellules + class Cell

const GRID = {
  rows:11,
  cols: 11,
  cellSize:40,
};

const CELLS = []; //2dArray
let distX= 1;
let distY= 1;

let playerPosX =0; //Math.floor(Math.random()*7); //0;
let playerPosY =0; //Math.floor(Math.random()*7); //0;

let targetPosX = Math.floor(Math.random()*7);
let targetPosY = Math.floor(Math.random()*7);

window.addEventListener("load", () => {
  resizeContainer();
  createGrid();
  createPlayerPositions();

  //  PLAYER.create(1,1);
  PLAYER.create(playerPosX,playerPosY);
  console.log(playerPosX,playerPosY);
  TARGET.create(targetPosX,targetPosY);
  console.log(targetPosX,targetPosY);
});

window.addEventListener("keydown", (event) => {

  //haut gauche R
  if ((event.keyCode == 82)) {
    // console.log("top left");
    if (distX>= 2 && distY>=2){
    distX = distX-1;
    distY = distY-1;
  } 
    PLAYER.move(distX,distY);
}

  //haut droite Z
  else if ((event.keyCode == 90)) {
    // console.log("top right");
    if (distX<=(GRID.rows-2) && distY>=2){
    distX = distX+1;
    distY = distY-1;
    }
    PLAYER.move(distX,distY);
  }
     //bas droite N
     else if ((event.keyCode == 78)) {
      // console.log("bottom right");
      if (distX<=(GRID.rows-2) && distY<=(GRID.cols-2)){
      distX = distX+1;
      distY = distY+1;
    }
      PLAYER.move(distX,distY);
    }
     //bas gauche C
    else if ((event.keyCode == 67)) {
      // console.log("bottom left");
      if (distX>=2 && distY<=(GRID.cols-2)){
      distX = distX-1;
      distY =distY+1;
      }
      PLAYER.move(distX,distY);
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
      rows[col] = new Cell(col, row, 0);
    }
  }
}

function createPlayerPositions() {
  const debugGrid = document.querySelector(".container .debug-grid");

  for (let row = 0; row < GRID.rows-1; row++) {
    for (let col = 0; col < GRID.cols-1; col++) {
      createDebugPoint(col, row, debugGrid);
    }
  }
}

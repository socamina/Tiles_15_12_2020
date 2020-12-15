// REMPLIR un tableau avec des cellules + class Cell

//paspossible de faire un rect?

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

let targetPosX = 7; //est ce que position aléatoire de 2 en fonction du joueur possible eou je dois choisir dès le début ?
let targetPosY = 3;

window.addEventListener("load", () => {
  resizeContainer();
  createGrid();
  createPlayerPositions();

  //  PLAYER.create(1,1);
  PLAYER.create(playerPosX,playerPosY);
  console.log(playerPosX,playerPosY);
  TARGET.create(targetPosX,targetPosY);
  // console.log(targetPosX,targetPosY);
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

// if ((event.keyCode == 82)) {
//       // console.log("top left");
//       if (playerPosX>0 && playerPosX<GRID.cols-1 && playerPosY>0 && playerPosY<GRID.rows-1){
//       playerPosX = playerPosX++;
//       playerPosY= playerPosY++;
//     } 
//       PLAYER.move(playerPosX,playerPosY);
//       // console.log(playerPosX,playerPosY);
//   }

  //haut droite Z
//   else if ((event.keyCode == 90)) {
//     // console.log("top right");
//     if (playerPosX>0 && playerPosX<GRID.cols-1 && playerPosY>0 && playerPosY<GRID.rows-1){
//     playerPosX = playerPosX++;
//     playerPosY= playerPosY--;
//   } 
//     PLAYER.move(playerPosX,playerPosY);
//     console.log(playerPosX,playerPosY);
// }
  
  if ((event.keyCode == 90)) {
    // console.log("top right");
    if (distX<=(GRID.rows-2) && distY>=2){
    distX = distX+1;
    distY = distY-1;
    }
    PLAYER.move(distX,distY);
  }


     //bas droite N
  //   else if ((event.keyCode == 78)) {
  //     // console.log("bottom right");
  //     if (playerPosX>0 && playerPosX<GRID.cols-1 && playerPosY>0 && playerPosY<GRID.rows-1){
  //     playerPosX = playerPosX++;
  //     playerPosY= playerPosY++;
  //   } 
  //     PLAYER.move(playerPosX,playerPosY);
  //     console.log(playerPosX,playerPosY);
  // }
  
     else if ((event.keyCode == 78)) {
      // console.log("bottom right");
      if (distX<=(GRID.rows-2) && distY<=(GRID.cols-2)){
      distX = distX+1;
      distY = distY+1;
    }
      PLAYER.move(distX,distY);
    }

     //bas gauche C

  //    if ((event.keyCode == 67)) {
  //     // console.log("bottom left");
  //     if (playerPosX>0 && playerPosX<GRID.cols-1 && playerPosY>0 && playerPosY<GRID.rows-1){
  //     playerPosX = playerPosX--;
  //     playerPosY= playerPosY++;
  //   } 
  //     PLAYER.move(playerPosX,playerPosY);
  //     console.log(playerPosX,playerPosY);
  // }
    
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
      rows[col] = new Cell(col, row, 0, false);
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

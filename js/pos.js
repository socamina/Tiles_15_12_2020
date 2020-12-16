function createDebugPoint(col, row, container) {
  let cellTemplate = document.querySelector(".template .debug-cell");
  let cell = cellTemplate.cloneNode(true);

  container.appendChild(cell);
  cell.style.setProperty("--col", col);
  cell.style.setProperty("--row", row);
}

const PLAYER = {

    create: function(col, row) {
        let cellTemplate = document.querySelector(".template .player");
        let container = document.querySelector('.container');
        let cell = cellTemplate.cloneNode(true);
        container.appendChild(cell);
        cell.style.setProperty('--col', col);
        cell.style.setProperty('--row', row);

        this.elem = cell;
    },

    move: function(posX, posY) {
       let player = document.querySelector(".player");
       player.style.setProperty('--posX', posX);
       player.style.setProperty('--posY', posY);
        posX = 1;
        //console.log(posX);
        posY = posY++;
        this.detectTarget();
        this.detectNotAllowed();
    },



    detectTarget: function()  {

    // console.log(playerPosX,playerPosY);
    // console.log(targetPosX,targetPosY);
    console.log(distX,distY);

    //if coordonnées player = coordonnées target, win. and restart. (later on, move from level to next)
    if(distX === targetPosX  && distY === targetPosY){
        console.log('touché');
    }
      },

    detectNotAllowed: function() {
      //RESOUDRE PROBLEMEE DE LA FOCNTION MOVE FIRST
    //     -récupère les 4 cases qui entourent le joueur
    //     -récupérer leur état,
    //    ---  diagonale en haut à gauche en bas à droite état initial non autorisé
    //    --- diag. haut droite bas gauche état initial autorisé

    // if(CELLS.posInit ==true){
      // //player can move in 2-4
      // console.log(CELL.posInit, "from pos.js");
    // } else {
      // //player can move in 1-3
      // console.log(CELL.posInit, "from pos.js");
    // }
    }


}
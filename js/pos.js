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

    console.log(playerPosX,playerPosY);
    console.log(targetPosX,targetPosY);
    console.log(distX,distY);
    //if coordonnées player = coordonnées target, win. and restart. (later on, move from level to next)
    if(distX === targetPosX  && distY === targetPosY){
        console.log('touché');
    }
      },

    detectNotAllowed: function() {
//checker les 4 cases autour du player (par rapport a la position), réciuperer les 4 cases qui l'entourent. 
//interroger les 4 cases ou la case de la direction dans laquelle j'aimerais aller
///!\ récupérer la bonne casse et l'état de rotation- 
        //swicth cases ? modulo car 1 out of 2 authorized.
    }


}
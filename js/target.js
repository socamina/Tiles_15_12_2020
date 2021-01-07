function createDebugPoint(col, row, container) {
    let cellTemplate = document.querySelector(".template .debug-cell");
    let cell = cellTemplate.cloneNode(true);
  
    container.appendChild(cell);
    cell.style.setProperty("--col", col);
    cell.style.setProperty("--row", row);
  }
  class Target {
    constructor(col, row) {
          let cellTemplate = document.querySelector(".template .target");
          let container = document.querySelector('.container');
          let cell = cellTemplate.cloneNode(true);
          container.appendChild(cell);
          cell.style.setProperty('--col', col);
          cell.style.setProperty('--row', row);
  
          this.elem = cell;
      }
  
  }



//   const TARGET = {
//     create: function(col, row) {
//         constructor(col, row) {
//         let cellTemplate = document.querySelector(".template .target");
//         let container = document.querySelector('.container');
//         let cell = cellTemplate.cloneNode(true);
//         container.appendChild(cell);
//         cell.style.setProperty('--col', col);
//         cell.style.setProperty('--row', row);

//         this.elem = cell;
//     },

// }

//   const PLAYER = {
//     create: function (col, row) {
//       let cellTemplate = document.querySelector(".template .player");
//       let container = document.querySelector(".container");
//       let player = cellTemplate.cloneNode(true);
//       container.appendChild(player);
  
//       this.col = col;
//       this.row = row;
//       this.player = player;
  
//       player.style.setProperty("--posX", this.col);
//       player.style.setProperty("--posY", this.row);
  
//       player.addEventListener('animationend', (evt) => {
//         if(evt.target === this.player, evt.animationName === 'collide')
//           player.classList.remove('collide')
//       });
//     },

//   class Player {
//     constructor(col, row) {
//       let cellTemplate = document.querySelector(".template .player");
//       let container = document.querySelector(".container");
//       let player = cellTemplate.cloneNode(true);
//       container.appendChild(player);
  
//       this.col = col;
//       this.row = row;
//       this.player = player;
  
//       player.style.setProperty("--posX", this.col);
//       player.style.setProperty("--posY", this.row);
  
//       player.addEventListener("animationend", (evt) => {
//         if ((evt.target === this.player, evt.animationName === "collide"))
//           player.classList.remove("collide");
//       });
//     }
class Target {
  constructor(playerId, col, row, level, detected) {
    let cellTemplate = document.querySelector(".template .target");
    let container = document.querySelector(".container");
    let cell = cellTemplate.cloneNode(true);
    container.appendChild(cell);
    cell.style.setProperty("--col", col);
    cell.style.setProperty("--row", row);

    this.elem = cell;
    this.col = 0;
    this.row = 0;
    this.level = level;
    
    this.targetId = playerId;
    console.lo
    
    this.databaseEntry = playerId;
    // console.log(playerId);

    if(this.targetId === PLAYER_ID){
      cell.classList.add('activeTarget')
    }

    this.detected = false;
    
    
    DATABASE.ref(this.databaseEntry + "/targetPosition").on("value", (snap) => {
      const {col, row} = snap.val();
      this.move(col, row);
    });

    // this.create(col, row);
    // this.rotateTo(angle); 
  }
  showTarget(col,row){
    SEND_MESSAGE(this.databaseEntry + "/targetPosition", {col,row});
  }

  move(col, row) {
    let cell = this.elem;
    //console.log(cell);
    this.col = col;
    this.row = row;
    cell.style.setProperty("--col", this.col);
    cell.style.setProperty("--row", this.row);
  }
}






// function createDebugPoint(col, row, container) {
//   let cellTemplate = document.querySelector(".template .debug-cell");
//   let cell = cellTemplate.cloneNode(true);

//   container.appendChild(cell);
//   cell.style.setProperty("--col", col);
//   cell.style.setProperty("--row", row);
// }

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

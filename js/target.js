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
          this.col = col;
          this.row = row;
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

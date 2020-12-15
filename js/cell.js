class Cell {
  constructor(col, row, angle, posInit) {
    this.col = col;
    this.row = row;
    this.angle = angle;
  //  this.posInit = false;

    this.create(col, row);
    this.rotateTo(angle);
  }

  create(col, row) {
    let cellTemplate = document.querySelector(".template .cell");
    let container = document.querySelector(".container .cell-grid");
    let cell = cellTemplate.cloneNode(true);
    this.elem = cell;

    container.appendChild(cell);
    cell.style.setProperty("--col", col);
    cell.style.setProperty("--row", row);
    cell.style.setProperty("--angle", 90);
    
    let posInit = true;

    cell.addEventListener("click", () => {
      this.rotate(90);
      posInit = !posInit;
      // console.log(posInit);
    });
  }

  rotate(angle) {
    this.angle += angle;
    this.rotateTo(this.angle);
  }

  rotateTo(angle) {
    this.angle = angle;
    this.elem.style.setProperty("--angle", this.angle + "deg");

    //si case cliquéee, on passee d'un booléan true à false
    
  }
}

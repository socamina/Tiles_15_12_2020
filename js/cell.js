class Cell {
  constructor(col, row, angle, posInit, level) {
    this.col = col;
    this.row = row;
    this.angle = angle;
    this.level = level;

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

    this.isHorizontal = true;

    cell.addEventListener("click", this.rotateCell.bind(this));
  }

  rotateCell(e) {
    // console.log(CELLS);
    this.rotate(90);
    this.isHorizontal = !this.isHorizontal;
    // console.log(this.isHorizontal, "in cell.js");
    if (e) turnRandomCell(this.level);
  }

  rotate(angle) {
    this.angle += angle;
    this.rotateTo(this.angle);
  }

  rotateTo(angle) {
    this.angle = angle;
    this.elem.style.setProperty("--angle", this.angle + "deg");
  }
}

class Cell {
  constructor(col, row, angle, posInit, level) {
    this.col = col;
    this.row = row;
    this.angle = angle;
    this.level = level;
    this.databaseEntry = "grid/cells/" + this.row + "/" + this.col;

    DATABASE.ref(this.databaseEntry).on("value", (snap) => {
      const { angle } = snap.val();
      this.rotateTo(angle)
    });

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

    cell.addEventListener("click", () => this.requestRotate(90));
  }

  requestRotate(angle) {
    this.requestRotateTo(this.angle + angle)
  }

  requestRotateTo(angle) {
    SEND_MESSAGE(this.databaseEntry + "/angle", angle);
  }

  rotate(angle) {
    this.angle += angle;
    this.rotateTo(this.angle);
  }

  rotateTo(angle) {
    this.angle = angle;
    this.isHorizontal = this.angle % 180 === 0; // isHorizontal 0, 180
    this.elem.style.setProperty("--angle", this.angle + "deg");
  }

  // updateDataBase() {
  //   SEND_MESSAGE("grid/cells", CELLS);
  // }
}

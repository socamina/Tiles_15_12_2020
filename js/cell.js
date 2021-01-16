class Cell {
  constructor(col, row, angle, posInit, level) {
    this.col = col;
    this.row = row;
    this.angle = angle;
    this.level = level;
    this.databaseEntry = "grid/cells/" + this.row + "/" + this.col;
    DATABASE.ref(this.databaseEntry).on("value", (snap) => {
      const { angle } = snap.val();
      this.rotateTo(angle);
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

    cell.addEventListener("click", () => {
      if(TURN === PLAYER_ID){
      this.requestRotate(90);
     // // ON AJOUTE DES ROTATION A DES CELLULES ALEATOIRES
      this.turnRandomCell();
     // //  this.connect.bind(this)
      swapTurn();
    }

    });
  }

  turnRandomCell() {
    // const rotatingCell = [];
    for (let i = 0; i < this.level * 3; i++) {
      const col = Math.floor(Math.random() * GRID.cols);
      const row = Math.floor(Math.random() * GRID.rows);
      CELLS[row][col].requestRotate(90);
    }
  }

 
  // connect(level){
  //   let i;
  //   for(i=0; i<level; i++){
  //     const col = Math.floor(Math.random()*GRID.cols);
  //     const row = Math.floor(Math.random()*GRID.rows);
  //     // CELLS[row][col].rotateCell(null);
  //     CELLS[row][col].requestRotate(90);
  // }}

  requestRotate(angle) {
    this.requestRotateTo(this.angle + angle);
    // this.connect();
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
}

function createDebugPoint(col, row, container) {
  let cellTemplate = document.querySelector(".template .debug-cell");
  let cell = cellTemplate.cloneNode(true);

  container.appendChild(cell);
  cell.style.setProperty("--col", col);
  cell.style.setProperty("--row", row);
}

const PLAYER = {
  create: function (col, row) {
    let cellTemplate = document.querySelector(".template .player");
    let container = document.querySelector(".container");
    let player = cellTemplate.cloneNode(true);
    container.appendChild(player);

    this.col = col;
    this.row = row;
    this.player = player;

    player.style.setProperty("--posX", this.col);
    player.style.setProperty("--posY", this.row);

    player.addEventListener("animationend", (evt) => {
      if ((evt.target === this.player, evt.animationName === "collide"))
        player.classList.remove("collide");
    });
  },

  move: function (moveX, moveY) {
    let newCol = this.col + moveX;
    let newRow = this.row + moveY;

    // boundaries collision
    if (newCol < 0) this.bumpToWall(moveX, moveY), (moveX = moveY = 0);
    else if (newCol > GRID.cols - 2)
      this.bumpToWall(moveX, moveY), (moveX = moveY = 0);

    if (newRow < 0) this.bumpToWall(moveX, moveY), (moveX = moveY = 0);
    else if (newRow > GRID.rows - 2)
      this.bumpToWall(moveX, moveY), (moveX = moveY = 0);

    newCol = this.col;
    newRow = this.row;

    let topWall = CELLS[newRow][newCol];
    let leftWall = CELLS[newRow + 1][newCol];
    let bottomWall = CELLS[newRow + 1][newCol + 1];
    let rightWall = CELLS[newRow][newCol + 1];

    let moveTop = moveY < 0 && moveX < 0;
    let moveLeft = moveY > 0 && moveX < 0;
    let moveRight = moveY < 0 && moveX > 0;
    let moveBottom = moveY > 0 && moveX > 0;

    if (moveTop && topWall.isHorizontal)
      this.bumpToWall(moveX, moveY), (moveX = moveY = 0);
    if (moveRight && !rightWall.isHorizontal)
      this.bumpToWall(moveX, moveY), (moveX = moveY = 0);
    if (moveBottom && bottomWall.isHorizontal)
      this.bumpToWall(moveX, moveY), (moveX = moveY = 0);
    if (moveLeft && !leftWall.isHorizontal)
      this.bumpToWall(moveX, moveY), (moveX = moveY = 0);

    this.col += moveX;
    this.row += moveY;

    let player = this.player;
    player.style.setProperty("--posX", this.col);
    player.style.setProperty("--posY", this.row);
    console.log(this.col, this.row);

    this.detectTarget();

    if (
      topWall.isHorizontal &&
      !rightWall.isHorizontal &&
      bottomWall.isHorizontal &&
      !leftWall.isHorizontal
    ) {
      console.log("you're trapped. GAME OVER!");
    }
  },

  bumpToWall: function (moveX, moveY) {
    let x = 0,
      y = 0;

    // console.log(moveX, moveY);

    if (moveX === 0 && moveY === 0)
      //BOTTOM RIGHT
      return;
    // this.player.classList.add('collide');

    let amplitude = 35;

    // console.log(moveX, moveY);

    this.player.style.setProperty("--bumpX", moveX * amplitude + "%");
    this.player.style.setProperty("--bumpY", moveY * amplitude + "%");
    this.player.classList.add("collide");
  },

  detectTarget: function () {
    //if coordonnées player = coordonnées target, win. and restart. (later on, move from level to next)
    if (playerId == 1 && this.col === target1PosX && this.row === target1PosY) {
      console.log("touché gagné!");
      createLevel();
    }
    if (playerId == 2 && this.col === target2PosX && this.row === target2PosY) {
      console.log("touché gagné!");
      createLevel();
    }
  },
};

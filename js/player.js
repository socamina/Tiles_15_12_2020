function createDebugPoint(col, row, container) {
  let cellTemplate = document.querySelector(".template .debug-cell");
  let cell = cellTemplate.cloneNode(true);

  container.appendChild(cell);
  cell.style.setProperty("--col", col);
  cell.style.setProperty("--row", row);
}

class Player {
  constructor(playerId) {
    let cellTemplate = document.querySelector(".template .player");
    let container = document.querySelector(".container");
    let player = cellTemplate.cloneNode(true);
    container.appendChild(player);

    this.col = 0;
    this.row = 0;

    this.playerId = playerId;
    this.databaseEntry = playerId;

    this.player = player;

    if(this.playerId === PLAYER_ID)
      player.classList.add('activePlayer');

    player.style.setProperty("--posX", this.col);
    player.style.setProperty("--posY", this.row);

    player.addEventListener("animationend", (evt) => {
      if ((evt.target === this.player, evt.animationName === "collide"))
        player.classList.remove("collide");
    });

    DATABASE.ref(this.databaseEntry + "/position").on("value", (snap) => {
      const {col, row} = snap.val();
      this.move(col, row);
    });

  
  }

  setTarget(target) {
    this.target = target;
  }

  // position(col, row) {
  //   let moveX = col - this.col;
  //   let moveY = row - this.row;
  //   this.move(moveX, moveY);
  // }


  requestMove(col, row) {
    // console.log(this.databaseEntry + "/position", col, row);
    // console.log(col, row);
    SEND_MESSAGE(this.databaseEntry + "/position", { col, row });
  }

  requestMoveTo(moveX, moveY) {
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

    // console.log(this.col, this.row);

    // this.detectTarget();

    if (
      topWall.isHorizontal &&
      !rightWall.isHorizontal &&
      bottomWall.isHorizontal &&
      !leftWall.isHorizontal
    ) {
      console.log("you're trapped. GAME OVER!");
    }

    this.requestMove(this.col + moveX, this.row + moveY);
  }

  move(col, row) {
    let player = this.player;
    this.col = col;
    this.row = row;
    player.style.setProperty("--posX", this.col);
    player.style.setProperty("--posY", this.row);
  }

  bumpToWall(moveX, moveY) {
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
  }

  detectTarget() {
    //console.log("moved");
    DATABASE.ref(this.databaseEntry).once("value", (snap) => {
      if(snap.val().position.col === snap.val().targetPosition.col && snap.val().position.row === snap.val().targetPosition.row){
        // console.log(this.playerId + "victory");
         showWinPannel();
         delayNextLevel();
        //  nextLevel();
      }
      
      // if (PLAYER_ID){
      //   showWinPannel();
      // } 
      //   OPPONENT_ID.showStartPannel;
      // }
      
      // this.move(col, row);
    });
  }

}

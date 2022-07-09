const createShip = (shipName, shipLength, direction, group) => {
  if (shipLength > 4 || shipLength < 1) {
    throw new Error("Wrong Length");
  } else
    return {
      shipName: shipName,
      shipLength: shipLength,
      direction: direction,
      group: group,
      array: [...Array(shipLength)],
      hit(hitPosition) {
        if (hitPosition >= this.array.shipLength || hitPosition < 0) {
          throw new Error("Wrong Position");
        }
        this.array[hitPosition] = "hit";
      },
      isSink() {
        return this.array.every((position) => position === "hit");
      },
    };
};

const selfShip1 = createShip("ship1", 1, "horizontal", "self");
const selfShip2 = createShip("ship2", 1, "horizontal", "self");
const selfShip3 = createShip("ship3", 1, "horizontal", "self");
const selfShip4 = createShip("ship4", 1, "horizontal", "self");
const selfShip5 = createShip("ship5", 2, "horizontal", "self");
const selfShip6 = createShip("ship6", 2, "horizontal", "self");
const selfShip7 = createShip("ship7", 2, "horizontal", "self");
const selfShip8 = createShip("ship8", 3, "horizontal", "self");
const selfShip9 = createShip("ship9", 3, "horizontal", "self");
const selfShip10 = createShip("ship10", 4, "horizontal", "self");

const rivalShip1 = createShip("ship1", 1, "horizontal", "rival");
const rivalShip2 = createShip("ship2", 1, "horizontal", "rival");
const rivalShip3 = createShip("ship3", 1, "horizontal", "rival");
const rivalShip4 = createShip("ship4", 1, "horizontal", "rival");
const rivalShip5 = createShip("ship5", 2, "horizontal", "rival");
const rivalShip6 = createShip("ship6", 2, "horizontal", "rival");
const rivalShip7 = createShip("ship7", 2, "horizontal", "rival");
const rivalShip8 = createShip("ship8", 3, "horizontal", "rival");
const rivalShip9 = createShip("ship9", 3, "horizontal", "rival");
const rivalShip10 = createShip("ship10", 4, "horizontal", "rival");

const createGameboard = () => {
  return {
    board: [
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ],
    placeShip(x, y, shipObj, direction) {
      let spaceAvailable = true;
      if (direction === "horizontal") {
        for (let i = 0; i < shipObj.shipLength; i++) {
          console.log(shipObj.shipName, direction, x, y + i, this.board[x][y + i]);
          if (this.board[x][y + i] !== null || this.board[x][y + i] === undefined) {
            spaceAvailable = false;
            console.log("space not available");
          }
        }
        if (spaceAvailable) {
          for (let i = 0; i < shipObj.shipLength; i++) {
            this.board[x][y + i] = "ship";
          }
          console.log("space available");
          console.log(`placed ${shipObj.shipName} at ${x} ${y} Direction:${direction}`);
          this.board[x][y] = shipObj;
        } else if (!spaceAvailable) {
          boardRival.placeShip(randomX(), randomY(), shipObj, direction);
        }
      } else if (direction === "vertical") {
        for (let i = 0; i < shipObj.shipLength; i++) {
          console.log(shipObj.shipName, direction, x + i, y, this.board[x][y]);
          if (this.board[x + i]?.[y] || this.board[x + i]?.[y] === undefined) {
            spaceAvailable = false;
            console.log("space not available");
          }
        }
        if (spaceAvailable) {
          for (let i = 0; i < shipObj.shipLength; i++) {
            this.board[x + i][y] = "ship";
          }
          console.log("space available");
          console.log(`placed ${shipObj.shipName} at ${x} ${y} Direction:${direction}`);
          this.board[x][y] = shipObj;
        } else if (!spaceAvailable) {
          boardRival.placeShip(randomX(), randomY(), shipObj, direction);
        }
      }
    },
    removeShip(x, y, shipObj, direction) {
      if (direction === "horizontal") {
        for (let i = 0; i < shipObj.shipLength; i++) {
          this.board[x][y + i] = null;
        }
      } else if (direction === "vertical") {
        for (let i = 0; i < shipObj.shipLength; i++) {
          this.board[x + i][y] = null;
        }
      }
    },
    receiveAttack(x, y) {
      if (
        this.board[x][y] === "ship" ||
        (typeof this.board[x][y] === "object" && this.board[x][y] != null)
      ) {
        this.board[x][y] = "hit";
      } else if (this.board[x][y] === null) {
        this.board[x][y] = "missed";
      }
    },
    isMiss(x, y) {
      return this.board[x][y] === "missed" ? true : false;
    },
    isHit(x, y) {
      return this.board[x][y] === "hit" ? true : false;
    },
    isAllShipSink() {
      return !this.board.some((arr) =>
        arr.some(
          (position) => (typeof position === "object" && position !== null) || position === "ship"
        )
      );
    },
  };
};

let boardSelf = createGameboard();
let boardRival = createGameboard();

const randomX = () => {
  return Math.floor(Math.random() * 10);
};
const randomY = () => {
  return Math.floor(Math.random() * 10);
};
const randomDirection = () => {
  let number = Math.floor(Math.random() * 2);
  if (number === 0) return "horizontal";
  if (number === 1) return "vertical";
};

boardRival.placeShip(randomX(), randomY(), selfShip1, randomDirection());
boardRival.placeShip(randomX(), randomY(), selfShip2, randomDirection());
boardRival.placeShip(randomX(), randomY(), selfShip3, randomDirection());
boardRival.placeShip(randomX(), randomY(), selfShip4, randomDirection());
boardRival.placeShip(randomX(), randomY(), selfShip5, randomDirection());
boardRival.placeShip(randomX(), randomY(), selfShip6, randomDirection());
boardRival.placeShip(randomX(), randomY(), selfShip7, randomDirection());
boardRival.placeShip(randomX(), randomY(), selfShip8, randomDirection());
boardRival.placeShip(randomX(), randomY(), selfShip9, randomDirection());
boardRival.placeShip(randomX(), randomY(), selfShip10, randomDirection());

boardSelf.placeShip(0, 0, rivalShip1, "horizontal");
boardSelf.placeShip(0, 3, rivalShip2, "horizontal");
boardSelf.placeShip(0, 6, rivalShip3, "horizontal");
boardSelf.placeShip(0, 9, rivalShip4, "horizontal");
boardSelf.placeShip(2, 1, rivalShip5, "horizontal");
boardSelf.placeShip(2, 7, rivalShip6, "horizontal");
boardSelf.placeShip(3, 4, rivalShip7, "horizontal");
boardSelf.placeShip(6, 1, rivalShip8, "horizontal");
boardSelf.placeShip(6, 6, rivalShip9, "horizontal");
boardSelf.placeShip(8, 3, rivalShip10, "horizontal");

const createPlayer = (name) => {
  return { name };
};

let player1 = createPlayer("Player");
let player2 = createPlayer("AI");
let isGameEnd = false;

const battleCellContentRival = document.querySelectorAll(".battle-cell-content__rival");
const battleCellContentSelf = document.querySelectorAll(".battle-cell-content__self");

const result = document.querySelector(".result");

battleCellContentRival.forEach((cell, index) => {
  cell.addEventListener("click", (e) => {
    if (isGameEnd) return;
    if (gameLogic.turn === player2.name) return;
    if (cell.innerHTML === "。") return;
    if (!gameStart) return;
    else {
      cell.innerHTML = "。";
      boardRival.receiveAttack(
        battleCellContentRival[index].dataset.x,
        battleCellContentRival[index].dataset.y
      );
      if (boardRival.isAllShipSink()) {
        result.innerHTML = "You win";
        isGameEnd = true;
      } else {
        gameLogic.turn = player2.name;
        AIMove(randomX(), randomY());
      }
    }
  });
});

const gameLogic = (() => {
  let turn = player1.name;
  return { turn: turn };
})();

const AIMove = (x, y) => {
  if (boardSelf.isHit(x, y) || boardSelf.isMiss(x, y)) {
    AIMove(randomX(), randomY());
  } else {
    boardSelf.receiveAttack(x, y);
    let cell = document.querySelector(
      `[class$="battle-cell-content battle-cell-content__self"][data-x="${x}"][data-y="${y}"]`
    );
    if (boardSelf.isHit(x, y)) {
      cell.innerHTML = "H";
      cell.style.backgroundColor = "red";
    } else if (boardSelf.isMiss(x, y)) {
      cell.innerHTML = "M";
    }
    if (boardSelf.isAllShipSink()) {
      result.innerHTML = "AI win";
      isGameEnd = true;
    } else {
      gameLogic.turn = player1.name;
    }
  }
};

function drag(ev) {
  if (abort === true) return;
  ev.dataTransfer.setData("target", ev.target.id);
  ev.dataTransfer.setData("target-length", ev.target.dataset.length);
  ev.dataTransfer.setData("srcX", ev.path[1].dataset.x);
  ev.dataTransfer.setData("srcY", ev.path[1].dataset.y);
}

function allowDrop(ev) {
  if (abort === true) return;
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move";
}

function drop(ev) {
  if (abort === true) return;
  let data = ev.dataTransfer.getData("target");
  let dataLength = ev.dataTransfer.getData("target-length");
  let originalLocationX = Number(ev.dataTransfer.getData("srcX"));
  let originalLocationY = Number(ev.dataTransfer.getData("srcY"));
  let targetX = Number(ev.target.dataset.x);
  let targetY = Number(ev.target.dataset.y);
  if (isNaN(targetX) || isNaN(targetY)) return;
  ev.preventDefault();
  let shipObj = boardSelf.board[originalLocationX][originalLocationY];
  if (shipObj.direction === "horizontal") {
    if (targetY > 9 - dataLength + 1) return;
    else {
      ev.target.appendChild(document.getElementById(data));
      boardSelf.removeShip(originalLocationX, originalLocationY, shipObj, "horizontal");
      boardSelf.placeShip(targetX, targetY, shipObj, "horizontal");
    }
  } else if (shipObj.direction === "vertical") {
    if (targetX > 9 - dataLength + 1) return;
    else {
      ev.target.appendChild(document.getElementById(data));
      boardSelf.removeShip(originalLocationX, originalLocationY, shipObj, "vertical");
      boardSelf.placeShip(targetX, targetY, shipObj, "vertical");
    }
  }
}

function shipClick(event) {
  if (abort === true) return;
  let shipX = Number(event.path[1].dataset.x);
  let shipY = Number(event.path[1].dataset.y);
  let shipObj = boardSelf.board[shipX][shipY];
  let shipLength = Number(event.target.dataset.length);
  let shipSize = 32 * shipLength + shipLength - 1;
  if (shipObj.direction === "horizontal") {
    if (shipX > 9 - shipLength + 1) return;
    else {
      event.target.style.width = "32px";
      event.target.style.height = shipSize + "px";
      boardSelf.removeShip(shipX, shipY, shipObj, "horizontal");
      boardSelf.placeShip(shipX, shipY, shipObj, "vertical");
      shipObj.direction = "vertical";
    }
  } else if (shipObj.direction === "vertical") {
    if (shipY > 9 - shipLength + 1) return;
    else {
      event.target.style.width = shipSize + "px";
      event.target.style.height = "32px";
      boardSelf.removeShip(shipX, shipY, shipObj, "vertical");
      boardSelf.placeShip(shipX, shipY, shipObj, "horizontal");
      shipObj.direction = "horizontal";
    }
  }
}

let abort = false;
let gameStart = false;

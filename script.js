const createShip = (shipName, shipLength) => {
  if (shipLength > 4 || shipLength < 1) {
    throw new Error("Wrong Length");
  } else
    return {
      shipName: shipName,
      shipLength: shipLength,
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

const ship1 = createShip("ship1", 1);
const ship2 = createShip("ship2", 1);
const ship3 = createShip("ship3", 1);
const ship4 = createShip("ship4", 1);
const ship5 = createShip("ship5", 2);
const ship6 = createShip("ship6", 2);
const ship7 = createShip("ship7", 2);
const ship8 = createShip("ship8", 3);
const ship9 = createShip("ship9", 3);
const ship10 = createShip("ship10", 4);

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
    placeShip(x, y, shipObj, directoin) {
      if (directoin === "horizontal") {
        for (let i = 0; i < shipObj.shipLength; i++) {
          this.board[x][y + i] = "ship";
        }
      } else if (directoin === "vertical") {
        for (let i = 0; i < shipObj.shipLength; i++) {
          this.board[x + i][y] = "ship";
        }
      }
      this.board[x][y] = shipObj;
    },
    removeShip(x, y, shipObj, directoin) {
      if (directoin === "horizontal") {
        for (let i = 0; i < shipObj.shipLength; i++) {
          this.board[x][y + i] = null;
        }
      } else if (directoin === "vertical") {
        for (let i = 0; i < shipObj.shipLength; i++) {
          this.board[x + i][y] = null;
        }
      }
    },
    receiveAttack(x, y) {
      if (this.board[x][y] === "ship") {
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
      return this.board.every(
        ([position]) =>
          (position === "hit" || position === null) && position != "ship" && position != null
      )
        ? true
        : false;
    },
  };
};

let boardSelf = createGameboard();
let boardRival = createGameboard();

boardRival.placeShip(0, 0, ship1, "horizontal");
boardRival.placeShip(1, 0, ship2, "horizontal");
boardRival.placeShip(2, 0, ship3, "horizontal");
boardRival.placeShip(3, 0, ship4, "horizontal");
boardRival.placeShip(4, 0, ship5, "horizontal");
boardRival.placeShip(5, 0, ship6, "horizontal");
boardRival.placeShip(6, 0, ship7, "horizontal");
boardRival.placeShip(7, 0, ship8, "horizontal");
boardRival.placeShip(8, 0, ship9, "horizontal");
boardRival.placeShip(9, 0, ship10, "horizontal");

boardSelf.placeShip(0, 0, ship1, "horizontal");
boardSelf.placeShip(1, 0, ship2, "horizontal");
boardSelf.placeShip(2, 0, ship3, "horizontal");
boardSelf.placeShip(3, 0, ship4, "horizontal");
boardSelf.placeShip(4, 0, ship5, "horizontal");
boardSelf.placeShip(5, 0, ship6, "horizontal");
boardSelf.placeShip(6, 0, ship7, "horizontal");
boardSelf.placeShip(7, 0, ship8, "horizontal");
boardSelf.placeShip(8, 0, ship9, "horizontal");
boardSelf.placeShip(9, 0, ship10, "horizontal");

const createPlayer = (name) => {
  return { name };
};

let player1 = createPlayer("Player");
let player2 = createPlayer("AI");

const battleCellContentRival = document.querySelectorAll(".battle-cell-content__rival");
const battleCellContentSelf = document.querySelectorAll(".battle-cell-content__self");

battleCellContentRival.forEach((cell, index) => {
  cell.addEventListener("click", (e) => {
    if (gameLogic.turn === player2.name) return;
    else {
      cell.innerHTML = "。";
      boardRival.receiveAttack(
        battleCellContentRival[index].dataset.x,
        battleCellContentRival[index].dataset.y
      );
      gameLogic.turn = player2.name;
      AIMove(randomX(), randomY());
    }
  });
});

/*const gameLogic = (() => {
  let turn = player1.name;
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      if (typeof boardSelf.board[x][y] === "object" && boardSelf.board[x][y] != null) {
        let cell = document.querySelector(
          `[class$="battle-cell-content battle-cell-content__self"][data-x="${x}"][data-y="${y}"]`
        );
        let shipObj = boardSelf.board[x][y];
        cell.style.width = `${shipObj.shipLength * 32 + (shipObj.shipLength - 1) * 1}px`;
      }
    }
  }
  return { turn: turn };
})();*/

const AIMove = (x, y) => {
  if (boardSelf.isHit(x, y) || boardSelf.isMiss(x, y)) {
    AIMove(randomX(), randomY());
  } else {
    boardSelf.receiveAttack(x, y);
    let cell = document.querySelector(
      `[class$="battle-cell-content battle-cell-content__self"][data-x="${x}"][data-y="${y}"]`
    );
    cell.innerHTML = "。";
    gameLogic.turn = player1.name;
  }
};

const randomX = () => {
  return Math.floor(Math.random() * 10);
};
const randomY = () => {
  return Math.floor(Math.random() * 10);
};

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("target", ev.target.id);
  ev.dataTransfer.setData("srcX", ev.path[1].dataset.x);
  ev.dataTransfer.setData("srcY", ev.path[1].dataset.y);
}

function drop(ev) {
  let data = ev.dataTransfer.getData("target");
  let originalLocationX = Number(ev.dataTransfer.getData("srcX"));
  let originalLocationY = Number(ev.dataTransfer.getData("srcY"));
  let targetX = Number(ev.target.dataset.x);
  let targetY = Number(ev.target.dataset.y);
  ev.preventDefault();
  ev.target.appendChild(document.getElementById(data));
  //console.log(ev.target);
  let shipObj = boardSelf.board[originalLocationX][originalLocationY];
  boardSelf.removeShip(originalLocationX, originalLocationY, shipObj, "horizontal");
  boardSelf.placeShip(targetX, targetY, shipObj, "horizontal");
  console.log(boardSelf.board);
}

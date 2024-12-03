/*eslint-disable*/
/*
Let's do something unhinged and insane, let's store all the DOM references here as well. - in retrospect, this is really unhinged and I am stuck now.

Pseudocode:
1 - Hover over an element and get it's index
2 - Get the ship length that you are placing
3 - Highlight not only the element you are hovering over, but also the next
x elements to the right
4 - If the index is x % 9 === 0, (aka end of board, no more right), then fill slots on 
the left if possible
*/
import { domController } from "./dom-controller";
import { cordConverter } from "./cord-value-converter";
import { gameInfo } from "../pages/main-game";

const dragHandler = {
  playerBoardDOM: [],
  currentPlayerDOM: null,
  angle: "horizontal",
  cordArray: [],
  placedCords: [],
  initiate: function (playerBoard) {
    this.currentPlayerDOM = playerBoard;
    this.playerBoardDOM.push(playerBoard);

    this.enableDrag(playerBoard);
  },
  getShipLength: function () {
    return domController.currentShipContainer.childNodes[0].childNodes[1]
      .children.length;
  },
  enableDrag: function (board) {
    horizontalController.initiate(board);
  },
  createShipCordObject: function (startCord, endCord) {
    dragHandler.cordArray = []; //garbage collection

    //export these
    let [xStart, yStart] = cordConverter.unpackCords(startCord);
    let [xEnd, yEnd] = cordConverter.unpackCords(endCord);
    let shipDirection = dragHandler.angle;

    return {
      xStart,
      xEnd,
      yStart,
      yEnd,
      shipDirection,
    }; //this is exactly like in the gameboard.test
  },
  isAvailable: function () {
    let cordList = dragHandler.cordArray;
    let areValid = true;
    cordList.forEach((cord) => {
      if (!cord.classList.contains("available")) {
        areValid = false;
      }
    });
    return areValid;
  },

  getCord: function (tile) {
    let cord = tile.getAttribute("id");
    return cord.substring(5);
  },
  placeNextShip: function () {
    if (domController.getShipCount() === 0) {
      let nextButton = domController.getNextShip();
      nextButton.addEventListener("click", dragHandler.confirmSelection);
    } else {
      domController.getNextShip();
    }
  },
  confirmSelection: function () {
    gameInfo.continue(dragHandler.placedCords);
  },
  disable: function () {
    dragHandler.currentPlayerDOM.forEach((tile) => {
      tile.removeEventListener("dragover");
      tile.removeEventListener("dragleave");
      tile.removeEventListener("drop");
    });
  },
  toggle: function () {
    if (dragHandler.angle === "horizontal") {
      dragHandler.angle = "vertical";
      dragHandler.disable();
      verticalController.initiate(dragHandler.dragHandler.currentPlayerDOM);
    } else {
      dragHandler.angle = "horizontal";
      dragHandler.disable();
      horizontalController.initiate(dragHandler.dragHandler.currentPlayerDOM);
    }
  },
};

const horizontalController = {
  initiate: function (board) {
    board.forEach((tile) => {
      tile.addEventListener(
        "dragover",
        horizontalController.highlightPlacement
      );

      tile.addEventListener("dragleave", (e) => {
        e.preventDefault();
        dragHandler.cordArray.forEach((cord) => {
          cord.classList.remove("dragover");
        });
      });

      tile.addEventListener("drop", horizontalController.placeShip); //unless user toggles
    });
  },
  highlightPlacement: function (e) {
    e.preventDefault();
    let shipLength = dragHandler.getShipLength();
    let startCord = Number(dragHandler.getCord(e.target));

    for (let i = 0; i < shipLength; i++) {
      if (horizontalController.isValid(startCord + i, i) === true) {
        dragHandler.cordArray[i] = dragHandler.currentPlayerDOM[startCord + i];
        dragHandler.currentPlayerDOM[startCord + i].classList.add("dragover");
      } else {
        dragHandler.cordArray.forEach((cord) => {
          cord.classList.add("invalid");
        });
        return setTimeout(() => {
          dragHandler.cordArray.forEach((cord) => {
            cord.classList.remove("invalid");
          });
        }, 2000);
      }
    }

    e.target.classList.add("dragover");
  },

  placeShip: function (e) {
    e.preventDefault();
    let startCord = Number(dragHandler.getCord(e.target));
    let shipLength = dragHandler.getShipLength();

    for (let i = 0; i < shipLength; i++) {
      if (horizontalController.isValid(startCord + i, i)) {
        dragHandler.cordArray[i] = dragHandler.currentPlayerDOM[startCord + i];
      } else {
        dragHandler.cordArray.forEach((cord) => {
          cord.classList.add("invalid");
        });
        return setTimeout(() => {
          dragHandler.cordArray.forEach((cord) => {
            cord.classList.remove("invalid");
          });
        }, 2000);
      }
    }

    if (dragHandler.isAvailable() === true) {
      let lastDOM = dragHandler.cordArray.at(-1);
      let endCord = dragHandler.getCord(lastDOM);

      horizontalController.markDOMTaken(startCord, endCord);
      dragHandler.placedCords.push(
        dragHandler.createShipCordObject(startCord, endCord)
      );
      dragHandler.placeNextShip();
    }
  },
  isValid(index, startPoint) {
    if (index % 10 === 0 && startPoint !== 0) {
      return false; //in other words, if any of the squares cross the border
    } else {
      return true;
    }
  },
  markDOMTaken: function (startCord, endCord) {
    for (startCord; startCord <= endCord; startCord++) {
      dragHandler.currentPlayerDOM[startCord].classList.remove("available");
      dragHandler.currentPlayerDOM[startCord].classList.add("ship-present");
      dragHandler.currentPlayerDOM[startCord].classList.add("unavailable");
    }
  },
};

const verticalController = {
  initiate: function (board) {
    board.forEach((tile) => {
      tile.addEventListener("dragover", verticalController.highlightPlacement);

      tile.addEventListener("dragleave", (e) => {
        e.preventDefault();
        dragHandler.cordArray.forEach((cord) => {
          cord.classList.remove("dragover");
        });
      });

      tile.addEventListener("drop", verticalController.placeShip); //unless user toggles
    });
  },
  highlightPlacement: function (e) {
    e.preventDefault();
    let shipLength = dragHandler.getShipLength();
    let startCord = Number(dragHandler.getCord(e.target));

    for (let y = 0; y < shipLength; y++) {
      if (verticalController.isValid(startCord + y * 10, y * 10)) {
        dragHandler.cordArray[y] =
          dragHandler.currentPlayerDOM[startCord + y * 10];
        dragHandler.currentPlayerDOM[startCord + y * 10].classList.add(
          "dragover"
        );
      } else {
        dragHandler.cordArray.forEach((cord) => {
          cord.classList.add("invalid");
        });
        return setTimeout(() => {
          dragHandler.cordArray.forEach((cord) => {
            cord.classList.remove("invalid");
          });
        }, 2000);
      }
    }

    e.target.classList.add("dragover");
  },
  placeShip: function (e) {
    e.preventDefault();
    let startCord = Number(dragHandler.getCord(e.target));
    let shipLength = dragHandler.getShipLength();

    for (let y = 0; y < shipLength; y++) {
      if (verticalController.isValid(startCord + y * 10, y * 10)) {
        dragHandler.cordArray[y] =
          dragHandler.currentPlayerDOM[startCord + y * 10];
      } else {
        dragHandler.cordArray.forEach((cord) => {
          cord.classList.add("invalid");
        });
        return setTimeout(() => {
          dragHandler.cordArray.forEach((cord) => {
            cord.classList.remove("invalid");
          });
        }, 2000);
      }
    }

    if (dragHandler.isAvailable() === true) {
      let lastDOM = dragHandler.cordArray.at(-1);
      let endCord = dragHandler.getCord(lastDOM);

      verticalController.markDOMTaken(startCord, endCord);
      dragHandler.placedCords.push(
        dragHandler.createShipCordObject(startCord, endCord)
      );
      dragHandler.placeNextShip();
    }
  },
  markDOMTaken: function (startCord, endCord) {
    let y = startCord;
    for (y; y <= endCord; ) {
      dragHandler.currentPlayerDOM[y + 10].classList.remove("available");
      dragHandler.currentPlayerDOM[y + 10].classList.add("ship-present");
      dragHandler.currentPlayerDOM[y + 10].classList.add("unavailable");
      y = y + 10;
    }
  },
  isValid(index, startPoint) {
    console.log(index, startPoint);
    if ((index % 10 === 0 && startPoint !== 0) || index > 99) {
      return false; //in other words, if any of the squares cross the border
    } else {
      return true;
    }
  },
};

export { dragHandler };

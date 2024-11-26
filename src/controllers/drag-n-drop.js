/*eslint-disable*/
/*
Let's do something unhinged and insane, let's store all the DOM references here as well.

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

const dragHandler = {
  playerBoardDOM: [],
  currentPlayerDOM: null,
  angle: "horizontal",
  cordArray: [],
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
    board.forEach((tile) => {
      tile.addEventListener("dragover", dragHandler.highlightPlacement);

      tile.addEventListener("dragleave", (e) => {
        e.preventDefault();
        this.cordArray.forEach((cord) => {
          cord.classList.remove("dragover");
        });
      });

      tile.addEventListener("drop", dragHandler.placeShip);
    });
  },
  placeShip: function (e) {
    e.preventDefault();
    if (dragHandler.isAvailable() === true) {
      let startCord = dragHandler.getCord(e.target);
      let lastDOM = dragHandler.cordArray.at(-1); //trouble-maker TODO
      let endCord = dragHandler.getCord(lastDOM);

      dragHandler.markDOMTaken(startCord, endCord);
      //sometimes last DOM is absurdly high cord. Also ship placements are allowed even if they are less than the length of the ship
    }
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
  markDOMTaken: function (startCord, endCord) {
    for (startCord; startCord <= endCord; startCord++) {
      dragHandler.currentPlayerDOM[startCord].classList.remove("available");
      dragHandler.currentPlayerDOM[startCord].classList.add("ship-present");
      dragHandler.currentPlayerDOM[startCord].classList.add("unavailable");
    }
  },
  highlightPlacement: function (e) {
    e.preventDefault();
    let shipLength = dragHandler.getShipLength();
    let startCord = Number(dragHandler.getCord(e.target));

    for (let i = 0; i < shipLength; i++) {
      if (dragHandler.isValid(startCord + i, i) === true) {
        //this implementation does not allow cordArray to reach 10k or more items.
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
  isValid(index, startPoint) {
    if (index % 10 === 0 && startPoint !== 0) {
      return false; //in other words, if any of the squares cross the border
    } else {
      return true;
    }
  },
  getCord: function (tile) {
    let cord = tile.getAttribute("id");
    return cord.substring(5);
  },
};

export { dragHandler };

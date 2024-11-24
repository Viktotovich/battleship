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

const dragHandler = {
  playerBoardDOM: [],
  currentPlayerDOM: null,
  angle: "horizontal",
  initiate: function (playerBoard) {
    this.currentPlayerDOM = playerBoard;
    this.playerBoardDOM.push(playerBoard);

    let shipLength = this.getShipLength();
    this.enableDrag(playerBoard, shipLength);
  },
  getShipLength: function () {
    return domController.currentShipContainer.childNodes[0].childNodes[1]
      .children.length;
  },
  enableDrag: function (board, shipLength) {
    board.forEach((tile) => {
      tile.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.target.classList.add("dragover");
      });

      tile.addEventListener("dragleave", (e) => {
        e.preventDefault();
        e.target.classList.remove("dragover");
      });

      tile.addEventListener("drop", dragHandler.placeShip);
    });
  },
  placeShip: function (e) {
    e.preventDefault();
    if (e.target.classList.contains("available")) {
      //
    }
  },
};

export { dragHandler };

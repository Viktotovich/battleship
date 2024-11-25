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
    if (e.target.classList.contains("available")) {
      /* Pseudocode:
      1 - Get the cordinate of every tile that the ship is in, 
      1.5 - Check if valid
      2 - Store that in some object, preferrably mixed with the ship object
      3 - Place another ship for placement
      */
      let cord = dragHandler.getCord(e.target);
      console.log(cordConverter.unpackCords(cord));
    }
  },
  highlightPlacement: function (e) {
    e.preventDefault();
    let shipLength = dragHandler.getShipLength();
    let startCord = Number(dragHandler.getCord(e.target));

    for (let i = 0; i < shipLength; i++) {
      if (dragHandler.isValid(startCord + i, i) === true) {
        dragHandler.cordArray.push(dragHandler.currentPlayerDOM[startCord + i]);
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

/* 
Morning Vlad, hopefully you are more than ready - pickup from the fact that we need to 
make the ships placeable. Horizontal and vertical placement options aren't as 
important, but can be low mental effort problems to solve.

Another thing to note which is kinda interesting, is that we need to add "reset" 
button for the boards, swap direction, and custom cords adding.

Either way, just send the board placement data to some object after every ship*/

export { dragHandler };

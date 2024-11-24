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
const dragHandler = {
  playerBoardDOM: [],
  initiate: function (playerBoard) {
    this.playerBoardDOM.push(playerBoard);
    this.enableDrag(playerBoard);
  },
  enableDrag: function (board) {
    board;
  },
};

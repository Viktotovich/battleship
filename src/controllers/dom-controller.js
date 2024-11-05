const domController = {
  playerDOMs: [],
  createDOMBoard: function () {
    const boardContainer = document.createElement("div");
    let domArr = [];

    for (let i = 0; i < 100; i++) {
      let boardPiece = document.createElement("div");
      boardPiece.classList.add("board-piece");
      domArr.push(boardPiece);
      boardContainer.appendChild(boardPiece);
    }

    this.playerDOMs.push(domArr);

    return boardContainer;
  },
  cordsToDOMIndex(x, y) {
    let index = x + y * 10;
    return index;
  },
};

export { domController };

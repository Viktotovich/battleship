/* eslint-disable */
import { gameController } from "../controllers/game-controller";
import { domController } from "../controllers/dom-controller";
import { dragHandler } from "../controllers/drag-n-drop";

const mainGameDisplayController = {
  contentSpace: document.querySelector("#content"),
  initiate: function (gameObj) {
    let gameInfoObj = gameController.unpackGame(gameObj);
    let { p1Board, p2Board } = this.unpackDisplay(gameInfoObj); //Non-dom actual board

    let p1BoardDOM = domController.createDOMBoard();
    let p2BoardDOM = domController.createDOMBoard();

    let title = this.createTitle(gameInfoObj.player1.name);
    let shipPlacer = this.createShipPlacer();

    this.contentSpace.appendChild(title);
    this.contentSpace.appendChild(p1BoardDOM);
    this.contentSpace.appendChild(shipPlacer);

    unpackGameType(gameInfoObj, p1BoardDOM, p2BoardDOM);
  },
  unpackDisplay: function (gameInfo) {
    let p1Board = gameInfo.player1.gameboard.board;
    let p2Board = gameInfo.player2.gameboard.board;

    return {
      p1Board,
      p2Board,
    };
  },
  createTitle(pName) {
    const titleContainer = document.createElement("div");
    const title = document.createElement("h2");

    titleContainer.appendChild(title);

    title.textContent = `${pName}, please place your ships!`;

    titleContainer.classList.add("title-container");
    title.classList.add("title");

    return titleContainer;
  },
  createShipPlacer: function () {
    const ships = gameController.getShips();
    const shipsInDOM = domController.unpackShips(ships);

    return shipsInDOM;
  },
};

function unpackGameType(gameInfo, p1BoardDOM, p2BoardDOM) {
  if (gameInfo.gameType === "pvc") {
    pvcGameController.initiate(p1BoardDOM);
  } else {
    pvpGameController.initiate(p1BoardDOM);
  }
}

const pvcGameController = {
  initiate: function (p1Board) {
    //enable drag
    dragHandler.initiate(p1Board);
  },
};

const pvpGameController = {
  initiate: function (p1Board, p2Board) {
    //enable first drag
    dragHandler.initiate(p1Board);
  },
};

/* Next Steps:
    You can completely forget about all other pages, and only touch them when doing frontend. We get everything we will ever need out of them with the gameObj. 
    
*/

/*What is a main-game.js file anyway?

This is supposed to control the page display itself, not the DOM manipulations, nor the 
game flow. 

What does that mean?

Well, if we take, say the board itself. The first part would ask Player1 to create the 
board - and then just relay the board information to the gameController to finalize the Player's board. It does not create the board, nor deals with the fact that users 
interact with the board - it does not care. main-game.js is a page responsible for 
making sure that whatever page information comes its way is displayed, and that the next step after submission is to display the Player 2 make-a-board page / or just start the game (if against a bot)*/

export { mainGameDisplayController };

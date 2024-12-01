/* eslint-disable */
import { gameController } from "../controllers/game-controller";
import { domController } from "../controllers/dom-controller";
import { dragHandler } from "../controllers/drag-n-drop";
import { boardRandomizer } from "../algorithms/board-randomizer";

const mainGameDisplayController = {
  contentSpace: document.querySelector("#content"),
  initiate: function (gameObj) {
    let gameInfoObj = gameController.unpackGame(gameObj);
    let { p1Board, p2Board } = this.unpackDisplay(gameInfoObj); //Non-dom actual board

    let p1BoardDOMContainer = domController.createDOMBoard();
    let p2BoardDOMContainer = domController.createDOMBoard();

    let title = this.createTitle(gameInfoObj.player1.name);
    let shipPlacer = this.createShipPlacer();

    this.contentSpace.appendChild(title);
    this.contentSpace.appendChild(p1BoardDOMContainer);
    this.contentSpace.appendChild(shipPlacer);

    unpackGameType(gameInfoObj, domController.playerDOMs);
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

function unpackGameType(gameObj, playerDOMs) {
  let [p1BoardDOM, p2BoardDOM] = playerDOMs;
  if (gameObj.gameType === "pvc") {
    gameInfo.set(gameObj.gametype);
    pvcGameController.initiate(p1BoardDOM);
  } else {
    gameInfo.set(gameObj.gametype);

    pvpGameController.initiate(p1BoardDOM, p2BoardDOM);
  }
}

const gameInfo = {
  gameType: null,
  p1Cords: null,
  p2Cords: null,
  set: function (gameType) {
    this.gameType = gameType;
  },
  continue: function (placedCords) {
    if (gameInfo.gameType === "pvc") {
      gameInfo.p1Cords = placedCords;
      gameInfo.p2Cords = pvcGameController.autoPlace();
      console.log(gameController.players);
    } else {
      //TODO after PVC
      gameInfo.p1Cords = placedCords;
      pvpGameController.nextPlayer();
    }
  },
};

const pvcGameController = {
  initiate: function (p1Board) {
    //enable drag
    dragHandler.initiate(p1Board);
  },
  autoPlace: function () {
    let ships = gameController.getShips();
    let cordArr = boardRandomizer.initiate(ships);
    return cordArr;
  },
};

const pvpGameController = {
  p2Board: null,
  initiate: function (p1Board, p2Board) {
    //enable first drag
    dragHandler.initiate(p1Board);
    this.p2Board = p2Board;
  },
  nextPlayer: function () {
    dragHandler.initiate(this.p2Board);
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

export { mainGameDisplayController, gameInfo };

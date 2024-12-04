/* eslint-disable */
import { gameController } from "../controllers/game-controller";
import { domController } from "../controllers/dom-controller";
import { dragHandler } from "../controllers/drag-n-drop";
import { boardRandomizer } from "../algorithms/board-randomizer";

const mainGameDisplayController = {
  contentSpace: document.querySelector("#content"),
  initiate: function (gameObj) {
    let gameInfoObj = gameController.unpackGame(gameObj);
    //TODO: continue here as this has all the necessary controls

    let p1BoardDOMContainer = domController.createDOMBoard();
    let p2BoardDOMContainer = domController.createDOMBoard();

    let title = this.createTitle(gameInfoObj.player1.name);
    let shipPlacer = this.createShipPlacer();
    let buttonToolkit = domController.createButtonToolkit();
    let directionControls = this.createDirectionControls();

    this.contentSpace.appendChild(title);
    this.contentSpace.appendChild(p1BoardDOMContainer);
    this.contentSpace.appendChild(directionControls);
    this.contentSpace.appendChild(buttonToolkit);
    this.contentSpace.appendChild(shipPlacer);

    //this.showBoard()
    unpackGameType(gameInfoObj, domController.playerDOMs); //unpack AND start based on GT
  },
  showBoard: function () {
    //refactor initiate
  },
  createDirectionControls: function () {
    const toggleDirectionContainer = document.createElement("div");
    const toggleDirectionButton = document.createElement("button");
    const currentDirection = document.createElement("div");

    currentDirection.textContent = `Placing: ${dragHandler.angle}`;
    toggleDirectionButton.textContent = "Change placement direction";
    toggleDirectionButton.addEventListener("click", dragHandler.toggle);
    toggleDirectionButton.addEventListener("click", () => {
      currentDirection.textContent = `Placing: ${dragHandler.angle}`;
    });
    toggleDirectionButton.classList.add("toggle-direction-button");
    toggleDirectionContainer.classList.add("toggle-direction-container");
    currentDirection.classList.add("current-direction");

    toggleDirectionContainer.appendChild(currentDirection);
    toggleDirectionContainer.appendChild(toggleDirectionButton);

    return toggleDirectionContainer;
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
  resetDrag: function () {
    dragHandler.reset();
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
    boardRandomizer.cordArr = []; //garbage collection
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

export { mainGameDisplayController, gameInfo };

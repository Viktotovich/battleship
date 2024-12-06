import { boardRandomizer } from "../algorithms/board-randomizer";
import { gameController } from "./game-controller";
import { cordConverter } from "./cord-value-converter";
import { gameInfo } from "../pages/main-game";

const domController = {
  playerDOMs: [],
  placeableShips: [],
  playerPlacing: 0,
  currentShipContainer: null,
  createDOMBoard: function () {
    const boardContainer = document.createElement("div");
    let domArr = [];

    for (let i = 0; i < 100; i++) {
      let boardPiece = document.createElement("div");
      boardPiece.classList.add("board-piece");
      boardPiece.classList.add("available");
      boardPiece.setAttribute("id", `cord-${i}`);
      domArr.push(boardPiece);
      boardContainer.appendChild(boardPiece);
    }

    this.playerDOMs.push(domArr);
    boardContainer.classList.add("board-container");

    return boardContainer;
  },
  unpackShips: function (shipsObj) {
    const container = document.createElement("div");
    const shipToPlaceContainer = document.createElement("div");
    const placeShipText = document.createElement("div");
    const currentShip = document.createElement("div");

    container.classList.add("place-ships-menu");
    shipToPlaceContainer.classList.add("ships-to-place-container");
    currentShip.classList.add("current-ship");
    placeShipText.classList.add("place-ship-text");

    placeShipText.textContent = "Currently placing:";

    container.appendChild(shipToPlaceContainer);
    shipToPlaceContainer.appendChild(placeShipText);
    shipToPlaceContainer.appendChild(currentShip);

    Object.keys(shipsObj).forEach((key) => {
      let shipDOM = this.unpackShip(shipsObj[key].health, key);
      container.appendChild(shipDOM);
      this.placeableShips.push(shipDOM);
    });

    currentShip.appendChild(this.placeableShips[0]);

    this.makeShipDraggable(this.placeableShips[0]);
    this.placeableShips.splice(0, 1);
    this.currentShipContainer = currentShip;

    return container;
  },
  getNextShip: function () {
    let currentShip = document.querySelector(".current-ship");
    currentShip.textContent = "";

    if (this.placeableShips.length === 0) {
      let shipToPlaceContainer = document.querySelector(
        ".ships-to-place-container"
      );
      let nextButton = document.createElement("button");

      nextButton.classList.add("confirm-selection");
      nextButton.textContent = "Ready?";

      shipToPlaceContainer.appendChild(nextButton);
      return nextButton;
    }

    currentShip.appendChild(this.placeableShips[0]);

    this.makeShipDraggable(this.placeableShips[0]);
    this.placeableShips.splice(0, 1);
    this.currentShipContainer = currentShip;
  },
  getShipCount: function () {
    return this.placeableShips.length;
  },
  makeShipDraggable: function (shipDOM) {
    shipDOM.setAttribute("draggable", "true");
  },
  unpackShip: function (health, shipName) {
    const shipDetailsContainer = document.createElement("div");
    const shipNameDisplay = document.createElement("div");
    const shipContainer = document.createElement("div");

    shipDetailsContainer.appendChild(shipNameDisplay);
    shipDetailsContainer.appendChild(shipContainer);

    for (let i = 0; i < health; i++) {
      let shipPiece = document.createElement("span");
      shipPiece.classList.add("ship-piece");

      shipContainer.appendChild(shipPiece);
    }

    shipNameDisplay.textContent = shipName;

    shipDetailsContainer.classList.add("ship-details-container");
    shipContainer.classList.add("ship-container");
    shipContainer.setAttribute("id", shipName);
    shipNameDisplay.setAttribute("class", "ship-name-display");

    return shipDetailsContainer;
  },
  createButtonToolkit: function () {
    const toolKitContainer = document.createElement("div");
    const randomizeButton = document.createElement("button");

    toolKitContainer.classList.add("toolkit-container");
    toolKitContainer.appendChild(randomizeButton);

    randomizeButton.textContent = "Randomize Selection";

    randomizeButton.classList.add("randomize-button");

    //the board MUST BE CLEAN AND RESET
    randomizeButton.addEventListener(
      "click",
      toolkitController.randomizePlacement
    );

    randomizeButton.addEventListener("click", domController.markAllPlaced);

    return toolKitContainer;
  },
  markAllPlaced: function () {
    //should be better
    let shipToPlaceContainer = document.querySelector(
      ".ships-to-place-container"
    );
    let nextButton = document.createElement("button");

    nextButton.classList.add("confirm-selection");
    shipToPlaceContainer.textContent = "";
    nextButton.textContent = "Ready?";

    shipToPlaceContainer.appendChild(nextButton);

    nextButton.addEventListener("click", domController.confirmSelection);
  },
  confirmSelection: function (e) {
    e.target.setAttribute("disabled", "");
    gameInfo.continue(boardRandomizer.cordArr);
  },
};

const toolkitController = {
  shipCord: [],
  randomizePlacement: function () {
    toolkitController.resetPlacement();

    let ships = gameController.getShips();
    let cordArr = boardRandomizer.initiate(ships);
    toolkitController.unpackCords(cordArr);

    boardRandomizer.resetData();
  },
  unpackCords: function (cordArr) {
    cordArr.forEach((cord) => {
      let { xStart, xEnd, yStart, yEnd } = cord;

      if (cord.direction === "horizontal") {
        for (let i = xStart; i < xEnd; i++) {
          let fCord = cordConverter.flattenCords(i, yStart);
          toolkitController.shipCord.push(fCord);
          toolkitController.placeShip();
        }
      } else {
        for (let i = yStart; i < yEnd; i++) {
          let fCord = cordConverter.flattenCords(xStart, i);
          toolkitController.shipCord.push(fCord);
          toolkitController.placeShip();
        }
      }
    });
  },
  placeShip: function () {
    let startCord = toolkitController.shipCord[0];
    let endIndex = toolkitController.shipCord.length - 1;
    let endCord = toolkitController.shipCord[endIndex];

    toolkitController.markDOMTaken(startCord, endCord);
    toolkitController.shipCord = [];
  },
  markDOMTaken: function (startCord, endCord) {
    let playerPlacing = domController.playerPlacing;
    let playerDOM = domController.playerDOMs[playerPlacing];

    for (startCord; startCord <= endCord; startCord++) {
      playerDOM[startCord].classList.remove("available");
      playerDOM[startCord].classList.add("ship-present");
      playerDOM[startCord].classList.add("unavailable");
    }
  },
  resetPlacement: function () {
    let takenSlots = document.querySelectorAll(".unavailable");
    takenSlots.forEach((slot) => {
      slot.classList.remove("unavailable");
      slot.classList.remove("ship-present");
      slot.classList.add("available");
    });

    let dragoverSlots = document.querySelectorAll(".dragover");
    dragoverSlots.forEach((slot) => {
      slot.classList.remove("dragover");
    });

    let invalidSlots = document.querySelectorAll(".invalid");
    invalidSlots.forEach((slot) => {
      slot.classList.remove("invalid");
    });
  },
};

// post-start controls
const activeGameController = {
  p1DOMBoard: null,
  p2DOMBoard: null,
  initiate: function () {
    const contentSpace = document.getElementById("content");
    contentSpace.textContent = "";

    //I've checked React for a bit, the idea is kind of like React..
    const activeGameContainer = document.createElement("div");
    const p1BoardContainer = activeGameController.createP1DOMBoard();
    const infoTableContainer = activeGameController.createInfoTable();
    const p2BoardContainer = activeGameController.createP2DOMBoard();
    const playerNameContainer = activeGameController.createNamesContainer();

    activeGameContainer.classList.add("active-game-controller");
    activeGameContainer.appendChild(playerNameContainer);
    activeGameContainer.appendChild(p1BoardContainer);
    activeGameContainer.appendChild(infoTableContainer);
    activeGameContainer.appendChild(p2BoardContainer);

    contentSpace.appendChild(activeGameContainer);
  },
  createNamesContainer: function () {
    const nameContainer = document.createElement("div");
    const player1Name = document.createElement("p");
    const player2Name = document.createElement("p");

    nameContainer.classList.add("name-container");
    player1Name.classList.add("player1-name");
    player2Name.classList.add("player2-name");

    nameContainer.appendChild(player1Name);
    nameContainer.appendChild(player2Name);

    return nameContainer;
  },
  /* TODO:
    1 - Add event listeners for hits
    2 - Make unhit tiles look like animated water
    3 - Think about how the display will look like, current idea:
    ----------------------------------------------------------------
    ----------------------BATTLESHIP--------------------------------
    ----------------------------------------------------------------
          PlayerName-------Information Table----------Player2Name
          BOARD1 ----------Information Table ---------BOARD2
    ----------------------------------------------------------------
    ----------------------------------------------------------------

    4 - Endgame conditions: what happens when someone wins? do we just refresh the page?
  */
  createP1DOMBoard: function () {
    const boardContainer = document.createElement("div");
    let domArr = [];

    for (let i = 0; i < 100; i++) {
      let boardPiece = document.createElement("div");
      boardPiece.classList.add("player-one-board-piece");
      boardPiece.classList.add("unhit");
      boardPiece.setAttribute("id", `player-one-cord-${i}`);
      domArr.push(boardPiece);
      boardContainer.appendChild(boardPiece);
    }

    activeGameController.p1DOMBoard = domArr;
    boardContainer.classList.add("player-one-board-container");

    return boardContainer;
  },
  createInfoTable: function () {
    const infoTableContainer = document.createElement("div");
    const enemyShipHealthContainer = document.createElement("div");
    const friendlyShipHealthContainer = document.createElement("div");
    const turnInfo = document.createElement("div");
    const clickToSpy = document.createElement("div");

    turnInfo.setAttribute("id", "turn-info");
    infoTableContainer.setAttribute("id", "info-table");
    enemyShipHealthContainer.setAttribute("id", "enemy-ship-health-container");
    friendlyShipHealthContainer.setAttribute(
      "id",
      "friendly-ship-health-container"
    );
    clickToSpy.setAttribute("id", "click-to-spy");

    clickToSpy.textContent = "Click to spy"; //modal

    enemyShipHealthContainer.classList.add("health-info-container");
    friendlyShipHealthContainer.classList.add("health-info-container");

    infoTableContainer.appendChild(turnInfo);
    infoTableContainer.appendChild(enemyShipHealthContainer);
    infoTableContainer.appendChild(friendlyShipHealthContainer);
    infoTableContainer.appendChild(clickToSpy);

    return infoTableContainer;
  },
  createP2DOMBoard: function () {
    const boardContainer = document.createElement("div");
    let domArr = [];

    for (let i = 0; i < 100; i++) {
      let boardPiece = document.createElement("div");
      boardPiece.classList.add("player-two-board-piece");
      boardPiece.classList.add("unhit");
      boardPiece.setAttribute("id", `player-two-cord-${i}`);
      domArr.push(boardPiece);
      boardContainer.appendChild(boardPiece);
    }

    activeGameController.p2DOMBoard = domArr;
    boardContainer.classList.add("player-two-board-container");

    return boardContainer;
  },
  createSpyModal: function () {
    const modal = document.createElement("dialog");
    const closeButton = document.createElement("div");
    const enemyLastAttack = document.createElement("p");
    const enemyShipData = document.createElement("p");

    modal.classList.add("spy-modal");
    closeButton.classList.add("close-modal");
    enemyLastAttack.classList.add("enemy-last-attack");
    enemyShipData.classList.add("enemy-ship-data");

    modal.appendChild(closeButton);
    modal.appendChild(enemyLastAttack);
    modal.appendChild(enemyShipData);

    closeButton.textContent = "x";

    closeButton.addEventListener("click", activeGameController.closeModal);
    return modal;
  },
  closeModal: function (e) {
    e.preventDefault();
    const modalSpace = document.querySelector("#modal-reserved-space");
    modalSpace.textContent = "";
  },
};

export { domController, activeGameController };

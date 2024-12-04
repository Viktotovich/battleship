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
  confirmSelection: function () {
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

/* 
TODO: 
  1 - understand why board-randomizer's genRX (rx + shipLength <= 10) works
  2 - make resetPlacement work - 90% done - Dont let the player start if no ships placed
  5 - disable hard algorithm, if this project seems like it wont be done by 7Dec (due to 
  work)
  6 - Make the ready button work, and start game!
*/

export { domController };

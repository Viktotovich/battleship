const domController = {
  playerDOMs: [],
  placeableShips: [],
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
  showShipToPlace: function () {
    if (this.placeableShips.length === 0) {
      //stop, since no ships
    }

    //otherwise, use currentShipContainer to place another ship inside
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
};

export { domController };

/* eslint-disable */
class Gameboard {
  constructor(player) {
    // Player is player1 or 2, or computer
    this.player = player;
    this.gameArea = this.initialize();
  }

  initialize() {
    let container = this.createArrSet();
    for (let i = 0; i < container.length; i++) {
      container[i] = this.createArrSet();
    }

    return container;
  }

  createArrSet() {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push([]);
    }
    return arr;
  }

  placeShip(ship, coordinatesObj) {
    let isValid = this.checkCoordinates(coordinatesObj);

    if (isValid === false) {
      throw new Error("The selected space is already taken");
    } else {
      //
    }
  }

  checkCoordinates(coordinatesObj) {
    let { xStart, xEnd, yStart, yEnd, shipDirection } = coordinatesObj;
    let isLegal = true;
    let cord;

    if (shipDirection === "horizonal") {
      for (let x = xStart; x < xEnd; x++) {
        cord = this.gameArea[yStart][x];
        if (cord !== null) {
          isLegal = false;
        }
      }
    } else {
      for (let y = yStart; y < yEnd; y++) {
        cord = this.gameArea[y][xStart];
        if (cord !== null) {
          isLegal = false;
        }
      }
    }

    return isLegal;
  }
}

export { Gameboard };

/*
Solving placeShip()
      check every Y/X array from start to end to be empty
      check 1 above, left right, below, to not have ships, as per OG rules
      Crazy idea: return the array pointe


  Just in-case this implementation works for the future - currently it doesn't, due to the fact that there is an easier way to do it.
  placeShip(ship, coordinatesObj) {
    //shipDirection is basically whether it's vertical or horizontal
    coordinatesObj = this.processCoordinates(ship, coordinatesObj);
  }

  processCoordinates(ship, coordinatesObj) {
    let [coordinateX, coordinateY, shipDirection] = coordinatesObj;
    let shipSpace = ship.length;

    let coordinateYend = coordinateY;
    let coordinateXend = coordinateX;

    if (shipDirection === "vertical") {
      coordinateYend += shipSpace;
    } else {
      coordinateXend += shipSpace;
    }
}


//scope creep here went HARD

  placeShip(ship, coordinatesObj) {
    let [cordStart, cordEnd, shipDirection] = coordinatesObj;
    let isLegalSpace = this.checkSpace(cordStart, cordEnd, shipDirection);
  }

  checkSpace(cordStart, cordEnd, shipDirection) {
    let xStart = cordStart[0];
    let xEnd = cordEnd[0];
    let yStart = cordStart[1];
    let yEnd = cordEnd[1];

    let isLegal = true;

    if (shipDirection === "verical") {
      for (let x = xStart; x < xEnd; x++) {
        this.checkCord(x, yStart) === null
          ? (isLegal = true)
          : (isLegal = false);
      }
    } else {
      for (let y = yStart; y < yEnd; y++) {
        this.checkCord(y, xStart) === null
          ? (isLegal = true)
          : (isLegal = false);
      }
    }
  }

  checkCord(cordX, cordY) {
    return this.gameArea[cordY][cordX];
  }
*/

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
    //This is revenge for inventing de-structuring /s
    let [cordStart, cordEnd] = coordinatesObj;
    let [cordX, cordY] = [cordStart[0], cordStart[1]];
    let [cordEndX, cordEndY] = [cordEnd[0], cordEnd[1]];
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
*/

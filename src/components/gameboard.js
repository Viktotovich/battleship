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
    /*This is the stackoverflow version, but it sucks because
    it returns multiple nestings of array:
    return Array.from({ length: 10 }).fill([]); */
    let arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push([]);
    }
    return arr;
  }

  placeShip(ship, coordinatesObj) {
    //shipDirection is basically whether it's vertical or horizontal
    this.processCoordinates(ship, coordinatesObj);
  }

  processCoordinates(ship, coordinatesObj) {
    let [coordinateX, coordinateY, shipDirection] = coordinatesObj;
    let shipSpace = ship.length;

    let coordinateYend;
    let coordinateXend;

    if (shipDirection === "vertical") {
      coordinateXend = cordinateX;
      coordinateYend = coordinateY + shipSpace;
      //probably return new Coordinate object would be a nice approach
      //check every Y array from start to end to be empty
    } else {
      coordinateYend = cordinateY;
      coordinateXend = coordinateX + shipSpace;
      //check every X array from start to end to be empty
    }
  }
}

export { Gameboard };

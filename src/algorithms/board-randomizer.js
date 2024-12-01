/*inshallah I never have to touch this shit again, I dont even want to think about 
how it works. */

const boardRandomizer = {
  cordArr: [],
  initiate: function (ships) {
    boardRandomizer.assignRandomDirection(ships);
    return boardRandomizer.cordArr;
  },
  assignRandomDirection: function (ships) {
    Object.keys(ships).forEach((key) => {
      ships[key].direction = boardRandomizer.generateDirectionToken();
      boardRandomizer.generateRandomPlacement(ships[key]);
    });
  },
  generateDirectionToken() {
    let rToken = Math.round(Math.random() * 2);
    if (rToken === 1) {
      return "horizontal";
    } else {
      return "vertical";
    }
  },
  generateRandomPlacement(shipObj) {
    if (shipObj.direction === "horizontal") {
      boardRandomizer.cordArr.push(boardRandomizer.placeH(shipObj));
    } else {
      boardRandomizer.cordArr.push(boardRandomizer.placeV(shipObj));
    }
  },
  placeH: function (shipObj) {
    //
    let xStart = boardRandomizer.genRX(shipObj.health);
    let yStart = Math.round(Math.random() * 9);
    let yEnd = yStart;
    let xEnd = xStart + shipObj.health;
    let direction = shipObj.direction;

    return {
      xStart,
      xEnd,
      yStart,
      yEnd,
      direction,
    };
  },
  placeV: function (shipObj) {
    //
    let yStart = boardRandomizer.genRY(shipObj.health);
    let xStart = Math.round(Math.random() * 9);
    let yEnd = yStart + shipObj.health;
    let xEnd = xStart;
    let direction = shipObj.direction;

    return {
      xStart,
      xEnd,
      yStart,
      yEnd,
      direction,
    };
  },
  genRX: function (shipLength) {
    let rX = Math.round(Math.random() * 7); //lowest ship length is 2
    if (rX + shipLength < 9) {
      return rX;
    } else {
      //if the ship exceeds the boundary, try again
      return boardRandomizer.genRX(shipLength);
    }
  },
  genRY: function (shipLength) {
    let rY = Math.round(Math.random() * 7); //lowest ship length is 2
    if (rY + shipLength < 9) {
      return rY;
    } else {
      //if the ship exceeds the boundary, try again
      return boardRandomizer.genRY(shipLength);
    }
  },
};

export { boardRandomizer };

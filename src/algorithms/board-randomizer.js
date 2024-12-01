/*
  From my notebook: 
  -------------------------------------------------------------------------------------
    Fun fact - we dont even need the board at all.
    10x10 board - 100 tiles. Choose a random number an go ship.length tiles
    down/right. Check if those tiles are taken, if they are - generate another point.

    Basically, any point 0-99. 99 will not have space to the rifht, so 0-95 is a 
    slightly inaccruate, but an effective version.
        Reasoning: Longest ship is 5 tiles long. I'ts inaccurate because after placing 
        the 5 tile ship, there are smaller ships that could fit into that little space.
  ------------------------------------------------------------------------------------
*/

const boardRandomizer = {
  cordArr: [],
  initiate: function (ships) {
    boardRandomizer.assignRandomDirection(ships);
    console.log(this.cordArr);
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

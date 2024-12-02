/* 
  Cordinates are not checked for duplicates or collisions, TODO
*/

import { Tree } from "./binary-search-tree"; //optimising look-up time to 0(n) vs O(n!)

const boardRandomizer = {
  cordTree: null,
  cordArr: [],
  initiate: function (ships) {
    this.cordTree = new Tree([-1]); // the only value that wont conflict with anything
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
    let xStart = boardRandomizer.genRX(shipObj.health, 7);
    let yStart = boardRandomizer.genRY(1, 9);
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
    let yStart = boardRandomizer.genRY(shipObj.health, 7);
    let xStart = boardRandomizer.genRX(1, 9);
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
  /* genRX and genRY can probably be the same function, but I would rather
  not risk any implication / potential side effects of removing them */
  genRX: function (shipLength, factor) {
    let rX = Math.round(Math.random() * factor); //lowest ship length is 2
    if (rX + shipLength < 9 && boardRandomizer.checkCollision(rX)) {
      this.cordTree.insert(rX);
      return rX;
    } else {
      //if the ship exceeds the boundary, try again
      return boardRandomizer.genRX(shipLength);
    }
  },
  genRY: function (shipLength, factor) {
    let rY = Math.round(Math.random() * factor); //lowest ship length is 2
    if (rY + shipLength < 9 && boardRandomizer.checkCollision(rY)) {
      this.cordTree.insert(rY);
      return rY;
    } else {
      //if the ship exceeds the boundary, try again
      return boardRandomizer.genRY(shipLength);
    }
  },
  checkCollision: function (checkedCord) {
    return this.cordTree.bstContains(checkedCord) ? false : true;
  },
};

export { boardRandomizer };

/*
  The genius of today is a dumba** of tommorow. I understand my choices now, 
  but I will not later.

  Documentation:

    genRX: function (shipLength, factor) { 
                                    ^
            This makes genRX and genRY reusable for when ships are placed V or H

    Which means we can pull this off:
            let xStart = boardRandomizer.genRX(1, 9);
            let yStart = boardRandomizer.genRY(1, 9);

    Why? 
      We tried Math.random(), and there was a caveat: we never actually checked 
      one of the angles: X or Y, so in cases where we just ran boardRandomizer genX or 
      Y, the value that was just a single digit (aka, ship was place vertically and
      we only needed 1 cord) - we didnt actually run any checks if that value was
      already taken

    We might need to flatten cords
*/

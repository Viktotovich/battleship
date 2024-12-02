/* 
  Cordinates are not checked for duplicates or collisions, TODO
*/

import { Tree } from "./binary-search-tree"; //optimising look-up time to 0(n) vs O(n!)
import { cordConverter } from "../controllers/cord-value-converter";

const boardRandomizer = {
  cordTree: null,
  cordArr: [],
  initiate: function (ships) {
    this.cordTree = new Tree([-1]); // the only value that wont conflict with anything
    boardRandomizer.assignRandomDirection(ships);
    console.log(boardRandomizer.cordArr);
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

    for (let i = xStart; i < xEnd; i++) {
      if (!this.checkCollision(i, yStart)) {
        return this.placeH(shipObj);
      }
    }

    //TODO: improve, I got tired
    let flatCord = null;
    for (let i = xStart; i < xEnd; i++) {
      flatCord = boardRandomizer.getFlattenedCords(i, yStart);
      boardRandomizer.cordTree.insert(flatCord);
    }
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

    for (let i = yStart; i < yEnd; i++) {
      if (!this.checkCollision(xStart, i)) {
        return this.placeV(shipObj);
      }
    }

    let flatCord = null;
    for (let i = yStart; i < yEnd; i++) {
      flatCord = boardRandomizer.getFlattenedCords(xStart, i);
      boardRandomizer.cordTree.insert(flatCord);
    }
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
    if (rX + shipLength <= 10) {
      return rX;
    } else {
      //if the ship exceeds the boundary, try again
      return boardRandomizer.genRX(shipLength, factor);
    }
  },
  genRY: function (shipLength, factor) {
    let rY = Math.round(Math.random() * factor); //lowest ship length is 2
    if (rY + shipLength <= 10) {
      return rY;
    } else {
      //if the ship exceeds the boundary, try again
      return boardRandomizer.genRY(shipLength, factor);
    }
  },
  checkCollision: function (x, y) {
    let flatCords = this.getFlattenedCords(x, y);
    return !this.cordTree.bstContains(flatCords);
  },
  getFlattenedCords: function (x, y) {
    return cordConverter.flattenCords(x, y);
  },
};

export { boardRandomizer };

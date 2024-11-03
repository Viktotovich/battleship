/* eslint-disable */
import { Ship } from "./ship";

class Gameboard {
  constructor(player) {
    this.player = player;
    this.board = this.createBoard();
  }

  createBoard() {
    let yAxis = [];
    let boardPart;

    for (let i = 0; i < 10; i++) {
      yAxis.push([]);
      for (let x = 0; x < 10; x++) {
        boardPart = new Tile({ xCord: x, yCord: i });
        yAxis[i].push(boardPart);
      }
    }
    return yAxis;
  }

  placeShip(ship, cordObj) {
    let placementData;
    cordObj.shipDirection === "horizontal"
      ? (placementData = this.placeOnX(cordObj))
      : (placementData = this.placeOnY(cordObj));

    /*There was a cleaner implementation, but this worked best because I didn't have to think about what happens if somewhere mid-way of adding a ship to tiles, we found out that one of the co-ordinates was taken*/

    placementData.forEach((tile) => {
      tile.addShip(ship);
    });
  }

  placeOnX(cordObj) {
    let { xStart, xEnd, yStart } = cordObj;
    let tileArr = [];
    let tile;

    for (let x = xStart; x < xEnd; x++) {
      tile = this.board[yStart][x];
      if (tile.contains !== null) this.STOP();
      tileArr.push(tile);
    }

    return tileArr;
  }

  placeOnY(cordObj) {
    let { xStart, xEnd, yStart, yEnd } = cordObj;
    let tileArr = [];
    let tile;

    for (let y = yStart; y < yEnd; y++) {
      tile = this.board[y][xEnd];
      if (tile.contains !== null) this.STOP();
      tileArr.push(tile);
    }

    return tileArr;
  }

  STOP() {
    throw new Error("space already taken");
  }
}

//something akin to a linked list? like a Node
class Tile {
  constructor(positionObj) {
    this.hit = false;
    this.hasShip = false;
    this.position = positionObj;
    this.contains = null;
  }

  addShip(ship) {
    this.contains = ship;
    this.hasShip = true;
  }

  takeHit() {
    this.hit = true;
    this.contains.hit();
    this.contains = "carcass";
  }
}

export { Gameboard };

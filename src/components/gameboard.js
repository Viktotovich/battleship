/* eslint-disable */
import { Ship } from "./ship";

class Gameboard {
  constructor(player) {
    this.player = player;
    this.board = this.createBoard();
    this.missedShots = [];
    this.shipCount = 0;
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

  placeShip(shipObj, cordObj) {
    let ship = this.unpackShip(shipObj);
    let placementData;
    cordObj.shipDirection === "horizontal"
      ? (placementData = this.placeOnX(cordObj))
      : (placementData = this.placeOnY(cordObj));

    /*There was a cleaner implementation, but this worked best because I didn't have to think about what happens if somewhere mid-way of adding a ship to tiles, we found out that one of the co-ordinates was taken*/

    placementData.forEach((tile) => {
      tile.addShip(ship);
    });

    this.shipCount += 1;
  }

  unpackShip(shipObj) {
    let ship = new Ship(shipObj.health, shipObj.type);
    return ship;
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

  receiveAttack(attackCordinates) {
    let [x, y] = attackCordinates;
    let attackedTile = this.board[y][x];

    if (attackedTile.hit === true) {
      return {
        attack: "failed",
        message: "repetition",
      };
    } else if (attackedTile.hasShip === false) {
      attackedTile.hit = true;
      this.missedShots.push(attackCordinates);
      return {
        attack: "success",
        message: "miss",
      };
    } else if (attackedTile.hasShip === true && attackedTile.hit === false) {
      attackedTile.takeHit();

      let isSunk = attackedTile.contains.isSunk();

      if (isSunk === true) {
        this.shipCount -= 1;
        return {
          attack: "success",
          message: "sunk",
        };
      } else {
        return {
          attack: "success",
          message: "bullseye",
        };
      }
    }
  }

  STOP() {
    throw new Error("space already taken");
  }

  isEmpty() {
    return this.shipCount === 0 ? true : false;
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
  }
}

export { Gameboard };

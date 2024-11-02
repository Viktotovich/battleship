import { Ship } from "./ship";

/* eslint-disable */
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

  placeShip() {}
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
  }

  takeHit() {
    this.hit = true;
    this.contains = null;
  }
}

export { Gameboard };

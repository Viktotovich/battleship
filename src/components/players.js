import { Gameboard } from "./gameboard";

class Player {
  constructor(type, name = "Mr BotEvil") {
    this.type = type;
    this.name = name;
    this.gameboard = this.createBoard(name);
    this.opponent = null;
  }

  createBoard(name) {
    let board = new Gameboard(name);
    return board;
  }

  addOpponent(opponentObj) {
    this.opponent = opponentObj;
  }
}

export { Player };

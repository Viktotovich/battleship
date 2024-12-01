import { Player } from "../components/players";
import { Computer } from "../components/computer";

/* Almost like classes, but just easier to visualize. Data can get overwhelming, 
this helps keep track of everything - this is my standard pattern for other projects*/

const gameController = {
  players: [],
  turn: 0,
  createPlayer: function (type, name = "") {
    let player = new Player(type, name);
    this.players.push(player);
  },
  unpackGame: function (gameObj) {
    return gameObj.type === "pvp"
      ? this.startPVP(gameObj)
      : this.startPVC(gameObj);
  },
  startPVC: function (gameObj) {
    let player1 = new Player("player", gameObj.player1Name);
    let player2 = new Player("computer");

    player1.addOpponent(player2);
    player2.addOpponent(player1);

    player2 = new Computer(gameObj.cDifficulty, player2);

    this.players.push(player1);
    this.players.push(player2);

    return {
      player1,
      player2: player2.playerObj,
      computerControls: player2, //wow wtf, this idea is kinda rad
      gametype: "pvc",
    };
  },
  startPVP: function (gameObj) {
    let player1 = new Player("player", gameObj.player1Name);
    let player2 = new Player("player", gameObj.player2Name);

    player1.addOpponent(player2);
    player2.addOpponent(player1);

    this.players.push(player1);
    this.players.push(player2);

    return {
      player1,
      player2,
      gametype: "pvp",
    };
  },
  getShips() {
    const carrier = {
      health: 5,
      type: "carrier",
    };

    const battleship = {
      health: 4,
      type: "battleship",
    };

    const cruiser = {
      health: 3,
      type: "cruiser",
    };

    const submarine = {
      health: 3,
      type: "submarine",
    };

    const destroyer = {
      health: 2,
      type: "destroyer",
    };

    return { carrier, battleship, cruiser, submarine, destroyer };
  },
};

export { gameController };

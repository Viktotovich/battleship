/*eslint-disable*/
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
  startGamePVC: function (p1Cordinates, p2Cordinates) {
    let ships = gameController.getShips();
    let shipArr = [];

    Object.values(ships).forEach((ship) => {
      shipArr.push(ship);
    });

    playerControls.initiate(
      gameController.players[0],
      gameController.players[1],
      p1Cordinates,
      p2Cordinates,
      shipArr
    );
  },
};

const playerControls = {
  ships: null,
  computerControl: null,
  p1Object: null,
  p2Object: null,
  p1Cordinates: null,
  p2Cordinates: null,
  initiate: function (
    p1Object,
    computerControl,
    p1Cordinates,
    p2Cordinates,
    shipArr
  ) {
    this.ships = shipArr;
    this.p1Object = p1Object;
    this.computerControl = computerControl;
    this.p2Object = computerControl.playerObj;
    this.p1Cordinates = p1Cordinates;
    this.p2Cordinates = p2Cordinates;

    this.placeShipsOnObj();
  },
  placeShipsOnObj: function () {
    let index = 0;
    this.ships.forEach((ship) => {
      playerControls.p1Object.gameboard.placeShip(
        ship,
        playerControls.p1Cordinates[index]
      );
      index++;
    });

    index *= 0;

    this.ships.forEach((ship) => {
      playerControls.p2Object.gameboard.placeShip(
        ship,
        playerControls.p2Cordinates[index]
      );
      index++;
    });
  },
};

export { gameController };

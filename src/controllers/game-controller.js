/*eslint-disable*/
import { Player } from "../components/players";
import { Computer } from "../components/computer";
import { activeGameController, domController } from "./dom-controller";
import { cordConverter } from "./cord-value-converter";

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
  turnInfo: null,
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
    activeGameController.initiate(); //it doesnt need to know anything
    playerControls.activateListeners();
    playerControls.appendNames();
    playerControls.activateSpyTool();

    this.turnInfo = document.querySelector("#turn-info");
    this.turnInfo.textContent = "Round Start";
  },
  appendNames: function () {
    const p1NameContainer = document.querySelector(".player1-name");
    const p2NameContainer = document.querySelector(".player2-name");

    p1NameContainer.textContent = playerControls.p1Object.name;
    p2NameContainer.textContent = playerControls.p2Object.name;
  },
  activateListeners: function () {
    activeGameController.p2DOMBoard.forEach((tile) => {
      tile.addEventListener("click", playerControls.fire);
    });
  },
  fire: function (e) {
    e.preventDefault();

    e.target.removeEventListener("click", playerControls.fire);
    e.target.classList.remove("unhit");
    e.target.classList.add("hit");
    //if not player's turn, ignore

    let cord = playerControls.getCord(e.target);
    playerControls.playerShoots(cord, e);
  },
  playerShoots: function (cord, e) {
    const attackCords = cordConverter.unpackCords(cord);
    const attackInfo =
      playerControls.p2Object.gameboard.receiveAttack(attackCords);

    playerControls.turnInfo.innerHTML = `Missle launch ${attackInfo.attack}! Ground Report: <strong>${attackInfo.message}</strong>`;

    if (attackInfo.message !== "miss") {
      e.target.classList.add("has-ship");
    }

    if (playerControls.computerLost()) {
      endGame(playerControls.p1Object.name);
    }

    playerControls.computerResponds();
  },
  playerLost: function () {
    console.log(playerControls.p1Object.gameboard.shipCount);
    return playerControls.p1Object.gameboard.shipsCount === 0 ? true : false;
  },
  computerLost: function () {
    console.log(playerControls.p2Object.gameboard.shipCount);
    return playerControls.p2Object.gameboard.shipsCount === 0 ? true : false;
  },
  computerResponds: function () {
    let { attackResponse, x, y } = playerControls.computerControl.play();

    if (attackResponse.message === "repetition") {
      return (attackResponse = playerControls.computerResponds());
    }

    let flatCord = cordConverter.flattenCords(x, y);

    lastAttackData.p2LastAttackResponse = attackResponse;

    let hitTile = document.getElementById(`player-one-cord-${flatCord}`);
    hitTile.classList.remove("unhit");
    hitTile.classList.add("hit");

    if (attackResponse.message !== "miss") {
      hitTile.classList.add("has-ship");
    }

    if (playerControls.playerLost()) {
      endGame(playerControls.p2Object.name);
    }
  },
  getCord: function (tile) {
    let cord = tile.getAttribute("id");
    return cord.substring(16);
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

    if (this.p1Object.gameboard.shipCount < 5) {
      throw new Error(
        "Something went wrong, you have less than 5 ships. Please re-fresh the page and place all the 5 ships again. Thank you for your understanding"
      );
    }
  },
  activateSpyTool: function () {
    let spyTool = document.querySelector("#click-to-spy");
    spyTool.addEventListener("click", lastAttackData.getEnemyInformation);
  },
};

const lastAttackData = {
  p2LastAttackResponse: null,
  getEnemyInformation: function (e) {
    e.preventDefault();
    if (lastAttackData.p2LastAttackResponse === null) {
      return;
    }

    let modalSpace = document.getElementById("modal-reserved-space");
    modalSpace.textContent = "";

    let modal = activeGameController.createSpyModal();
    modalSpace.appendChild(modal);
    modal.show();

    const enemyLastAttack = document.querySelector(".enemy-last-attack");
    const enemyShipData = document.querySelector(".enemy-ship-data");

    enemyLastAttack.innerHTML = `MUAHAHAHAAHA. Our super evil missle launch was a ${lastAttackData.p2LastAttackResponse.attack}! Ground Report: <strong>${lastAttackData.p2LastAttackResponse.message}</strong>`;

    enemyShipData.textContent = `${playerControls.p1Object.name} sire, our intellegence reports that the enemy has ${playerControls.p2Object.gameboard.shipCount} ships alive!`;
  },
};

//Add an end-game condition and pop-up
function endGame(winner) {
  domController.activeGameController.endGameModal(winner);
}

export { gameController };

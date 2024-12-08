/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/computer.js":
/*!************************************!*\
  !*** ./src/components/computer.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Computer: () => (/* binding */ Computer)
/* harmony export */ });
class Computer {
  constructor(difficulty, playerObj) {
    this.difficulty = difficulty;
    this.playerObj = playerObj;
    this.algorithm = this.getAlgorithm();
  }
  play() {
    // call the algorithm?
  }

  //Hunt and Target algorithm is in-common between all
  getAlgorithm() {
    if (this.difficulty === "easy") {
      //victory through randomness
      return;
    } else if (this.difficulty === "normal") {
      /* easy 2-step-space based algorithm, victory through efficient space-ing. Parody Algorithm.
      
      Improved: The space between each shot is the length of the shortest living ship*/
      return;
    } else {
      /* You know shit is about to get real when I link a video to Vsauce
      
      https://www.youtube.com/watch?v=LbALFZoRrw8
       Give a warning: You Are going to Loose
       Algorithm: Probability maps
      */
      return;
    }
  }
}


/***/ }),

/***/ "./src/components/gameboard.js":
/*!*************************************!*\
  !*** ./src/components/gameboard.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Gameboard: () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/components/ship.js");
/* eslint-disable */

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
        boardPart = new Tile({
          xCord: x,
          yCord: i
        });
        yAxis[i].push(boardPart);
      }
    }
    return yAxis;
  }
  placeShip(shipObj, cordObj) {
    let ship = this.unpackShip(shipObj);
    let placementData;
    cordObj.shipDirection === "horizontal" ? placementData = this.placeOnX(cordObj) : placementData = this.placeOnY(cordObj);

    /*There was a cleaner implementation, but this worked best because I didn't have to 
    think about what happens if somewhere mid-way of adding a ship to tiles, we found out 
    that one of the co-ordinates was taken*/

    placementData.forEach(tile => {
      tile.addShip(ship);
    });
    this.shipCount += 1;
  }
  unpackShip(shipObj) {
    let ship = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(shipObj.health, shipObj.type);
    return ship;
  }
  placeOnX(cordObj) {
    let {
      xStart,
      xEnd,
      yStart
    } = cordObj;
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
    let {
      xStart,
      xEnd,
      yStart,
      yEnd
    } = cordObj;
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
        message: "repetition"
      };
    } else if (attackedTile.hasShip === false) {
      attackedTile.hit = true;
      this.missedShots.push(attackCordinates);
      return {
        attack: "success",
        message: "miss"
      };
    } else if (attackedTile.hasShip === true && attackedTile.hit === false) {
      attackedTile.takeHit();
      let isSunk = attackedTile.contains.isSunk();
      if (isSunk === true) {
        this.shipCount -= 1;
        return {
          attack: "success",
          message: "sunk"
        };
      } else {
        return {
          attack: "success",
          message: "bullseye"
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


/***/ }),

/***/ "./src/components/players.js":
/*!***********************************!*\
  !*** ./src/components/players.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Player: () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/components/gameboard.js");

class Player {
  constructor(type) {
    let name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Mr BotEvil";
    this.type = type;
    this.name = name;
    this.gameboard = this.createBoard(name);
    this.opponent = null;
  }
  createBoard(name) {
    let board = new _gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard(name);
    return board;
  }
  addOpponent(opponentObj) {
    this.opponent = opponentObj;
  }
}


/***/ }),

/***/ "./src/components/ship.js":
/*!********************************!*\
  !*** ./src/components/ship.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ship: () => (/* binding */ Ship)
/* harmony export */ });
class Ship {
  constructor(length, name) {
    this.length = length;
    this.name = name;
    this.health = length;
  }
  hit() {
    this.health -= 1;
  }
  isSunk() {
    if (this.health === 0) {
      return true;
    } else {
      return false;
    }
  }
}


/***/ }),

/***/ "./src/controllers/dom-controller.js":
/*!*******************************************!*\
  !*** ./src/controllers/dom-controller.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   domController: () => (/* binding */ domController)
/* harmony export */ });
const domController = {
  playerDOMs: [],
  createDOMBoard: function () {
    const boardContainer = document.createElement("div");
    let domArr = [];
    for (let i = 0; i < 100; i++) {
      let boardPiece = document.createElement("div");
      boardPiece.classList.add("board-piece");
      domArr.push(boardPiece);
      boardContainer.appendChild(boardPiece);
    }
    this.playerDOMs.push(domArr);
    return boardContainer;
  },
  cordsToDOMIndex(x, y) {
    let index = x + y * 10;
    return index;
  }
};


/***/ }),

/***/ "./src/controllers/game-controller.js":
/*!********************************************!*\
  !*** ./src/controllers/game-controller.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   gameController: () => (/* binding */ gameController)
/* harmony export */ });
/* harmony import */ var _components_players__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/players */ "./src/components/players.js");
/* harmony import */ var _components_computer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/computer */ "./src/components/computer.js");


/* Almost like classes, but just easier to visualize. Data can get overwhelming, 
this helps keep track of everything - this is my standard pattern for other projects*/

const gameController = {
  players: [],
  turn: 0,
  createPlayer: function (type) {
    let name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    let player = new _components_players__WEBPACK_IMPORTED_MODULE_0__.Player(type, name);
    this.players.push(player);
  },
  unpackGame: function (gameObj) {
    return gameObj.type === "pvp" ? this.startPVP(gameObj) : this.startPVC(gameObj);
  },
  startPVC: function (gameObj) {
    let player1 = new _components_players__WEBPACK_IMPORTED_MODULE_0__.Player("player", gameObj.player1Name);
    let player2 = new _components_players__WEBPACK_IMPORTED_MODULE_0__.Player("computer");
    player1.addOpponent(player2);
    player2.addOpponent(player1);
    player2 = new _components_computer__WEBPACK_IMPORTED_MODULE_1__.Computer(gameObj.cDifficulty, player2);
    this.players.push(player1);
    this.players.push(player2);
    return {
      player1,
      player2: player2.playerObj,
      computerControls: player2,
      gametype: "pvc"
    };
  },
  startPVP: function (gameObj) {
    let player1 = new _components_players__WEBPACK_IMPORTED_MODULE_0__.Player("player", gameObj.player1Name);
    let player2 = new _components_players__WEBPACK_IMPORTED_MODULE_0__.Player("player", gameObj.player2Name);
    player1.addOpponent(player2);
    player2.addOpponent(player1);
    this.players.push(player1);
    this.players.push(player2);
    return {
      player1,
      player2,
      gametype: "pvp"
    };
  }
};

/*Pre-requisite tasks:
 * 2 - Pop-up with turn switch if Player vs Player.
 * 3 - If PvC, algorithm logic goes first
 * 5 - Coordinates and DOM logic, workit-kit's logic was flawed: I've learned since. We
 * could have a list of DOM references which is a better implementation, the pointers have eventListeners, we don't need to figure out what was clicked where.
 * 6 - A condition for endGame... however this could probably done here.
 */

/* Do I make a new component with GameType class? as in new GameType for PVP and PVC? with their own methods? They are different enough to justify this abstraction level.

I think the better question is, does the current implementation bother me enough to warrant another class? And the answer is no, not yet. But I see it coming to that. 

Here is a breakdown if it does:

GameType class has methods that are "game-drivers" or whatever, point is - they drive 
the game. Depending if PVC or PVP, it either calls the computer object to take it's turn 
by the "takeTurn()" method that deducts a movement point. 

Movement point gets added if  it's a hit. If it's the player object, it calls the 
takeTurn() method with a twist: it shows the 10/7/5 second counter or whatever feels 
best to pass to another player, and then allows hits. 

In PVC we have a gotcha: we need to O(n) re-generate the board on the UI to hide it for the other player. Or maybe a clever hack with classes? 

Try this: 
(I have to write it down because the next 30 days I am working non-stop in events
without days off, RIPio)

1 - Classes trick: add classes for hit, and using your dom array - hide both of the player's arrays by activating the .classList.add("temporary-hide") trick for both sides. So when the players have to pass, they only see the ("hit") class while their boats are hidden. 

So what is a boat then? 

(in the context of UI and display), a boat is a CSS filler? or how do we make sure the boat is hidden? fuck that's hard. Let the future me solve the problem while building up on the idea.

So many ideas to try, I am like a fat kid in a candy shop eye-ing every single thing to try it out. But alas, candy can't pay for rent. Ripio of now, I'll come back. All I am doing with this work is buying more time to do the things I love. 

/End of rant

Build the fucking class
*/


/***/ }),

/***/ "./src/pages/initial-load.js":
/*!***********************************!*\
  !*** ./src/pages/initial-load.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initialPageController: () => (/* binding */ initialPageController)
/* harmony export */ });
/* harmony import */ var _pvp_screen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pvp-screen */ "./src/pages/pvp-screen.js");
/* harmony import */ var _pvc_screen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pvc-screen */ "./src/pages/pvc-screen.js");
/*  Initial load page to get the user input for 

1 - name
2 - type of game (PvP or PvC)
3 - if PvC, difficulty

Nothing else matters - just to load the next page when done
 */


const initialPageController = {
  contentSpace: document.querySelector("#content"),
  initiate: function () {
    let title = this.createTitle();
    let form = this.createForm();
    this.contentSpace.appendChild(title);
    this.contentSpace.appendChild(form);
  },
  createForm: function () {
    const form = document.createElement("form");
    const gameTypeContainer = document.createElement("div");
    const pvpButton = document.createElement("button");
    const pvcButton = document.createElement("button");
    gameTypeContainer.classList.add("game-type-container");
    form.classList.add("game-type");
    pvpButton.classList.add("pvp");
    pvcButton.classList.add("pvc");
    pvpButton.textContent = "Play against a player";
    pvcButton.textContent = "Play against a computer";
    form.appendChild(gameTypeContainer);
    gameTypeContainer.appendChild(pvpButton);
    gameTypeContainer.appendChild(pvcButton);
    this.activateListeners(pvpButton, pvcButton);
    return form;
  },
  createTitle() {
    const titleContainer = document.createElement("div");
    const title = document.createElement("h2");
    const battleshipImage = document.createElement("div");
    title.textContent = "Play BattleShip";
    titleContainer.appendChild(title);
    titleContainer.appendChild(battleshipImage);
    return titleContainer;
  },
  activateListeners(pvpButton, pvcButton) {
    pvpButton.addEventListener("click", this.loadPVP);
    pvcButton.addEventListener("click", this.loadPVC);
  },
  loadPVP(e) {
    e.preventDefault();
    initialPageController.garbageCollect();
    _pvp_screen__WEBPACK_IMPORTED_MODULE_0__.pvpScreenController.initiate();
  },
  loadPVC(e) {
    e.preventDefault();
    initialPageController.garbageCollect();
    _pvc_screen__WEBPACK_IMPORTED_MODULE_1__.pvcScreenController.initiate();
  },
  garbageCollect() {
    this.contentSpace.textContent = "";
  }
};


/*Lots of thinking went into deciding whether or not to use Tailwind to speed up frontend. Then I saw their playgroud, Jesus McChrist, I wouldn't touch that with a 10 feet pole lol*/

/***/ }),

/***/ "./src/pages/main-game.js":
/*!********************************!*\
  !*** ./src/pages/main-game.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mainGameDisplayController: () => (/* binding */ mainGameDisplayController)
/* harmony export */ });
/* harmony import */ var _controllers_game_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/game-controller */ "./src/controllers/game-controller.js");
/* harmony import */ var _controllers_dom_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/dom-controller */ "./src/controllers/dom-controller.js");
/* eslint-disable */


const mainGameDisplayController = {
  contentSpace: document.querySelector("#content"),
  initiate: function (gameObj) {
    let gameInfoObj = _controllers_game_controller__WEBPACK_IMPORTED_MODULE_0__.gameController.unpackGame(gameObj);
    let {
      p1Board,
      p2Board
    } = this.unpackDisplay(gameInfoObj);
    let p1BoardDOM = _controllers_dom_controller__WEBPACK_IMPORTED_MODULE_1__.domController.createDOMBoard();
    let p2BoardDOM = _controllers_dom_controller__WEBPACK_IMPORTED_MODULE_1__.domController.createDOMBoard();
    this.displayBoard(p1BoardDOM);
  },
  unpackDisplay: function (gameInfo) {
    let p1Board = gameInfo.player1.gameboard.board;
    let p2Board = gameInfo.player2.gameboard.board;
    return {
      p1Board,
      p2Board
    };
  },
  displayBoard(board) {
    //
  }
};

/* Next Steps:
    You can completely forget about all other pages, and only touch them when doing frontend. We get everything we will ever need out of them with the gameObj. 
    
    We need to import the 2 controllers, this page is going to be controlled by dom-controller, and driven by game-controller. 

    We send the information to game-controller to create all the necessary things for the game to flow. 

    We expect to receive information from the dom-controller, based on user actions - and we then relay this information to the game-controller
*/

/*What is a main-game.js file anyway?

This is supposed to control the page display itself, not the DOM manipulations, nor the 
game flow. 

What does that mean?

Well, if we take, say the board itself. The first part would ask Player1 to create the 
board - and then just relay the board information to the gameController to finalize the 
Player's board. It does not create the board, nor deals with the fact that users 
interact with the board - it does not care. main-game.js is a page responsible for 
making sure that whatever page information comes its way is displayed, and that the next 
step after submission is to display the Player 2 make-a-board page / or just start the game (if against a bot)*/



/***/ }),

/***/ "./src/pages/pvc-screen.js":
/*!*********************************!*\
  !*** ./src/pages/pvc-screen.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   pvcScreenController: () => (/* binding */ pvcScreenController)
/* harmony export */ });
/* harmony import */ var _main_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main-game */ "./src/pages/main-game.js");

const pvcScreenController = {
  contentSpace: document.querySelector("#content"),
  initiate: function () {
    let title = this.createTitle();
    let difficultyChoice = this.createDifficultyChoice();
    this.contentSpace.appendChild(title);
    this.contentSpace.appendChild(difficultyChoice);
  },
  createTitle: function () {
    const titleContainer = document.createElement("div");
    const title = document.createElement("h2");
    const pvcDescription = document.createElement("div");
    title.textContent = "Please select the difficulty.";
    pvcDescription.innerHTML = "Don't select hard for giggles because <em><strong>you will</strong></em> loose. This is <strong>not</strong> a warning. Average human wins in 60-70 moves, the algorithm wins in 58.";
    titleContainer.appendChild(title);
    titleContainer.appendChild(pvcDescription);
    return titleContainer;
  },
  createDifficultyChoice: function () {
    const buttonContainer = document.createElement("div");
    const easyDifficulty = document.createElement("button");
    const mediumDifficulty = document.createElement("button");
    const hardDifficulty = document.createElement("button");
    easyDifficulty.classList.add("difficulty-select");
    mediumDifficulty.classList.add("difficulty-select");
    hardDifficulty.classList.add("difficulty-select");
    buttonContainer.appendChild(easyDifficulty);
    buttonContainer.appendChild(mediumDifficulty);
    buttonContainer.appendChild(hardDifficulty);
    easyDifficulty.textContent = "Easy";
    mediumDifficulty.textContent = "Medium";
    hardDifficulty.textContent = "⚠️Hard⚠️";
    easyDifficulty.addEventListener("click", difficultyController.callEasy);
    mediumDifficulty.addEventListener("click", difficultyController.callNormal);
    hardDifficulty.addEventListener("click", difficultyController.callHard);
    return buttonContainer;
  },
  clearAll: function () {
    pvcScreenController.contentSpace.textContent = "";
  }
};
const difficultyController = {
  callEasy: function (e) {
    e.preventDefault();
    gameInformation.cDifficulty = "easy";
    pvcScreenController.clearAll();
    nameFormController.initiate();
  },
  callNormal: function (e) {
    e.preventDefault();
    gameInformation.cDifficulty = "medium";
    pvcScreenController.clearAll();
    nameFormController.initiate();
  },
  callHard: function (e) {
    e.preventDefault();
    gameInformation.cDifficulty = "hard";
    pvcScreenController.clearAll();
    nameFormController.initiate();
  }
};
const nameFormController = {
  contentSpace: document.querySelector("#content"),
  initiate: function () {
    let title = this.createTitle();
    let nameForm = this.createForm();
    this.contentSpace.appendChild(title);
    this.contentSpace.appendChild(nameForm);
  },
  createForm: function () {
    let form = document.createElement("form");
    let nameContainer = document.createElement("div");
    let nameInput = document.createElement("input");
    let submitName = document.createElement("button");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("id", "uname");
    nameInput.setAttribute("name", "uname");
    nameInput.setAttribute("maxlength", 30);
    nameInput.setAttribute("minlength", 2);
    submitName.textContent = `Submit your name`;
    submitName.classList.add("submit-name");
    form.appendChild(nameContainer);
    nameContainer.appendChild(nameInput);
    nameContainer.appendChild(submitName);
    submitName.addEventListener("click", nameFormController.processName);
    return form;
  },
  createTitle: function () {
    const title = document.createElement("div");
    title.textContent = `Player 1, please enter your name`;
    title.classList.add("title");
    return title;
  },
  processName: function (e) {
    e.preventDefault();
    let uname = document.querySelector("#uname").value;
    if (uname == "" || uname === undefined) {
      uname = `Player1`;
    }
    gameInformation.player1Name = uname;
    pvcScreenController.clearAll();
    _main_game__WEBPACK_IMPORTED_MODULE_0__.mainGameDisplayController.initiate(gameInformation);
  }
};
const gameInformation = {
  player1Name: "",
  type: "pvc",
  cDifficulty: ""
};


/***/ }),

/***/ "./src/pages/pvp-screen.js":
/*!*********************************!*\
  !*** ./src/pages/pvp-screen.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   pvpScreenController: () => (/* binding */ pvpScreenController)
/* harmony export */ });
/* harmony import */ var _main_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main-game */ "./src/pages/main-game.js");

const pvpScreenController = {
  currentPlayer: 1,
  contentSpace: document.querySelector("#content"),
  modalSpace: document.querySelector("#modal-reserved-space"),
  initiate: function () {
    let title = this.createTitle();
    let form = this.createForm();
    this.contentSpace.appendChild(title);
    this.contentSpace.appendChild(form);
  },
  createTitle: function () {
    const titleContainer = document.createElement("div");
    const title = document.createElement("div");
    const rules = document.createElement("div");
    title.textContent = `Player ${this.currentPlayer}, please enter your name`;
    rules.textContent = "Click me to read a quick rule run-down";
    titleContainer.appendChild(title);
    titleContainer.appendChild(rules);
    titleContainer.classList.add("title-container");
    title.classList.add("title");
    rules.classList.add("rules");
    this.activateRulesPopup(rules);
    return titleContainer;
  },
  activateRulesPopup(rules) {
    rules.addEventListener("click", this.rulesPopup);
  },
  rulesPopup(e) {
    e.preventDefault();
    //Describe pass-n-play, add a counter for 10 seconds to switch.
    const modalSpace = pvpScreenController.modalSpace;
    const modal = document.createElement("dialog");
    const closeModal = document.createElement("div");
    const para = document.createElement("p");
    para.innerHTML = "Classic battleship rules. Every hit gives a player another chance at a shot. However, if a player misses: there will be a 10 second window to pass the computer to the other player. <br> <br> The first to win is the first to destroy all ships of the opposing player. Pass and play! Don't cheat, you have 10 seconds exactly for that reason.";
    closeModal.textContent = "x";
    para.classList.add("pnp-rules");
    closeModal.classList.add("close-pnp-rules");
    closeModal.addEventListener("click", modalController.closeModal);
    modalSpace.appendChild(modal);
    modal.appendChild(closeModal);
    modal.appendChild(para);
    modalController.openModal(modal);
  },
  createForm() {
    let form = document.createElement("form");
    let nameContainer = document.createElement("div");
    let nameInput = document.createElement("input");
    let submitName = document.createElement("button");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("id", "uname");
    nameInput.setAttribute("name", "uname");
    nameInput.setAttribute("maxlength", 30);
    nameInput.setAttribute("minlength", 2);
    submitName.textContent = `Submit Player${this.currentPlayer}'s name`;
    submitName.classList.add("submit-name");
    form.appendChild(nameContainer);
    nameContainer.appendChild(nameInput);
    nameContainer.appendChild(submitName);
    submitName.addEventListener("click", formController.processName);
    return form;
  },
  clearAll() {
    pvpScreenController.contentSpace.textContent = "";
  }
};
const modalController = {
  closeModal: function (e) {
    e.preventDefault;
    pvpScreenController.modalSpace.textContent = "";
  },
  openModal: function (modal) {
    modal.showModal();
  }
};
const formController = {
  gameInformation: {
    player1Name: "",
    player2Name: "",
    type: "pvp"
  },
  processName: function (e) {
    e.preventDefault();
    let uname = document.querySelector("#uname").value;
    if (uname == "" || uname === undefined) {
      uname = `Player${pvpScreenController.currentPlayer}`;
    }
    formController.createPlayerObj(uname);
  },
  createPlayerObj: function (uname) {
    pvpScreenController.currentPlayer === 1 ? formController.gameInformation.player1Name = uname : formController.gameInformation.player2Name = uname;
    pvpScreenController.currentPlayer += 1;
    if (pvpScreenController.currentPlayer > 2) {
      pvpScreenController.clearAll();
      _main_game__WEBPACK_IMPORTED_MODULE_0__.mainGameDisplayController.initiate(formController.gameInformation);
      //take players to main-game.js
    } else {
      pvpScreenController.clearAll();
      pvpScreenController.initiate();
    }
  }
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pages_initial_load__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pages/initial-load */ "./src/pages/initial-load.js");

_pages_initial_load__WEBPACK_IMPORTED_MODULE_0__.initialPageController.initiate();
//At this point, index.js is just customary
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLE1BQU1BLFFBQVEsQ0FBQztFQUNiQyxXQUFXQSxDQUFDQyxVQUFVLEVBQUVDLFNBQVMsRUFBRTtJQUNqQyxJQUFJLENBQUNELFVBQVUsR0FBR0EsVUFBVTtJQUM1QixJQUFJLENBQUNDLFNBQVMsR0FBR0EsU0FBUztJQUMxQixJQUFJLENBQUNDLFNBQVMsR0FBRyxJQUFJLENBQUNDLFlBQVksQ0FBQyxDQUFDO0VBQ3RDO0VBRUFDLElBQUlBLENBQUEsRUFBRztJQUNMO0VBQUE7O0VBR0Y7RUFDQUQsWUFBWUEsQ0FBQSxFQUFHO0lBQ2IsSUFBSSxJQUFJLENBQUNILFVBQVUsS0FBSyxNQUFNLEVBQUU7TUFDOUI7TUFDQTtJQUNGLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQ0EsVUFBVSxLQUFLLFFBQVEsRUFBRTtNQUN2QztBQUNOO0FBQ0E7TUFDTTtJQUNGLENBQUMsTUFBTTtNQUNMO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtNQUdNO0lBQ0Y7RUFDRjtBQUNGOzs7Ozs7Ozs7Ozs7Ozs7O0FDakNBO0FBQzhCO0FBRTlCLE1BQU1NLFNBQVMsQ0FBQztFQUNkUCxXQUFXQSxDQUFDUSxNQUFNLEVBQUU7SUFDbEIsSUFBSSxDQUFDQSxNQUFNLEdBQUdBLE1BQU07SUFDcEIsSUFBSSxDQUFDQyxLQUFLLEdBQUcsSUFBSSxDQUFDQyxXQUFXLENBQUMsQ0FBQztJQUMvQixJQUFJLENBQUNDLFdBQVcsR0FBRyxFQUFFO0lBQ3JCLElBQUksQ0FBQ0MsU0FBUyxHQUFHLENBQUM7RUFDcEI7RUFFQUYsV0FBV0EsQ0FBQSxFQUFHO0lBQ1osSUFBSUcsS0FBSyxHQUFHLEVBQUU7SUFDZCxJQUFJQyxTQUFTO0lBRWIsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcsRUFBRSxFQUFFQSxDQUFDLEVBQUUsRUFBRTtNQUMzQkYsS0FBSyxDQUFDRyxJQUFJLENBQUMsRUFBRSxDQUFDO01BQ2QsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcsRUFBRSxFQUFFQSxDQUFDLEVBQUUsRUFBRTtRQUMzQkgsU0FBUyxHQUFHLElBQUlJLElBQUksQ0FBQztVQUFFQyxLQUFLLEVBQUVGLENBQUM7VUFBRUcsS0FBSyxFQUFFTDtRQUFFLENBQUMsQ0FBQztRQUM1Q0YsS0FBSyxDQUFDRSxDQUFDLENBQUMsQ0FBQ0MsSUFBSSxDQUFDRixTQUFTLENBQUM7TUFDMUI7SUFDRjtJQUNBLE9BQU9ELEtBQUs7RUFDZDtFQUVBUSxTQUFTQSxDQUFDQyxPQUFPLEVBQUVDLE9BQU8sRUFBRTtJQUMxQixJQUFJQyxJQUFJLEdBQUcsSUFBSSxDQUFDQyxVQUFVLENBQUNILE9BQU8sQ0FBQztJQUNuQyxJQUFJSSxhQUFhO0lBQ2pCSCxPQUFPLENBQUNJLGFBQWEsS0FBSyxZQUFZLEdBQ2pDRCxhQUFhLEdBQUcsSUFBSSxDQUFDRSxRQUFRLENBQUNMLE9BQU8sQ0FBQyxHQUN0Q0csYUFBYSxHQUFHLElBQUksQ0FBQ0csUUFBUSxDQUFDTixPQUFPLENBQUU7O0lBRTVDO0FBQ0o7QUFDQTs7SUFFSUcsYUFBYSxDQUFDSSxPQUFPLENBQUVDLElBQUksSUFBSztNQUM5QkEsSUFBSSxDQUFDQyxPQUFPLENBQUNSLElBQUksQ0FBQztJQUNwQixDQUFDLENBQUM7SUFFRixJQUFJLENBQUNaLFNBQVMsSUFBSSxDQUFDO0VBQ3JCO0VBRUFhLFVBQVVBLENBQUNILE9BQU8sRUFBRTtJQUNsQixJQUFJRSxJQUFJLEdBQUcsSUFBSWxCLHVDQUFJLENBQUNnQixPQUFPLENBQUNXLE1BQU0sRUFBRVgsT0FBTyxDQUFDWSxJQUFJLENBQUM7SUFDakQsT0FBT1YsSUFBSTtFQUNiO0VBRUFJLFFBQVFBLENBQUNMLE9BQU8sRUFBRTtJQUNoQixJQUFJO01BQUVZLE1BQU07TUFBRUMsSUFBSTtNQUFFQztJQUFPLENBQUMsR0FBR2QsT0FBTztJQUN0QyxJQUFJZSxPQUFPLEdBQUcsRUFBRTtJQUNoQixJQUFJUCxJQUFJO0lBRVIsS0FBSyxJQUFJZCxDQUFDLEdBQUdrQixNQUFNLEVBQUVsQixDQUFDLEdBQUdtQixJQUFJLEVBQUVuQixDQUFDLEVBQUUsRUFBRTtNQUNsQ2MsSUFBSSxHQUFHLElBQUksQ0FBQ3RCLEtBQUssQ0FBQzRCLE1BQU0sQ0FBQyxDQUFDcEIsQ0FBQyxDQUFDO01BQzVCLElBQUljLElBQUksQ0FBQ1EsUUFBUSxLQUFLLElBQUksRUFBRSxJQUFJLENBQUNDLElBQUksQ0FBQyxDQUFDO01BQ3ZDRixPQUFPLENBQUN0QixJQUFJLENBQUNlLElBQUksQ0FBQztJQUNwQjtJQUVBLE9BQU9PLE9BQU87RUFDaEI7RUFFQVQsUUFBUUEsQ0FBQ04sT0FBTyxFQUFFO0lBQ2hCLElBQUk7TUFBRVksTUFBTTtNQUFFQyxJQUFJO01BQUVDLE1BQU07TUFBRUk7SUFBSyxDQUFDLEdBQUdsQixPQUFPO0lBQzVDLElBQUllLE9BQU8sR0FBRyxFQUFFO0lBQ2hCLElBQUlQLElBQUk7SUFFUixLQUFLLElBQUlXLENBQUMsR0FBR0wsTUFBTSxFQUFFSyxDQUFDLEdBQUdELElBQUksRUFBRUMsQ0FBQyxFQUFFLEVBQUU7TUFDbENYLElBQUksR0FBRyxJQUFJLENBQUN0QixLQUFLLENBQUNpQyxDQUFDLENBQUMsQ0FBQ04sSUFBSSxDQUFDO01BQzFCLElBQUlMLElBQUksQ0FBQ1EsUUFBUSxLQUFLLElBQUksRUFBRSxJQUFJLENBQUNDLElBQUksQ0FBQyxDQUFDO01BQ3ZDRixPQUFPLENBQUN0QixJQUFJLENBQUNlLElBQUksQ0FBQztJQUNwQjtJQUVBLE9BQU9PLE9BQU87RUFDaEI7RUFFQUssYUFBYUEsQ0FBQ0MsZ0JBQWdCLEVBQUU7SUFDOUIsSUFBSSxDQUFDM0IsQ0FBQyxFQUFFeUIsQ0FBQyxDQUFDLEdBQUdFLGdCQUFnQjtJQUM3QixJQUFJQyxZQUFZLEdBQUcsSUFBSSxDQUFDcEMsS0FBSyxDQUFDaUMsQ0FBQyxDQUFDLENBQUN6QixDQUFDLENBQUM7SUFFbkMsSUFBSTRCLFlBQVksQ0FBQ0MsR0FBRyxLQUFLLElBQUksRUFBRTtNQUM3QixPQUFPO1FBQ0xDLE1BQU0sRUFBRSxRQUFRO1FBQ2hCQyxPQUFPLEVBQUU7TUFDWCxDQUFDO0lBQ0gsQ0FBQyxNQUFNLElBQUlILFlBQVksQ0FBQ0ksT0FBTyxLQUFLLEtBQUssRUFBRTtNQUN6Q0osWUFBWSxDQUFDQyxHQUFHLEdBQUcsSUFBSTtNQUN2QixJQUFJLENBQUNuQyxXQUFXLENBQUNLLElBQUksQ0FBQzRCLGdCQUFnQixDQUFDO01BQ3ZDLE9BQU87UUFDTEcsTUFBTSxFQUFFLFNBQVM7UUFDakJDLE9BQU8sRUFBRTtNQUNYLENBQUM7SUFDSCxDQUFDLE1BQU0sSUFBSUgsWUFBWSxDQUFDSSxPQUFPLEtBQUssSUFBSSxJQUFJSixZQUFZLENBQUNDLEdBQUcsS0FBSyxLQUFLLEVBQUU7TUFDdEVELFlBQVksQ0FBQ0ssT0FBTyxDQUFDLENBQUM7TUFFdEIsSUFBSUMsTUFBTSxHQUFHTixZQUFZLENBQUNOLFFBQVEsQ0FBQ1ksTUFBTSxDQUFDLENBQUM7TUFFM0MsSUFBSUEsTUFBTSxLQUFLLElBQUksRUFBRTtRQUNuQixJQUFJLENBQUN2QyxTQUFTLElBQUksQ0FBQztRQUNuQixPQUFPO1VBQ0xtQyxNQUFNLEVBQUUsU0FBUztVQUNqQkMsT0FBTyxFQUFFO1FBQ1gsQ0FBQztNQUNILENBQUMsTUFBTTtRQUNMLE9BQU87VUFDTEQsTUFBTSxFQUFFLFNBQVM7VUFDakJDLE9BQU8sRUFBRTtRQUNYLENBQUM7TUFDSDtJQUNGO0VBQ0Y7RUFFQVIsSUFBSUEsQ0FBQSxFQUFHO0lBQ0wsTUFBTSxJQUFJWSxLQUFLLENBQUMscUJBQXFCLENBQUM7RUFDeEM7RUFFQUMsT0FBT0EsQ0FBQSxFQUFHO0lBQ1IsT0FBTyxJQUFJLENBQUN6QyxTQUFTLEtBQUssQ0FBQyxHQUFHLElBQUksR0FBRyxLQUFLO0VBQzVDO0FBQ0Y7O0FBRUE7QUFDQSxNQUFNTSxJQUFJLENBQUM7RUFDVGxCLFdBQVdBLENBQUNzRCxXQUFXLEVBQUU7SUFDdkIsSUFBSSxDQUFDUixHQUFHLEdBQUcsS0FBSztJQUNoQixJQUFJLENBQUNHLE9BQU8sR0FBRyxLQUFLO0lBQ3BCLElBQUksQ0FBQ00sUUFBUSxHQUFHRCxXQUFXO0lBQzNCLElBQUksQ0FBQ2YsUUFBUSxHQUFHLElBQUk7RUFDdEI7RUFFQVAsT0FBT0EsQ0FBQ1IsSUFBSSxFQUFFO0lBQ1osSUFBSSxDQUFDZSxRQUFRLEdBQUdmLElBQUk7SUFDcEIsSUFBSSxDQUFDeUIsT0FBTyxHQUFHLElBQUk7RUFDckI7RUFFQUMsT0FBT0EsQ0FBQSxFQUFHO0lBQ1IsSUFBSSxDQUFDSixHQUFHLEdBQUcsSUFBSTtJQUNmLElBQUksQ0FBQ1AsUUFBUSxDQUFDTyxHQUFHLENBQUMsQ0FBQztFQUNyQjtBQUNGOzs7Ozs7Ozs7Ozs7Ozs7O0FDM0l3QztBQUV4QyxNQUFNVSxNQUFNLENBQUM7RUFDWHhELFdBQVdBLENBQUNrQyxJQUFJLEVBQXVCO0lBQUEsSUFBckJ1QixJQUFJLEdBQUFDLFNBQUEsQ0FBQUMsTUFBQSxRQUFBRCxTQUFBLFFBQUFFLFNBQUEsR0FBQUYsU0FBQSxNQUFHLFlBQVk7SUFDbkMsSUFBSSxDQUFDeEIsSUFBSSxHQUFHQSxJQUFJO0lBQ2hCLElBQUksQ0FBQ3VCLElBQUksR0FBR0EsSUFBSTtJQUNoQixJQUFJLENBQUNJLFNBQVMsR0FBRyxJQUFJLENBQUNuRCxXQUFXLENBQUMrQyxJQUFJLENBQUM7SUFDdkMsSUFBSSxDQUFDSyxRQUFRLEdBQUcsSUFBSTtFQUN0QjtFQUVBcEQsV0FBV0EsQ0FBQytDLElBQUksRUFBRTtJQUNoQixJQUFJaEQsS0FBSyxHQUFHLElBQUlGLGlEQUFTLENBQUNrRCxJQUFJLENBQUM7SUFDL0IsT0FBT2hELEtBQUs7RUFDZDtFQUVBc0QsV0FBV0EsQ0FBQ0MsV0FBVyxFQUFFO0lBQ3ZCLElBQUksQ0FBQ0YsUUFBUSxHQUFHRSxXQUFXO0VBQzdCO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7OztBQ2xCQSxNQUFNMUQsSUFBSSxDQUFDO0VBQ1ROLFdBQVdBLENBQUMyRCxNQUFNLEVBQUVGLElBQUksRUFBRTtJQUN4QixJQUFJLENBQUNFLE1BQU0sR0FBR0EsTUFBTTtJQUNwQixJQUFJLENBQUNGLElBQUksR0FBR0EsSUFBSTtJQUNoQixJQUFJLENBQUN4QixNQUFNLEdBQUcwQixNQUFNO0VBQ3RCO0VBRUFiLEdBQUdBLENBQUEsRUFBRztJQUNKLElBQUksQ0FBQ2IsTUFBTSxJQUFJLENBQUM7RUFDbEI7RUFFQWtCLE1BQU1BLENBQUEsRUFBRztJQUNQLElBQUksSUFBSSxDQUFDbEIsTUFBTSxLQUFLLENBQUMsRUFBRTtNQUNyQixPQUFPLElBQUk7SUFDYixDQUFDLE1BQU07TUFDTCxPQUFPLEtBQUs7SUFDZDtFQUNGO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7OztBQ2xCQSxNQUFNZ0MsYUFBYSxHQUFHO0VBQ3BCQyxVQUFVLEVBQUUsRUFBRTtFQUNkQyxjQUFjLEVBQUUsU0FBQUEsQ0FBQSxFQUFZO0lBQzFCLE1BQU1DLGNBQWMsR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQ3BELElBQUlDLE1BQU0sR0FBRyxFQUFFO0lBRWYsS0FBSyxJQUFJeEQsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHLEdBQUcsRUFBRUEsQ0FBQyxFQUFFLEVBQUU7TUFDNUIsSUFBSXlELFVBQVUsR0FBR0gsUUFBUSxDQUFDQyxhQUFhLENBQUMsS0FBSyxDQUFDO01BQzlDRSxVQUFVLENBQUNDLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGFBQWEsQ0FBQztNQUN2Q0gsTUFBTSxDQUFDdkQsSUFBSSxDQUFDd0QsVUFBVSxDQUFDO01BQ3ZCSixjQUFjLENBQUNPLFdBQVcsQ0FBQ0gsVUFBVSxDQUFDO0lBQ3hDO0lBRUEsSUFBSSxDQUFDTixVQUFVLENBQUNsRCxJQUFJLENBQUN1RCxNQUFNLENBQUM7SUFFNUIsT0FBT0gsY0FBYztFQUN2QixDQUFDO0VBQ0RRLGVBQWVBLENBQUMzRCxDQUFDLEVBQUV5QixDQUFDLEVBQUU7SUFDcEIsSUFBSW1DLEtBQUssR0FBRzVELENBQUMsR0FBR3lCLENBQUMsR0FBRyxFQUFFO0lBQ3RCLE9BQU9tQyxLQUFLO0VBQ2Q7QUFDRixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3JCOEM7QUFDRztBQUNsRDtBQUNBOztBQUVBLE1BQU1DLGNBQWMsR0FBRztFQUNyQkMsT0FBTyxFQUFFLEVBQUU7RUFDWEMsSUFBSSxFQUFFLENBQUM7RUFDUEMsWUFBWSxFQUFFLFNBQUFBLENBQVUvQyxJQUFJLEVBQWE7SUFBQSxJQUFYdUIsSUFBSSxHQUFBQyxTQUFBLENBQUFDLE1BQUEsUUFBQUQsU0FBQSxRQUFBRSxTQUFBLEdBQUFGLFNBQUEsTUFBRyxFQUFFO0lBQ3JDLElBQUlsRCxNQUFNLEdBQUcsSUFBSWdELHVEQUFNLENBQUN0QixJQUFJLEVBQUV1QixJQUFJLENBQUM7SUFDbkMsSUFBSSxDQUFDc0IsT0FBTyxDQUFDL0QsSUFBSSxDQUFDUixNQUFNLENBQUM7RUFDM0IsQ0FBQztFQUNEMEUsVUFBVSxFQUFFLFNBQUFBLENBQVVDLE9BQU8sRUFBRTtJQUM3QixPQUFPQSxPQUFPLENBQUNqRCxJQUFJLEtBQUssS0FBSyxHQUN6QixJQUFJLENBQUNrRCxRQUFRLENBQUNELE9BQU8sQ0FBQyxHQUN0QixJQUFJLENBQUNFLFFBQVEsQ0FBQ0YsT0FBTyxDQUFDO0VBQzVCLENBQUM7RUFDREUsUUFBUSxFQUFFLFNBQUFBLENBQVVGLE9BQU8sRUFBRTtJQUMzQixJQUFJRyxPQUFPLEdBQUcsSUFBSTlCLHVEQUFNLENBQUMsUUFBUSxFQUFFMkIsT0FBTyxDQUFDSSxXQUFXLENBQUM7SUFDdkQsSUFBSUMsT0FBTyxHQUFHLElBQUloQyx1REFBTSxDQUFDLFVBQVUsQ0FBQztJQUVwQzhCLE9BQU8sQ0FBQ3ZCLFdBQVcsQ0FBQ3lCLE9BQU8sQ0FBQztJQUM1QkEsT0FBTyxDQUFDekIsV0FBVyxDQUFDdUIsT0FBTyxDQUFDO0lBRTVCRSxPQUFPLEdBQUcsSUFBSXpGLDBEQUFRLENBQUNvRixPQUFPLENBQUNNLFdBQVcsRUFBRUQsT0FBTyxDQUFDO0lBRXBELElBQUksQ0FBQ1QsT0FBTyxDQUFDL0QsSUFBSSxDQUFDc0UsT0FBTyxDQUFDO0lBQzFCLElBQUksQ0FBQ1AsT0FBTyxDQUFDL0QsSUFBSSxDQUFDd0UsT0FBTyxDQUFDO0lBRTFCLE9BQU87TUFDTEYsT0FBTztNQUNQRSxPQUFPLEVBQUVBLE9BQU8sQ0FBQ3RGLFNBQVM7TUFDMUJ3RixnQkFBZ0IsRUFBRUYsT0FBTztNQUN6QkcsUUFBUSxFQUFFO0lBQ1osQ0FBQztFQUNILENBQUM7RUFDRFAsUUFBUSxFQUFFLFNBQUFBLENBQVVELE9BQU8sRUFBRTtJQUMzQixJQUFJRyxPQUFPLEdBQUcsSUFBSTlCLHVEQUFNLENBQUMsUUFBUSxFQUFFMkIsT0FBTyxDQUFDSSxXQUFXLENBQUM7SUFDdkQsSUFBSUMsT0FBTyxHQUFHLElBQUloQyx1REFBTSxDQUFDLFFBQVEsRUFBRTJCLE9BQU8sQ0FBQ1MsV0FBVyxDQUFDO0lBRXZETixPQUFPLENBQUN2QixXQUFXLENBQUN5QixPQUFPLENBQUM7SUFDNUJBLE9BQU8sQ0FBQ3pCLFdBQVcsQ0FBQ3VCLE9BQU8sQ0FBQztJQUU1QixJQUFJLENBQUNQLE9BQU8sQ0FBQy9ELElBQUksQ0FBQ3NFLE9BQU8sQ0FBQztJQUMxQixJQUFJLENBQUNQLE9BQU8sQ0FBQy9ELElBQUksQ0FBQ3dFLE9BQU8sQ0FBQztJQUUxQixPQUFPO01BQ0xGLE9BQU87TUFDUEUsT0FBTztNQUNQRyxRQUFRLEVBQUU7SUFDWixDQUFDO0VBQ0g7QUFDRixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDbUQ7QUFDQTtBQUVuRCxNQUFNSSxxQkFBcUIsR0FBRztFQUM1QkMsWUFBWSxFQUFFM0IsUUFBUSxDQUFDNEIsYUFBYSxDQUFDLFVBQVUsQ0FBQztFQUNoREMsUUFBUSxFQUFFLFNBQUFBLENBQUEsRUFBWTtJQUNwQixJQUFJQyxLQUFLLEdBQUcsSUFBSSxDQUFDQyxXQUFXLENBQUMsQ0FBQztJQUM5QixJQUFJQyxJQUFJLEdBQUcsSUFBSSxDQUFDQyxVQUFVLENBQUMsQ0FBQztJQUU1QixJQUFJLENBQUNOLFlBQVksQ0FBQ3JCLFdBQVcsQ0FBQ3dCLEtBQUssQ0FBQztJQUNwQyxJQUFJLENBQUNILFlBQVksQ0FBQ3JCLFdBQVcsQ0FBQzBCLElBQUksQ0FBQztFQUNyQyxDQUFDO0VBQ0RDLFVBQVUsRUFBRSxTQUFBQSxDQUFBLEVBQVk7SUFDdEIsTUFBTUQsSUFBSSxHQUFHaEMsUUFBUSxDQUFDQyxhQUFhLENBQUMsTUFBTSxDQUFDO0lBQzNDLE1BQU1pQyxpQkFBaUIsR0FBR2xDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztJQUN2RCxNQUFNa0MsU0FBUyxHQUFHbkMsUUFBUSxDQUFDQyxhQUFhLENBQUMsUUFBUSxDQUFDO0lBQ2xELE1BQU1tQyxTQUFTLEdBQUdwQyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxRQUFRLENBQUM7SUFFbERpQyxpQkFBaUIsQ0FBQzlCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLHFCQUFxQixDQUFDO0lBQ3REMkIsSUFBSSxDQUFDNUIsU0FBUyxDQUFDQyxHQUFHLENBQUMsV0FBVyxDQUFDO0lBQy9COEIsU0FBUyxDQUFDL0IsU0FBUyxDQUFDQyxHQUFHLENBQUMsS0FBSyxDQUFDO0lBQzlCK0IsU0FBUyxDQUFDaEMsU0FBUyxDQUFDQyxHQUFHLENBQUMsS0FBSyxDQUFDO0lBRTlCOEIsU0FBUyxDQUFDRSxXQUFXLEdBQUcsdUJBQXVCO0lBQy9DRCxTQUFTLENBQUNDLFdBQVcsR0FBRyx5QkFBeUI7SUFFakRMLElBQUksQ0FBQzFCLFdBQVcsQ0FBQzRCLGlCQUFpQixDQUFDO0lBQ25DQSxpQkFBaUIsQ0FBQzVCLFdBQVcsQ0FBQzZCLFNBQVMsQ0FBQztJQUN4Q0QsaUJBQWlCLENBQUM1QixXQUFXLENBQUM4QixTQUFTLENBQUM7SUFFeEMsSUFBSSxDQUFDRSxpQkFBaUIsQ0FBQ0gsU0FBUyxFQUFFQyxTQUFTLENBQUM7SUFFNUMsT0FBT0osSUFBSTtFQUNiLENBQUM7RUFFREQsV0FBV0EsQ0FBQSxFQUFHO0lBQ1osTUFBTVEsY0FBYyxHQUFHdkMsUUFBUSxDQUFDQyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQ3BELE1BQU02QixLQUFLLEdBQUc5QixRQUFRLENBQUNDLGFBQWEsQ0FBQyxJQUFJLENBQUM7SUFDMUMsTUFBTXVDLGVBQWUsR0FBR3hDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztJQUVyRDZCLEtBQUssQ0FBQ08sV0FBVyxHQUFHLGlCQUFpQjtJQUVyQ0UsY0FBYyxDQUFDakMsV0FBVyxDQUFDd0IsS0FBSyxDQUFDO0lBQ2pDUyxjQUFjLENBQUNqQyxXQUFXLENBQUNrQyxlQUFlLENBQUM7SUFDM0MsT0FBT0QsY0FBYztFQUN2QixDQUFDO0VBRURELGlCQUFpQkEsQ0FBQ0gsU0FBUyxFQUFFQyxTQUFTLEVBQUU7SUFDdENELFNBQVMsQ0FBQ00sZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQ0MsT0FBTyxDQUFDO0lBQ2pETixTQUFTLENBQUNLLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUNFLE9BQU8sQ0FBQztFQUNuRCxDQUFDO0VBRURELE9BQU9BLENBQUNFLENBQUMsRUFBRTtJQUNUQSxDQUFDLENBQUNDLGNBQWMsQ0FBQyxDQUFDO0lBQ2xCbkIscUJBQXFCLENBQUNvQixjQUFjLENBQUMsQ0FBQztJQUN0Q3RCLDREQUFtQixDQUFDSyxRQUFRLENBQUMsQ0FBQztFQUNoQyxDQUFDO0VBRURjLE9BQU9BLENBQUNDLENBQUMsRUFBRTtJQUNUQSxDQUFDLENBQUNDLGNBQWMsQ0FBQyxDQUFDO0lBQ2xCbkIscUJBQXFCLENBQUNvQixjQUFjLENBQUMsQ0FBQztJQUN0Q3JCLDREQUFtQixDQUFDSSxRQUFRLENBQUMsQ0FBQztFQUNoQyxDQUFDO0VBRURpQixjQUFjQSxDQUFBLEVBQUc7SUFDZixJQUFJLENBQUNuQixZQUFZLENBQUNVLFdBQVcsR0FBRyxFQUFFO0VBQ3BDO0FBQ0YsQ0FBQztBQUVnQzs7QUFFakM7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvRUE7QUFDZ0U7QUFDRjtBQUU5RCxNQUFNVSx5QkFBeUIsR0FBRztFQUNoQ3BCLFlBQVksRUFBRTNCLFFBQVEsQ0FBQzRCLGFBQWEsQ0FBQyxVQUFVLENBQUM7RUFDaERDLFFBQVEsRUFBRSxTQUFBQSxDQUFVZixPQUFPLEVBQUU7SUFDM0IsSUFBSWtDLFdBQVcsR0FBR3ZDLHdFQUFjLENBQUNJLFVBQVUsQ0FBQ0MsT0FBTyxDQUFDO0lBQ3BELElBQUk7TUFBRW1DLE9BQU87TUFBRUM7SUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDQyxhQUFhLENBQUNILFdBQVcsQ0FBQztJQUUxRCxJQUFJSSxVQUFVLEdBQUd4RCxzRUFBYSxDQUFDRSxjQUFjLENBQUMsQ0FBQztJQUMvQyxJQUFJdUQsVUFBVSxHQUFHekQsc0VBQWEsQ0FBQ0UsY0FBYyxDQUFDLENBQUM7SUFFL0MsSUFBSSxDQUFDd0QsWUFBWSxDQUFDRixVQUFVLENBQUM7RUFDL0IsQ0FBQztFQUNERCxhQUFhLEVBQUUsU0FBQUEsQ0FBVUksUUFBUSxFQUFFO0lBQ2pDLElBQUlOLE9BQU8sR0FBR00sUUFBUSxDQUFDdEMsT0FBTyxDQUFDekIsU0FBUyxDQUFDcEQsS0FBSztJQUM5QyxJQUFJOEcsT0FBTyxHQUFHSyxRQUFRLENBQUNwQyxPQUFPLENBQUMzQixTQUFTLENBQUNwRCxLQUFLO0lBRTlDLE9BQU87TUFDTDZHLE9BQU87TUFDUEM7SUFDRixDQUFDO0VBQ0gsQ0FBQztFQUNESSxZQUFZQSxDQUFDbEgsS0FBSyxFQUFFO0lBQ2xCO0VBQUE7QUFFSixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuRHdEO0FBRXhELE1BQU1xRixtQkFBbUIsR0FBRztFQUMxQkUsWUFBWSxFQUFFM0IsUUFBUSxDQUFDNEIsYUFBYSxDQUFDLFVBQVUsQ0FBQztFQUNoREMsUUFBUSxFQUFFLFNBQUFBLENBQUEsRUFBWTtJQUNwQixJQUFJQyxLQUFLLEdBQUcsSUFBSSxDQUFDQyxXQUFXLENBQUMsQ0FBQztJQUM5QixJQUFJeUIsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDQyxzQkFBc0IsQ0FBQyxDQUFDO0lBRXBELElBQUksQ0FBQzlCLFlBQVksQ0FBQ3JCLFdBQVcsQ0FBQ3dCLEtBQUssQ0FBQztJQUNwQyxJQUFJLENBQUNILFlBQVksQ0FBQ3JCLFdBQVcsQ0FBQ2tELGdCQUFnQixDQUFDO0VBQ2pELENBQUM7RUFDRHpCLFdBQVcsRUFBRSxTQUFBQSxDQUFBLEVBQVk7SUFDdkIsTUFBTVEsY0FBYyxHQUFHdkMsUUFBUSxDQUFDQyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQ3BELE1BQU02QixLQUFLLEdBQUc5QixRQUFRLENBQUNDLGFBQWEsQ0FBQyxJQUFJLENBQUM7SUFDMUMsTUFBTXlELGNBQWMsR0FBRzFELFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztJQUVwRDZCLEtBQUssQ0FBQ08sV0FBVyxHQUFHLCtCQUErQjtJQUNuRHFCLGNBQWMsQ0FBQ0MsU0FBUyxHQUN0QixzTEFBc0w7SUFFeExwQixjQUFjLENBQUNqQyxXQUFXLENBQUN3QixLQUFLLENBQUM7SUFDakNTLGNBQWMsQ0FBQ2pDLFdBQVcsQ0FBQ29ELGNBQWMsQ0FBQztJQUUxQyxPQUFPbkIsY0FBYztFQUN2QixDQUFDO0VBQ0RrQixzQkFBc0IsRUFBRSxTQUFBQSxDQUFBLEVBQVk7SUFDbEMsTUFBTUcsZUFBZSxHQUFHNUQsUUFBUSxDQUFDQyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQ3JELE1BQU00RCxjQUFjLEdBQUc3RCxRQUFRLENBQUNDLGFBQWEsQ0FBQyxRQUFRLENBQUM7SUFDdkQsTUFBTTZELGdCQUFnQixHQUFHOUQsUUFBUSxDQUFDQyxhQUFhLENBQUMsUUFBUSxDQUFDO0lBQ3pELE1BQU04RCxjQUFjLEdBQUcvRCxRQUFRLENBQUNDLGFBQWEsQ0FBQyxRQUFRLENBQUM7SUFFdkQ0RCxjQUFjLENBQUN6RCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQztJQUNqRHlELGdCQUFnQixDQUFDMUQsU0FBUyxDQUFDQyxHQUFHLENBQUMsbUJBQW1CLENBQUM7SUFDbkQwRCxjQUFjLENBQUMzRCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQztJQUVqRHVELGVBQWUsQ0FBQ3RELFdBQVcsQ0FBQ3VELGNBQWMsQ0FBQztJQUMzQ0QsZUFBZSxDQUFDdEQsV0FBVyxDQUFDd0QsZ0JBQWdCLENBQUM7SUFDN0NGLGVBQWUsQ0FBQ3RELFdBQVcsQ0FBQ3lELGNBQWMsQ0FBQztJQUUzQ0YsY0FBYyxDQUFDeEIsV0FBVyxHQUFHLE1BQU07SUFDbkN5QixnQkFBZ0IsQ0FBQ3pCLFdBQVcsR0FBRyxRQUFRO0lBQ3ZDMEIsY0FBYyxDQUFDMUIsV0FBVyxHQUFHLFVBQVU7SUFFdkN3QixjQUFjLENBQUNwQixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUV1QixvQkFBb0IsQ0FBQ0MsUUFBUSxDQUFDO0lBQ3ZFSCxnQkFBZ0IsQ0FBQ3JCLGdCQUFnQixDQUFDLE9BQU8sRUFBRXVCLG9CQUFvQixDQUFDRSxVQUFVLENBQUM7SUFDM0VILGNBQWMsQ0FBQ3RCLGdCQUFnQixDQUFDLE9BQU8sRUFBRXVCLG9CQUFvQixDQUFDRyxRQUFRLENBQUM7SUFFdkUsT0FBT1AsZUFBZTtFQUN4QixDQUFDO0VBQ0RRLFFBQVEsRUFBRSxTQUFBQSxDQUFBLEVBQVk7SUFDcEIzQyxtQkFBbUIsQ0FBQ0UsWUFBWSxDQUFDVSxXQUFXLEdBQUcsRUFBRTtFQUNuRDtBQUNGLENBQUM7QUFFRCxNQUFNMkIsb0JBQW9CLEdBQUc7RUFDM0JDLFFBQVEsRUFBRSxTQUFBQSxDQUFVckIsQ0FBQyxFQUFFO0lBQ3JCQSxDQUFDLENBQUNDLGNBQWMsQ0FBQyxDQUFDO0lBQ2xCd0IsZUFBZSxDQUFDakQsV0FBVyxHQUFHLE1BQU07SUFDcENLLG1CQUFtQixDQUFDMkMsUUFBUSxDQUFDLENBQUM7SUFDOUJFLGtCQUFrQixDQUFDekMsUUFBUSxDQUFDLENBQUM7RUFDL0IsQ0FBQztFQUNEcUMsVUFBVSxFQUFFLFNBQUFBLENBQVV0QixDQUFDLEVBQUU7SUFDdkJBLENBQUMsQ0FBQ0MsY0FBYyxDQUFDLENBQUM7SUFDbEJ3QixlQUFlLENBQUNqRCxXQUFXLEdBQUcsUUFBUTtJQUN0Q0ssbUJBQW1CLENBQUMyQyxRQUFRLENBQUMsQ0FBQztJQUM5QkUsa0JBQWtCLENBQUN6QyxRQUFRLENBQUMsQ0FBQztFQUMvQixDQUFDO0VBQ0RzQyxRQUFRLEVBQUUsU0FBQUEsQ0FBVXZCLENBQUMsRUFBRTtJQUNyQkEsQ0FBQyxDQUFDQyxjQUFjLENBQUMsQ0FBQztJQUNsQndCLGVBQWUsQ0FBQ2pELFdBQVcsR0FBRyxNQUFNO0lBQ3BDSyxtQkFBbUIsQ0FBQzJDLFFBQVEsQ0FBQyxDQUFDO0lBQzlCRSxrQkFBa0IsQ0FBQ3pDLFFBQVEsQ0FBQyxDQUFDO0VBQy9CO0FBQ0YsQ0FBQztBQUVELE1BQU15QyxrQkFBa0IsR0FBRztFQUN6QjNDLFlBQVksRUFBRTNCLFFBQVEsQ0FBQzRCLGFBQWEsQ0FBQyxVQUFVLENBQUM7RUFDaERDLFFBQVEsRUFBRSxTQUFBQSxDQUFBLEVBQVk7SUFDcEIsSUFBSUMsS0FBSyxHQUFHLElBQUksQ0FBQ0MsV0FBVyxDQUFDLENBQUM7SUFDOUIsSUFBSXdDLFFBQVEsR0FBRyxJQUFJLENBQUN0QyxVQUFVLENBQUMsQ0FBQztJQUVoQyxJQUFJLENBQUNOLFlBQVksQ0FBQ3JCLFdBQVcsQ0FBQ3dCLEtBQUssQ0FBQztJQUNwQyxJQUFJLENBQUNILFlBQVksQ0FBQ3JCLFdBQVcsQ0FBQ2lFLFFBQVEsQ0FBQztFQUN6QyxDQUFDO0VBQ0R0QyxVQUFVLEVBQUUsU0FBQUEsQ0FBQSxFQUFZO0lBQ3RCLElBQUlELElBQUksR0FBR2hDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLE1BQU0sQ0FBQztJQUN6QyxJQUFJdUUsYUFBYSxHQUFHeEUsUUFBUSxDQUFDQyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQ2pELElBQUl3RSxTQUFTLEdBQUd6RSxRQUFRLENBQUNDLGFBQWEsQ0FBQyxPQUFPLENBQUM7SUFDL0MsSUFBSXlFLFVBQVUsR0FBRzFFLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFFBQVEsQ0FBQztJQUVqRHdFLFNBQVMsQ0FBQ0UsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7SUFDdENGLFNBQVMsQ0FBQ0UsWUFBWSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUM7SUFDckNGLFNBQVMsQ0FBQ0UsWUFBWSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUM7SUFDdkNGLFNBQVMsQ0FBQ0UsWUFBWSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUM7SUFDdkNGLFNBQVMsQ0FBQ0UsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFFdENELFVBQVUsQ0FBQ3JDLFdBQVcsR0FBRyxrQkFBa0I7SUFDM0NxQyxVQUFVLENBQUN0RSxTQUFTLENBQUNDLEdBQUcsQ0FBQyxhQUFhLENBQUM7SUFFdkMyQixJQUFJLENBQUMxQixXQUFXLENBQUNrRSxhQUFhLENBQUM7SUFDL0JBLGFBQWEsQ0FBQ2xFLFdBQVcsQ0FBQ21FLFNBQVMsQ0FBQztJQUNwQ0QsYUFBYSxDQUFDbEUsV0FBVyxDQUFDb0UsVUFBVSxDQUFDO0lBRXJDQSxVQUFVLENBQUNqQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU2QixrQkFBa0IsQ0FBQ00sV0FBVyxDQUFDO0lBRXBFLE9BQU81QyxJQUFJO0VBQ2IsQ0FBQztFQUNERCxXQUFXLEVBQUUsU0FBQUEsQ0FBQSxFQUFZO0lBQ3ZCLE1BQU1ELEtBQUssR0FBRzlCLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztJQUUzQzZCLEtBQUssQ0FBQ08sV0FBVyxHQUFHLGtDQUFrQztJQUV0RFAsS0FBSyxDQUFDMUIsU0FBUyxDQUFDQyxHQUFHLENBQUMsT0FBTyxDQUFDO0lBRTVCLE9BQU95QixLQUFLO0VBQ2QsQ0FBQztFQUNEOEMsV0FBVyxFQUFFLFNBQUFBLENBQVVoQyxDQUFDLEVBQUU7SUFDeEJBLENBQUMsQ0FBQ0MsY0FBYyxDQUFDLENBQUM7SUFDbEIsSUFBSWdDLEtBQUssR0FBRzdFLFFBQVEsQ0FBQzRCLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQ2tELEtBQUs7SUFFbEQsSUFBSUQsS0FBSyxJQUFJLEVBQUUsSUFBSUEsS0FBSyxLQUFLdEYsU0FBUyxFQUFFO01BQ3RDc0YsS0FBSyxHQUFHLFNBQVM7SUFDbkI7SUFFQVIsZUFBZSxDQUFDbkQsV0FBVyxHQUFHMkQsS0FBSztJQUNuQ3BELG1CQUFtQixDQUFDMkMsUUFBUSxDQUFDLENBQUM7SUFDOUJyQixpRUFBeUIsQ0FBQ2xCLFFBQVEsQ0FBQ3dDLGVBQWUsQ0FBQztFQUNyRDtBQUNGLENBQUM7QUFFRCxNQUFNQSxlQUFlLEdBQUc7RUFDdEJuRCxXQUFXLEVBQUUsRUFBRTtFQUNmckQsSUFBSSxFQUFFLEtBQUs7RUFDWHVELFdBQVcsRUFBRTtBQUNmLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0SXVEO0FBRXhELE1BQU1JLG1CQUFtQixHQUFHO0VBQzFCdUQsYUFBYSxFQUFFLENBQUM7RUFDaEJwRCxZQUFZLEVBQUUzQixRQUFRLENBQUM0QixhQUFhLENBQUMsVUFBVSxDQUFDO0VBQ2hEb0QsVUFBVSxFQUFFaEYsUUFBUSxDQUFDNEIsYUFBYSxDQUFDLHVCQUF1QixDQUFDO0VBQzNEQyxRQUFRLEVBQUUsU0FBQUEsQ0FBQSxFQUFZO0lBQ3BCLElBQUlDLEtBQUssR0FBRyxJQUFJLENBQUNDLFdBQVcsQ0FBQyxDQUFDO0lBQzlCLElBQUlDLElBQUksR0FBRyxJQUFJLENBQUNDLFVBQVUsQ0FBQyxDQUFDO0lBRTVCLElBQUksQ0FBQ04sWUFBWSxDQUFDckIsV0FBVyxDQUFDd0IsS0FBSyxDQUFDO0lBQ3BDLElBQUksQ0FBQ0gsWUFBWSxDQUFDckIsV0FBVyxDQUFDMEIsSUFBSSxDQUFDO0VBQ3JDLENBQUM7RUFFREQsV0FBVyxFQUFFLFNBQUFBLENBQUEsRUFBWTtJQUN2QixNQUFNUSxjQUFjLEdBQUd2QyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxLQUFLLENBQUM7SUFDcEQsTUFBTTZCLEtBQUssR0FBRzlCLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztJQUMzQyxNQUFNZ0YsS0FBSyxHQUFHakYsUUFBUSxDQUFDQyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBRTNDNkIsS0FBSyxDQUFDTyxXQUFXLEdBQUcsVUFBVSxJQUFJLENBQUMwQyxhQUFhLDBCQUEwQjtJQUMxRUUsS0FBSyxDQUFDNUMsV0FBVyxHQUFHLHdDQUF3QztJQUU1REUsY0FBYyxDQUFDakMsV0FBVyxDQUFDd0IsS0FBSyxDQUFDO0lBQ2pDUyxjQUFjLENBQUNqQyxXQUFXLENBQUMyRSxLQUFLLENBQUM7SUFFakMxQyxjQUFjLENBQUNuQyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQztJQUMvQ3lCLEtBQUssQ0FBQzFCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE9BQU8sQ0FBQztJQUM1QjRFLEtBQUssQ0FBQzdFLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE9BQU8sQ0FBQztJQUU1QixJQUFJLENBQUM2RSxrQkFBa0IsQ0FBQ0QsS0FBSyxDQUFDO0lBRTlCLE9BQU8xQyxjQUFjO0VBQ3ZCLENBQUM7RUFFRDJDLGtCQUFrQkEsQ0FBQ0QsS0FBSyxFQUFFO0lBQ3hCQSxLQUFLLENBQUN4QyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDMEMsVUFBVSxDQUFDO0VBQ2xELENBQUM7RUFFREEsVUFBVUEsQ0FBQ3ZDLENBQUMsRUFBRTtJQUNaQSxDQUFDLENBQUNDLGNBQWMsQ0FBQyxDQUFDO0lBQ2xCO0lBQ0EsTUFBTW1DLFVBQVUsR0FBR3hELG1CQUFtQixDQUFDd0QsVUFBVTtJQUNqRCxNQUFNSSxLQUFLLEdBQUdwRixRQUFRLENBQUNDLGFBQWEsQ0FBQyxRQUFRLENBQUM7SUFDOUMsTUFBTW9GLFVBQVUsR0FBR3JGLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztJQUNoRCxNQUFNcUYsSUFBSSxHQUFHdEYsUUFBUSxDQUFDQyxhQUFhLENBQUMsR0FBRyxDQUFDO0lBRXhDcUYsSUFBSSxDQUFDM0IsU0FBUyxHQUNaLG9WQUFvVjtJQUN0VjBCLFVBQVUsQ0FBQ2hELFdBQVcsR0FBRyxHQUFHO0lBRTVCaUQsSUFBSSxDQUFDbEYsU0FBUyxDQUFDQyxHQUFHLENBQUMsV0FBVyxDQUFDO0lBQy9CZ0YsVUFBVSxDQUFDakYsU0FBUyxDQUFDQyxHQUFHLENBQUMsaUJBQWlCLENBQUM7SUFDM0NnRixVQUFVLENBQUM1QyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU4QyxlQUFlLENBQUNGLFVBQVUsQ0FBQztJQUVoRUwsVUFBVSxDQUFDMUUsV0FBVyxDQUFDOEUsS0FBSyxDQUFDO0lBQzdCQSxLQUFLLENBQUM5RSxXQUFXLENBQUMrRSxVQUFVLENBQUM7SUFDN0JELEtBQUssQ0FBQzlFLFdBQVcsQ0FBQ2dGLElBQUksQ0FBQztJQUV2QkMsZUFBZSxDQUFDQyxTQUFTLENBQUNKLEtBQUssQ0FBQztFQUNsQyxDQUFDO0VBRURuRCxVQUFVQSxDQUFBLEVBQUc7SUFDWCxJQUFJRCxJQUFJLEdBQUdoQyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxNQUFNLENBQUM7SUFDekMsSUFBSXVFLGFBQWEsR0FBR3hFLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztJQUNqRCxJQUFJd0UsU0FBUyxHQUFHekUsUUFBUSxDQUFDQyxhQUFhLENBQUMsT0FBTyxDQUFDO0lBQy9DLElBQUl5RSxVQUFVLEdBQUcxRSxRQUFRLENBQUNDLGFBQWEsQ0FBQyxRQUFRLENBQUM7SUFFakR3RSxTQUFTLENBQUNFLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO0lBQ3RDRixTQUFTLENBQUNFLFlBQVksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDO0lBQ3JDRixTQUFTLENBQUNFLFlBQVksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDO0lBQ3ZDRixTQUFTLENBQUNFLFlBQVksQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDO0lBQ3ZDRixTQUFTLENBQUNFLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBRXRDRCxVQUFVLENBQUNyQyxXQUFXLEdBQUcsZ0JBQWdCLElBQUksQ0FBQzBDLGFBQWEsU0FBUztJQUNwRUwsVUFBVSxDQUFDdEUsU0FBUyxDQUFDQyxHQUFHLENBQUMsYUFBYSxDQUFDO0lBRXZDMkIsSUFBSSxDQUFDMUIsV0FBVyxDQUFDa0UsYUFBYSxDQUFDO0lBQy9CQSxhQUFhLENBQUNsRSxXQUFXLENBQUNtRSxTQUFTLENBQUM7SUFDcENELGFBQWEsQ0FBQ2xFLFdBQVcsQ0FBQ29FLFVBQVUsQ0FBQztJQUVyQ0EsVUFBVSxDQUFDakMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFZ0QsY0FBYyxDQUFDYixXQUFXLENBQUM7SUFFaEUsT0FBTzVDLElBQUk7RUFDYixDQUFDO0VBQ0RvQyxRQUFRQSxDQUFBLEVBQUc7SUFDVDVDLG1CQUFtQixDQUFDRyxZQUFZLENBQUNVLFdBQVcsR0FBRyxFQUFFO0VBQ25EO0FBQ0YsQ0FBQztBQUVELE1BQU1rRCxlQUFlLEdBQUc7RUFDdEJGLFVBQVUsRUFBRSxTQUFBQSxDQUFVekMsQ0FBQyxFQUFFO0lBQ3ZCQSxDQUFDLENBQUNDLGNBQWM7SUFDaEJyQixtQkFBbUIsQ0FBQ3dELFVBQVUsQ0FBQzNDLFdBQVcsR0FBRyxFQUFFO0VBQ2pELENBQUM7RUFDRG1ELFNBQVMsRUFBRSxTQUFBQSxDQUFVSixLQUFLLEVBQUU7SUFDMUJBLEtBQUssQ0FBQ00sU0FBUyxDQUFDLENBQUM7RUFDbkI7QUFDRixDQUFDO0FBRUQsTUFBTUQsY0FBYyxHQUFHO0VBQ3JCcEIsZUFBZSxFQUFFO0lBQ2ZuRCxXQUFXLEVBQUUsRUFBRTtJQUNmSyxXQUFXLEVBQUUsRUFBRTtJQUNmMUQsSUFBSSxFQUFFO0VBQ1IsQ0FBQztFQUNEK0csV0FBVyxFQUFFLFNBQUFBLENBQVVoQyxDQUFDLEVBQUU7SUFDeEJBLENBQUMsQ0FBQ0MsY0FBYyxDQUFDLENBQUM7SUFDbEIsSUFBSWdDLEtBQUssR0FBRzdFLFFBQVEsQ0FBQzRCLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQ2tELEtBQUs7SUFFbEQsSUFBSUQsS0FBSyxJQUFJLEVBQUUsSUFBSUEsS0FBSyxLQUFLdEYsU0FBUyxFQUFFO01BQ3RDc0YsS0FBSyxHQUFHLFNBQVNyRCxtQkFBbUIsQ0FBQ3VELGFBQWEsRUFBRTtJQUN0RDtJQUVBVSxjQUFjLENBQUNFLGVBQWUsQ0FBQ2QsS0FBSyxDQUFDO0VBQ3ZDLENBQUM7RUFFRGMsZUFBZSxFQUFFLFNBQUFBLENBQVVkLEtBQUssRUFBRTtJQUNoQ3JELG1CQUFtQixDQUFDdUQsYUFBYSxLQUFLLENBQUMsR0FDbENVLGNBQWMsQ0FBQ3BCLGVBQWUsQ0FBQ25ELFdBQVcsR0FBRzJELEtBQUssR0FDbERZLGNBQWMsQ0FBQ3BCLGVBQWUsQ0FBQzlDLFdBQVcsR0FBR3NELEtBQU07SUFFeERyRCxtQkFBbUIsQ0FBQ3VELGFBQWEsSUFBSSxDQUFDO0lBRXRDLElBQUl2RCxtQkFBbUIsQ0FBQ3VELGFBQWEsR0FBRyxDQUFDLEVBQUU7TUFDekN2RCxtQkFBbUIsQ0FBQzRDLFFBQVEsQ0FBQyxDQUFDO01BQzlCckIsaUVBQXlCLENBQUNsQixRQUFRLENBQUM0RCxjQUFjLENBQUNwQixlQUFlLENBQUM7TUFDbEU7SUFDRixDQUFDLE1BQU07TUFDTDdDLG1CQUFtQixDQUFDNEMsUUFBUSxDQUFDLENBQUM7TUFDOUI1QyxtQkFBbUIsQ0FBQ0ssUUFBUSxDQUFDLENBQUM7SUFDaEM7RUFDRjtBQUNGLENBQUM7Ozs7Ozs7VUNwSUQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ042RDtBQUU3REgsc0VBQXFCLENBQUNHLFFBQVEsQ0FBQyxDQUFDO0FBQ2hDLDJDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VicGFjay1kZXYtdGVtcGxhdGUvLi9zcmMvY29tcG9uZW50cy9jb21wdXRlci5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRldi10ZW1wbGF0ZS8uL3NyYy9jb21wb25lbnRzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRldi10ZW1wbGF0ZS8uL3NyYy9jb21wb25lbnRzL3BsYXllcnMuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZXYtdGVtcGxhdGUvLi9zcmMvY29tcG9uZW50cy9zaGlwLmpzIiwid2VicGFjazovL3dlYnBhY2stZGV2LXRlbXBsYXRlLy4vc3JjL2NvbnRyb2xsZXJzL2RvbS1jb250cm9sbGVyLmpzIiwid2VicGFjazovL3dlYnBhY2stZGV2LXRlbXBsYXRlLy4vc3JjL2NvbnRyb2xsZXJzL2dhbWUtY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRldi10ZW1wbGF0ZS8uL3NyYy9wYWdlcy9pbml0aWFsLWxvYWQuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZXYtdGVtcGxhdGUvLi9zcmMvcGFnZXMvbWFpbi1nYW1lLmpzIiwid2VicGFjazovL3dlYnBhY2stZGV2LXRlbXBsYXRlLy4vc3JjL3BhZ2VzL3B2Yy1zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZXYtdGVtcGxhdGUvLi9zcmMvcGFnZXMvcHZwLXNjcmVlbi5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRldi10ZW1wbGF0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWJwYWNrLWRldi10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZXYtdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWJwYWNrLWRldi10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYnBhY2stZGV2LXRlbXBsYXRlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIENvbXB1dGVyIHtcbiAgY29uc3RydWN0b3IoZGlmZmljdWx0eSwgcGxheWVyT2JqKSB7XG4gICAgdGhpcy5kaWZmaWN1bHR5ID0gZGlmZmljdWx0eTtcbiAgICB0aGlzLnBsYXllck9iaiA9IHBsYXllck9iajtcbiAgICB0aGlzLmFsZ29yaXRobSA9IHRoaXMuZ2V0QWxnb3JpdGhtKCk7XG4gIH1cblxuICBwbGF5KCkge1xuICAgIC8vIGNhbGwgdGhlIGFsZ29yaXRobT9cbiAgfVxuXG4gIC8vSHVudCBhbmQgVGFyZ2V0IGFsZ29yaXRobSBpcyBpbi1jb21tb24gYmV0d2VlbiBhbGxcbiAgZ2V0QWxnb3JpdGhtKCkge1xuICAgIGlmICh0aGlzLmRpZmZpY3VsdHkgPT09IFwiZWFzeVwiKSB7XG4gICAgICAvL3ZpY3RvcnkgdGhyb3VnaCByYW5kb21uZXNzXG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmICh0aGlzLmRpZmZpY3VsdHkgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgIC8qIGVhc3kgMi1zdGVwLXNwYWNlIGJhc2VkIGFsZ29yaXRobSwgdmljdG9yeSB0aHJvdWdoIGVmZmljaWVudCBzcGFjZS1pbmcuIFBhcm9keSBBbGdvcml0aG0uXG4gICAgICBcbiAgICAgIEltcHJvdmVkOiBUaGUgc3BhY2UgYmV0d2VlbiBlYWNoIHNob3QgaXMgdGhlIGxlbmd0aCBvZiB0aGUgc2hvcnRlc3QgbGl2aW5nIHNoaXAqL1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICAvKiBZb3Uga25vdyBzaGl0IGlzIGFib3V0IHRvIGdldCByZWFsIHdoZW4gSSBsaW5rIGEgdmlkZW8gdG8gVnNhdWNlXG4gICAgICBcbiAgICAgIGh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9TGJBTEZab1JydzhcblxuICAgICAgR2l2ZSBhIHdhcm5pbmc6IFlvdSBBcmUgZ29pbmcgdG8gTG9vc2VcblxuICAgICAgQWxnb3JpdGhtOiBQcm9iYWJpbGl0eSBtYXBzXG4gICAgICAqL1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgeyBDb21wdXRlciB9O1xuIiwiLyogZXNsaW50LWRpc2FibGUgKi9cbmltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi9zaGlwXCI7XG5cbmNsYXNzIEdhbWVib2FyZCB7XG4gIGNvbnN0cnVjdG9yKHBsYXllcikge1xuICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xuICAgIHRoaXMuYm9hcmQgPSB0aGlzLmNyZWF0ZUJvYXJkKCk7XG4gICAgdGhpcy5taXNzZWRTaG90cyA9IFtdO1xuICAgIHRoaXMuc2hpcENvdW50ID0gMDtcbiAgfVxuXG4gIGNyZWF0ZUJvYXJkKCkge1xuICAgIGxldCB5QXhpcyA9IFtdO1xuICAgIGxldCBib2FyZFBhcnQ7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIHlBeGlzLnB1c2goW10pO1xuICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCAxMDsgeCsrKSB7XG4gICAgICAgIGJvYXJkUGFydCA9IG5ldyBUaWxlKHsgeENvcmQ6IHgsIHlDb3JkOiBpIH0pO1xuICAgICAgICB5QXhpc1tpXS5wdXNoKGJvYXJkUGFydCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB5QXhpcztcbiAgfVxuXG4gIHBsYWNlU2hpcChzaGlwT2JqLCBjb3JkT2JqKSB7XG4gICAgbGV0IHNoaXAgPSB0aGlzLnVucGFja1NoaXAoc2hpcE9iaik7XG4gICAgbGV0IHBsYWNlbWVudERhdGE7XG4gICAgY29yZE9iai5zaGlwRGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIlxuICAgICAgPyAocGxhY2VtZW50RGF0YSA9IHRoaXMucGxhY2VPblgoY29yZE9iaikpXG4gICAgICA6IChwbGFjZW1lbnREYXRhID0gdGhpcy5wbGFjZU9uWShjb3JkT2JqKSk7XG5cbiAgICAvKlRoZXJlIHdhcyBhIGNsZWFuZXIgaW1wbGVtZW50YXRpb24sIGJ1dCB0aGlzIHdvcmtlZCBiZXN0IGJlY2F1c2UgSSBkaWRuJ3QgaGF2ZSB0byBcbiAgICB0aGluayBhYm91dCB3aGF0IGhhcHBlbnMgaWYgc29tZXdoZXJlIG1pZC13YXkgb2YgYWRkaW5nIGEgc2hpcCB0byB0aWxlcywgd2UgZm91bmQgb3V0IFxuICAgIHRoYXQgb25lIG9mIHRoZSBjby1vcmRpbmF0ZXMgd2FzIHRha2VuKi9cblxuICAgIHBsYWNlbWVudERhdGEuZm9yRWFjaCgodGlsZSkgPT4ge1xuICAgICAgdGlsZS5hZGRTaGlwKHNoaXApO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zaGlwQ291bnQgKz0gMTtcbiAgfVxuXG4gIHVucGFja1NoaXAoc2hpcE9iaikge1xuICAgIGxldCBzaGlwID0gbmV3IFNoaXAoc2hpcE9iai5oZWFsdGgsIHNoaXBPYmoudHlwZSk7XG4gICAgcmV0dXJuIHNoaXA7XG4gIH1cblxuICBwbGFjZU9uWChjb3JkT2JqKSB7XG4gICAgbGV0IHsgeFN0YXJ0LCB4RW5kLCB5U3RhcnQgfSA9IGNvcmRPYmo7XG4gICAgbGV0IHRpbGVBcnIgPSBbXTtcbiAgICBsZXQgdGlsZTtcblxuICAgIGZvciAobGV0IHggPSB4U3RhcnQ7IHggPCB4RW5kOyB4KyspIHtcbiAgICAgIHRpbGUgPSB0aGlzLmJvYXJkW3lTdGFydF1beF07XG4gICAgICBpZiAodGlsZS5jb250YWlucyAhPT0gbnVsbCkgdGhpcy5TVE9QKCk7XG4gICAgICB0aWxlQXJyLnB1c2godGlsZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRpbGVBcnI7XG4gIH1cblxuICBwbGFjZU9uWShjb3JkT2JqKSB7XG4gICAgbGV0IHsgeFN0YXJ0LCB4RW5kLCB5U3RhcnQsIHlFbmQgfSA9IGNvcmRPYmo7XG4gICAgbGV0IHRpbGVBcnIgPSBbXTtcbiAgICBsZXQgdGlsZTtcblxuICAgIGZvciAobGV0IHkgPSB5U3RhcnQ7IHkgPCB5RW5kOyB5KyspIHtcbiAgICAgIHRpbGUgPSB0aGlzLmJvYXJkW3ldW3hFbmRdO1xuICAgICAgaWYgKHRpbGUuY29udGFpbnMgIT09IG51bGwpIHRoaXMuU1RPUCgpO1xuICAgICAgdGlsZUFyci5wdXNoKHRpbGUpO1xuICAgIH1cblxuICAgIHJldHVybiB0aWxlQXJyO1xuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhhdHRhY2tDb3JkaW5hdGVzKSB7XG4gICAgbGV0IFt4LCB5XSA9IGF0dGFja0NvcmRpbmF0ZXM7XG4gICAgbGV0IGF0dGFja2VkVGlsZSA9IHRoaXMuYm9hcmRbeV1beF07XG5cbiAgICBpZiAoYXR0YWNrZWRUaWxlLmhpdCA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYXR0YWNrOiBcImZhaWxlZFwiLFxuICAgICAgICBtZXNzYWdlOiBcInJlcGV0aXRpb25cIixcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChhdHRhY2tlZFRpbGUuaGFzU2hpcCA9PT0gZmFsc2UpIHtcbiAgICAgIGF0dGFja2VkVGlsZS5oaXQgPSB0cnVlO1xuICAgICAgdGhpcy5taXNzZWRTaG90cy5wdXNoKGF0dGFja0NvcmRpbmF0ZXMpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYXR0YWNrOiBcInN1Y2Nlc3NcIixcbiAgICAgICAgbWVzc2FnZTogXCJtaXNzXCIsXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAoYXR0YWNrZWRUaWxlLmhhc1NoaXAgPT09IHRydWUgJiYgYXR0YWNrZWRUaWxlLmhpdCA9PT0gZmFsc2UpIHtcbiAgICAgIGF0dGFja2VkVGlsZS50YWtlSGl0KCk7XG5cbiAgICAgIGxldCBpc1N1bmsgPSBhdHRhY2tlZFRpbGUuY29udGFpbnMuaXNTdW5rKCk7XG5cbiAgICAgIGlmIChpc1N1bmsgPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5zaGlwQ291bnQgLT0gMTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBhdHRhY2s6IFwic3VjY2Vzc1wiLFxuICAgICAgICAgIG1lc3NhZ2U6IFwic3Vua1wiLFxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBhdHRhY2s6IFwic3VjY2Vzc1wiLFxuICAgICAgICAgIG1lc3NhZ2U6IFwiYnVsbHNleWVcIixcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBTVE9QKCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcInNwYWNlIGFscmVhZHkgdGFrZW5cIik7XG4gIH1cblxuICBpc0VtcHR5KCkge1xuICAgIHJldHVybiB0aGlzLnNoaXBDb3VudCA9PT0gMCA/IHRydWUgOiBmYWxzZTtcbiAgfVxufVxuXG4vL3NvbWV0aGluZyBha2luIHRvIGEgbGlua2VkIGxpc3Q/IGxpa2UgYSBOb2RlXG5jbGFzcyBUaWxlIHtcbiAgY29uc3RydWN0b3IocG9zaXRpb25PYmopIHtcbiAgICB0aGlzLmhpdCA9IGZhbHNlO1xuICAgIHRoaXMuaGFzU2hpcCA9IGZhbHNlO1xuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbk9iajtcbiAgICB0aGlzLmNvbnRhaW5zID0gbnVsbDtcbiAgfVxuXG4gIGFkZFNoaXAoc2hpcCkge1xuICAgIHRoaXMuY29udGFpbnMgPSBzaGlwO1xuICAgIHRoaXMuaGFzU2hpcCA9IHRydWU7XG4gIH1cblxuICB0YWtlSGl0KCkge1xuICAgIHRoaXMuaGl0ID0gdHJ1ZTtcbiAgICB0aGlzLmNvbnRhaW5zLmhpdCgpO1xuICB9XG59XG5cbmV4cG9ydCB7IEdhbWVib2FyZCB9O1xuIiwiaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5cbmNsYXNzIFBsYXllciB7XG4gIGNvbnN0cnVjdG9yKHR5cGUsIG5hbWUgPSBcIk1yIEJvdEV2aWxcIikge1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmdhbWVib2FyZCA9IHRoaXMuY3JlYXRlQm9hcmQobmFtZSk7XG4gICAgdGhpcy5vcHBvbmVudCA9IG51bGw7XG4gIH1cblxuICBjcmVhdGVCb2FyZChuYW1lKSB7XG4gICAgbGV0IGJvYXJkID0gbmV3IEdhbWVib2FyZChuYW1lKTtcbiAgICByZXR1cm4gYm9hcmQ7XG4gIH1cblxuICBhZGRPcHBvbmVudChvcHBvbmVudE9iaikge1xuICAgIHRoaXMub3Bwb25lbnQgPSBvcHBvbmVudE9iajtcbiAgfVxufVxuXG5leHBvcnQgeyBQbGF5ZXIgfTtcbiIsImNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihsZW5ndGgsIG5hbWUpIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuaGVhbHRoID0gbGVuZ3RoO1xuICB9XG5cbiAgaGl0KCkge1xuICAgIHRoaXMuaGVhbHRoIC09IDE7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgaWYgKHRoaXMuaGVhbHRoID09PSAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgeyBTaGlwIH07XG4iLCJjb25zdCBkb21Db250cm9sbGVyID0ge1xuICBwbGF5ZXJET01zOiBbXSxcbiAgY3JlYXRlRE9NQm9hcmQ6IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBib2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgbGV0IGRvbUFyciA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgbGV0IGJvYXJkUGllY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgYm9hcmRQaWVjZS5jbGFzc0xpc3QuYWRkKFwiYm9hcmQtcGllY2VcIik7XG4gICAgICBkb21BcnIucHVzaChib2FyZFBpZWNlKTtcbiAgICAgIGJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGJvYXJkUGllY2UpO1xuICAgIH1cblxuICAgIHRoaXMucGxheWVyRE9Ncy5wdXNoKGRvbUFycik7XG5cbiAgICByZXR1cm4gYm9hcmRDb250YWluZXI7XG4gIH0sXG4gIGNvcmRzVG9ET01JbmRleCh4LCB5KSB7XG4gICAgbGV0IGluZGV4ID0geCArIHkgKiAxMDtcbiAgICByZXR1cm4gaW5kZXg7XG4gIH0sXG59O1xuXG5leHBvcnQgeyBkb21Db250cm9sbGVyIH07XG4iLCJpbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9wbGF5ZXJzXCI7XG5pbXBvcnQgeyBDb21wdXRlciB9IGZyb20gXCIuLi9jb21wb25lbnRzL2NvbXB1dGVyXCI7XG4vKiBBbG1vc3QgbGlrZSBjbGFzc2VzLCBidXQganVzdCBlYXNpZXIgdG8gdmlzdWFsaXplLiBEYXRhIGNhbiBnZXQgb3ZlcndoZWxtaW5nLCBcbnRoaXMgaGVscHMga2VlcCB0cmFjayBvZiBldmVyeXRoaW5nIC0gdGhpcyBpcyBteSBzdGFuZGFyZCBwYXR0ZXJuIGZvciBvdGhlciBwcm9qZWN0cyovXG5cbmNvbnN0IGdhbWVDb250cm9sbGVyID0ge1xuICBwbGF5ZXJzOiBbXSxcbiAgdHVybjogMCxcbiAgY3JlYXRlUGxheWVyOiBmdW5jdGlvbiAodHlwZSwgbmFtZSA9IFwiXCIpIHtcbiAgICBsZXQgcGxheWVyID0gbmV3IFBsYXllcih0eXBlLCBuYW1lKTtcbiAgICB0aGlzLnBsYXllcnMucHVzaChwbGF5ZXIpO1xuICB9LFxuICB1bnBhY2tHYW1lOiBmdW5jdGlvbiAoZ2FtZU9iaikge1xuICAgIHJldHVybiBnYW1lT2JqLnR5cGUgPT09IFwicHZwXCJcbiAgICAgID8gdGhpcy5zdGFydFBWUChnYW1lT2JqKVxuICAgICAgOiB0aGlzLnN0YXJ0UFZDKGdhbWVPYmopO1xuICB9LFxuICBzdGFydFBWQzogZnVuY3Rpb24gKGdhbWVPYmopIHtcbiAgICBsZXQgcGxheWVyMSA9IG5ldyBQbGF5ZXIoXCJwbGF5ZXJcIiwgZ2FtZU9iai5wbGF5ZXIxTmFtZSk7XG4gICAgbGV0IHBsYXllcjIgPSBuZXcgUGxheWVyKFwiY29tcHV0ZXJcIik7XG5cbiAgICBwbGF5ZXIxLmFkZE9wcG9uZW50KHBsYXllcjIpO1xuICAgIHBsYXllcjIuYWRkT3Bwb25lbnQocGxheWVyMSk7XG5cbiAgICBwbGF5ZXIyID0gbmV3IENvbXB1dGVyKGdhbWVPYmouY0RpZmZpY3VsdHksIHBsYXllcjIpO1xuXG4gICAgdGhpcy5wbGF5ZXJzLnB1c2gocGxheWVyMSk7XG4gICAgdGhpcy5wbGF5ZXJzLnB1c2gocGxheWVyMik7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcGxheWVyMSxcbiAgICAgIHBsYXllcjI6IHBsYXllcjIucGxheWVyT2JqLFxuICAgICAgY29tcHV0ZXJDb250cm9sczogcGxheWVyMixcbiAgICAgIGdhbWV0eXBlOiBcInB2Y1wiLFxuICAgIH07XG4gIH0sXG4gIHN0YXJ0UFZQOiBmdW5jdGlvbiAoZ2FtZU9iaikge1xuICAgIGxldCBwbGF5ZXIxID0gbmV3IFBsYXllcihcInBsYXllclwiLCBnYW1lT2JqLnBsYXllcjFOYW1lKTtcbiAgICBsZXQgcGxheWVyMiA9IG5ldyBQbGF5ZXIoXCJwbGF5ZXJcIiwgZ2FtZU9iai5wbGF5ZXIyTmFtZSk7XG5cbiAgICBwbGF5ZXIxLmFkZE9wcG9uZW50KHBsYXllcjIpO1xuICAgIHBsYXllcjIuYWRkT3Bwb25lbnQocGxheWVyMSk7XG5cbiAgICB0aGlzLnBsYXllcnMucHVzaChwbGF5ZXIxKTtcbiAgICB0aGlzLnBsYXllcnMucHVzaChwbGF5ZXIyKTtcblxuICAgIHJldHVybiB7XG4gICAgICBwbGF5ZXIxLFxuICAgICAgcGxheWVyMixcbiAgICAgIGdhbWV0eXBlOiBcInB2cFwiLFxuICAgIH07XG4gIH0sXG59O1xuXG4vKlByZS1yZXF1aXNpdGUgdGFza3M6XG4gKiAyIC0gUG9wLXVwIHdpdGggdHVybiBzd2l0Y2ggaWYgUGxheWVyIHZzIFBsYXllci5cbiAqIDMgLSBJZiBQdkMsIGFsZ29yaXRobSBsb2dpYyBnb2VzIGZpcnN0XG4gKiA1IC0gQ29vcmRpbmF0ZXMgYW5kIERPTSBsb2dpYywgd29ya2l0LWtpdCdzIGxvZ2ljIHdhcyBmbGF3ZWQ6IEkndmUgbGVhcm5lZCBzaW5jZS4gV2VcbiAqIGNvdWxkIGhhdmUgYSBsaXN0IG9mIERPTSByZWZlcmVuY2VzIHdoaWNoIGlzIGEgYmV0dGVyIGltcGxlbWVudGF0aW9uLCB0aGUgcG9pbnRlcnMgaGF2ZSBldmVudExpc3RlbmVycywgd2UgZG9uJ3QgbmVlZCB0byBmaWd1cmUgb3V0IHdoYXQgd2FzIGNsaWNrZWQgd2hlcmUuXG4gKiA2IC0gQSBjb25kaXRpb24gZm9yIGVuZEdhbWUuLi4gaG93ZXZlciB0aGlzIGNvdWxkIHByb2JhYmx5IGRvbmUgaGVyZS5cbiAqL1xuXG4vKiBEbyBJIG1ha2UgYSBuZXcgY29tcG9uZW50IHdpdGggR2FtZVR5cGUgY2xhc3M/IGFzIGluIG5ldyBHYW1lVHlwZSBmb3IgUFZQIGFuZCBQVkM/IHdpdGggdGhlaXIgb3duIG1ldGhvZHM/IFRoZXkgYXJlIGRpZmZlcmVudCBlbm91Z2ggdG8ganVzdGlmeSB0aGlzIGFic3RyYWN0aW9uIGxldmVsLlxuXG5JIHRoaW5rIHRoZSBiZXR0ZXIgcXVlc3Rpb24gaXMsIGRvZXMgdGhlIGN1cnJlbnQgaW1wbGVtZW50YXRpb24gYm90aGVyIG1lIGVub3VnaCB0byB3YXJyYW50IGFub3RoZXIgY2xhc3M/IEFuZCB0aGUgYW5zd2VyIGlzIG5vLCBub3QgeWV0LiBCdXQgSSBzZWUgaXQgY29taW5nIHRvIHRoYXQuIFxuXG5IZXJlIGlzIGEgYnJlYWtkb3duIGlmIGl0IGRvZXM6XG5cbkdhbWVUeXBlIGNsYXNzIGhhcyBtZXRob2RzIHRoYXQgYXJlIFwiZ2FtZS1kcml2ZXJzXCIgb3Igd2hhdGV2ZXIsIHBvaW50IGlzIC0gdGhleSBkcml2ZSBcbnRoZSBnYW1lLiBEZXBlbmRpbmcgaWYgUFZDIG9yIFBWUCwgaXQgZWl0aGVyIGNhbGxzIHRoZSBjb21wdXRlciBvYmplY3QgdG8gdGFrZSBpdCdzIHR1cm4gXG5ieSB0aGUgXCJ0YWtlVHVybigpXCIgbWV0aG9kIHRoYXQgZGVkdWN0cyBhIG1vdmVtZW50IHBvaW50LiBcblxuTW92ZW1lbnQgcG9pbnQgZ2V0cyBhZGRlZCBpZiAgaXQncyBhIGhpdC4gSWYgaXQncyB0aGUgcGxheWVyIG9iamVjdCwgaXQgY2FsbHMgdGhlIFxudGFrZVR1cm4oKSBtZXRob2Qgd2l0aCBhIHR3aXN0OiBpdCBzaG93cyB0aGUgMTAvNy81IHNlY29uZCBjb3VudGVyIG9yIHdoYXRldmVyIGZlZWxzIFxuYmVzdCB0byBwYXNzIHRvIGFub3RoZXIgcGxheWVyLCBhbmQgdGhlbiBhbGxvd3MgaGl0cy4gXG5cbkluIFBWQyB3ZSBoYXZlIGEgZ290Y2hhOiB3ZSBuZWVkIHRvIE8obikgcmUtZ2VuZXJhdGUgdGhlIGJvYXJkIG9uIHRoZSBVSSB0byBoaWRlIGl0IGZvciB0aGUgb3RoZXIgcGxheWVyLiBPciBtYXliZSBhIGNsZXZlciBoYWNrIHdpdGggY2xhc3Nlcz8gXG5cblRyeSB0aGlzOiBcbihJIGhhdmUgdG8gd3JpdGUgaXQgZG93biBiZWNhdXNlIHRoZSBuZXh0IDMwIGRheXMgSSBhbSB3b3JraW5nIG5vbi1zdG9wIGluIGV2ZW50c1xud2l0aG91dCBkYXlzIG9mZiwgUklQaW8pXG5cbjEgLSBDbGFzc2VzIHRyaWNrOiBhZGQgY2xhc3NlcyBmb3IgaGl0LCBhbmQgdXNpbmcgeW91ciBkb20gYXJyYXkgLSBoaWRlIGJvdGggb2YgdGhlIHBsYXllcidzIGFycmF5cyBieSBhY3RpdmF0aW5nIHRoZSAuY2xhc3NMaXN0LmFkZChcInRlbXBvcmFyeS1oaWRlXCIpIHRyaWNrIGZvciBib3RoIHNpZGVzLiBTbyB3aGVuIHRoZSBwbGF5ZXJzIGhhdmUgdG8gcGFzcywgdGhleSBvbmx5IHNlZSB0aGUgKFwiaGl0XCIpIGNsYXNzIHdoaWxlIHRoZWlyIGJvYXRzIGFyZSBoaWRkZW4uIFxuXG5TbyB3aGF0IGlzIGEgYm9hdCB0aGVuPyBcblxuKGluIHRoZSBjb250ZXh0IG9mIFVJIGFuZCBkaXNwbGF5KSwgYSBib2F0IGlzIGEgQ1NTIGZpbGxlcj8gb3IgaG93IGRvIHdlIG1ha2Ugc3VyZSB0aGUgYm9hdCBpcyBoaWRkZW4/IGZ1Y2sgdGhhdCdzIGhhcmQuIExldCB0aGUgZnV0dXJlIG1lIHNvbHZlIHRoZSBwcm9ibGVtIHdoaWxlIGJ1aWxkaW5nIHVwIG9uIHRoZSBpZGVhLlxuXG5TbyBtYW55IGlkZWFzIHRvIHRyeSwgSSBhbSBsaWtlIGEgZmF0IGtpZCBpbiBhIGNhbmR5IHNob3AgZXllLWluZyBldmVyeSBzaW5nbGUgdGhpbmcgdG8gdHJ5IGl0IG91dC4gQnV0IGFsYXMsIGNhbmR5IGNhbid0IHBheSBmb3IgcmVudC4gUmlwaW8gb2Ygbm93LCBJJ2xsIGNvbWUgYmFjay4gQWxsIEkgYW0gZG9pbmcgd2l0aCB0aGlzIHdvcmsgaXMgYnV5aW5nIG1vcmUgdGltZSB0byBkbyB0aGUgdGhpbmdzIEkgbG92ZS4gXG5cbi9FbmQgb2YgcmFudFxuXG5CdWlsZCB0aGUgZnVja2luZyBjbGFzc1xuKi9cbmV4cG9ydCB7IGdhbWVDb250cm9sbGVyIH07XG4iLCIvKiAgSW5pdGlhbCBsb2FkIHBhZ2UgdG8gZ2V0IHRoZSB1c2VyIGlucHV0IGZvciBcblxuMSAtIG5hbWVcbjIgLSB0eXBlIG9mIGdhbWUgKFB2UCBvciBQdkMpXG4zIC0gaWYgUHZDLCBkaWZmaWN1bHR5XG5cbk5vdGhpbmcgZWxzZSBtYXR0ZXJzIC0ganVzdCB0byBsb2FkIHRoZSBuZXh0IHBhZ2Ugd2hlbiBkb25lXG4gKi9cbmltcG9ydCB7IHB2cFNjcmVlbkNvbnRyb2xsZXIgfSBmcm9tIFwiLi9wdnAtc2NyZWVuXCI7XG5pbXBvcnQgeyBwdmNTY3JlZW5Db250cm9sbGVyIH0gZnJvbSBcIi4vcHZjLXNjcmVlblwiO1xuXG5jb25zdCBpbml0aWFsUGFnZUNvbnRyb2xsZXIgPSB7XG4gIGNvbnRlbnRTcGFjZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250ZW50XCIpLFxuICBpbml0aWF0ZTogZnVuY3Rpb24gKCkge1xuICAgIGxldCB0aXRsZSA9IHRoaXMuY3JlYXRlVGl0bGUoKTtcbiAgICBsZXQgZm9ybSA9IHRoaXMuY3JlYXRlRm9ybSgpO1xuXG4gICAgdGhpcy5jb250ZW50U3BhY2UuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgIHRoaXMuY29udGVudFNwYWNlLmFwcGVuZENoaWxkKGZvcm0pO1xuICB9LFxuICBjcmVhdGVGb3JtOiBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xuICAgIGNvbnN0IGdhbWVUeXBlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBwdnBCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGNvbnN0IHB2Y0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cbiAgICBnYW1lVHlwZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiZ2FtZS10eXBlLWNvbnRhaW5lclwiKTtcbiAgICBmb3JtLmNsYXNzTGlzdC5hZGQoXCJnYW1lLXR5cGVcIik7XG4gICAgcHZwQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJwdnBcIik7XG4gICAgcHZjQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJwdmNcIik7XG5cbiAgICBwdnBCdXR0b24udGV4dENvbnRlbnQgPSBcIlBsYXkgYWdhaW5zdCBhIHBsYXllclwiO1xuICAgIHB2Y0J1dHRvbi50ZXh0Q29udGVudCA9IFwiUGxheSBhZ2FpbnN0IGEgY29tcHV0ZXJcIjtcblxuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZ2FtZVR5cGVDb250YWluZXIpO1xuICAgIGdhbWVUeXBlQ29udGFpbmVyLmFwcGVuZENoaWxkKHB2cEJ1dHRvbik7XG4gICAgZ2FtZVR5cGVDb250YWluZXIuYXBwZW5kQ2hpbGQocHZjQnV0dG9uKTtcblxuICAgIHRoaXMuYWN0aXZhdGVMaXN0ZW5lcnMocHZwQnV0dG9uLCBwdmNCdXR0b24pO1xuXG4gICAgcmV0dXJuIGZvcm07XG4gIH0sXG5cbiAgY3JlYXRlVGl0bGUoKSB7XG4gICAgY29uc3QgdGl0bGVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIGNvbnN0IGJhdHRsZXNoaXBJbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICB0aXRsZS50ZXh0Q29udGVudCA9IFwiUGxheSBCYXR0bGVTaGlwXCI7XG5cbiAgICB0aXRsZUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgdGl0bGVDb250YWluZXIuYXBwZW5kQ2hpbGQoYmF0dGxlc2hpcEltYWdlKTtcbiAgICByZXR1cm4gdGl0bGVDb250YWluZXI7XG4gIH0sXG5cbiAgYWN0aXZhdGVMaXN0ZW5lcnMocHZwQnV0dG9uLCBwdmNCdXR0b24pIHtcbiAgICBwdnBCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMubG9hZFBWUCk7XG4gICAgcHZjQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmxvYWRQVkMpO1xuICB9LFxuXG4gIGxvYWRQVlAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpbml0aWFsUGFnZUNvbnRyb2xsZXIuZ2FyYmFnZUNvbGxlY3QoKTtcbiAgICBwdnBTY3JlZW5Db250cm9sbGVyLmluaXRpYXRlKCk7XG4gIH0sXG5cbiAgbG9hZFBWQyhlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGluaXRpYWxQYWdlQ29udHJvbGxlci5nYXJiYWdlQ29sbGVjdCgpO1xuICAgIHB2Y1NjcmVlbkNvbnRyb2xsZXIuaW5pdGlhdGUoKTtcbiAgfSxcblxuICBnYXJiYWdlQ29sbGVjdCgpIHtcbiAgICB0aGlzLmNvbnRlbnRTcGFjZS50ZXh0Q29udGVudCA9IFwiXCI7XG4gIH0sXG59O1xuXG5leHBvcnQgeyBpbml0aWFsUGFnZUNvbnRyb2xsZXIgfTtcblxuLypMb3RzIG9mIHRoaW5raW5nIHdlbnQgaW50byBkZWNpZGluZyB3aGV0aGVyIG9yIG5vdCB0byB1c2UgVGFpbHdpbmQgdG8gc3BlZWQgdXAgZnJvbnRlbmQuIFRoZW4gSSBzYXcgdGhlaXIgcGxheWdyb3VkLCBKZXN1cyBNY0NocmlzdCwgSSB3b3VsZG4ndCB0b3VjaCB0aGF0IHdpdGggYSAxMCBmZWV0IHBvbGUgbG9sKi9cbiIsIi8qIGVzbGludC1kaXNhYmxlICovXG5pbXBvcnQgeyBnYW1lQ29udHJvbGxlciB9IGZyb20gXCIuLi9jb250cm9sbGVycy9nYW1lLWNvbnRyb2xsZXJcIjtcbmltcG9ydCB7IGRvbUNvbnRyb2xsZXIgfSBmcm9tIFwiLi4vY29udHJvbGxlcnMvZG9tLWNvbnRyb2xsZXJcIjtcblxuY29uc3QgbWFpbkdhbWVEaXNwbGF5Q29udHJvbGxlciA9IHtcbiAgY29udGVudFNwYWNlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRlbnRcIiksXG4gIGluaXRpYXRlOiBmdW5jdGlvbiAoZ2FtZU9iaikge1xuICAgIGxldCBnYW1lSW5mb09iaiA9IGdhbWVDb250cm9sbGVyLnVucGFja0dhbWUoZ2FtZU9iaik7XG4gICAgbGV0IHsgcDFCb2FyZCwgcDJCb2FyZCB9ID0gdGhpcy51bnBhY2tEaXNwbGF5KGdhbWVJbmZvT2JqKTtcblxuICAgIGxldCBwMUJvYXJkRE9NID0gZG9tQ29udHJvbGxlci5jcmVhdGVET01Cb2FyZCgpO1xuICAgIGxldCBwMkJvYXJkRE9NID0gZG9tQ29udHJvbGxlci5jcmVhdGVET01Cb2FyZCgpO1xuXG4gICAgdGhpcy5kaXNwbGF5Qm9hcmQocDFCb2FyZERPTSk7XG4gIH0sXG4gIHVucGFja0Rpc3BsYXk6IGZ1bmN0aW9uIChnYW1lSW5mbykge1xuICAgIGxldCBwMUJvYXJkID0gZ2FtZUluZm8ucGxheWVyMS5nYW1lYm9hcmQuYm9hcmQ7XG4gICAgbGV0IHAyQm9hcmQgPSBnYW1lSW5mby5wbGF5ZXIyLmdhbWVib2FyZC5ib2FyZDtcblxuICAgIHJldHVybiB7XG4gICAgICBwMUJvYXJkLFxuICAgICAgcDJCb2FyZCxcbiAgICB9O1xuICB9LFxuICBkaXNwbGF5Qm9hcmQoYm9hcmQpIHtcbiAgICAvL1xuICB9LFxufTtcblxuLyogTmV4dCBTdGVwczpcbiAgICBZb3UgY2FuIGNvbXBsZXRlbHkgZm9yZ2V0IGFib3V0IGFsbCBvdGhlciBwYWdlcywgYW5kIG9ubHkgdG91Y2ggdGhlbSB3aGVuIGRvaW5nIGZyb250ZW5kLiBXZSBnZXQgZXZlcnl0aGluZyB3ZSB3aWxsIGV2ZXIgbmVlZCBvdXQgb2YgdGhlbSB3aXRoIHRoZSBnYW1lT2JqLiBcbiAgICBcbiAgICBXZSBuZWVkIHRvIGltcG9ydCB0aGUgMiBjb250cm9sbGVycywgdGhpcyBwYWdlIGlzIGdvaW5nIHRvIGJlIGNvbnRyb2xsZWQgYnkgZG9tLWNvbnRyb2xsZXIsIGFuZCBkcml2ZW4gYnkgZ2FtZS1jb250cm9sbGVyLiBcblxuICAgIFdlIHNlbmQgdGhlIGluZm9ybWF0aW9uIHRvIGdhbWUtY29udHJvbGxlciB0byBjcmVhdGUgYWxsIHRoZSBuZWNlc3NhcnkgdGhpbmdzIGZvciB0aGUgZ2FtZSB0byBmbG93LiBcblxuICAgIFdlIGV4cGVjdCB0byByZWNlaXZlIGluZm9ybWF0aW9uIGZyb20gdGhlIGRvbS1jb250cm9sbGVyLCBiYXNlZCBvbiB1c2VyIGFjdGlvbnMgLSBhbmQgd2UgdGhlbiByZWxheSB0aGlzIGluZm9ybWF0aW9uIHRvIHRoZSBnYW1lLWNvbnRyb2xsZXJcbiovXG5cbi8qV2hhdCBpcyBhIG1haW4tZ2FtZS5qcyBmaWxlIGFueXdheT9cblxuVGhpcyBpcyBzdXBwb3NlZCB0byBjb250cm9sIHRoZSBwYWdlIGRpc3BsYXkgaXRzZWxmLCBub3QgdGhlIERPTSBtYW5pcHVsYXRpb25zLCBub3IgdGhlIFxuZ2FtZSBmbG93LiBcblxuV2hhdCBkb2VzIHRoYXQgbWVhbj9cblxuV2VsbCwgaWYgd2UgdGFrZSwgc2F5IHRoZSBib2FyZCBpdHNlbGYuIFRoZSBmaXJzdCBwYXJ0IHdvdWxkIGFzayBQbGF5ZXIxIHRvIGNyZWF0ZSB0aGUgXG5ib2FyZCAtIGFuZCB0aGVuIGp1c3QgcmVsYXkgdGhlIGJvYXJkIGluZm9ybWF0aW9uIHRvIHRoZSBnYW1lQ29udHJvbGxlciB0byBmaW5hbGl6ZSB0aGUgXG5QbGF5ZXIncyBib2FyZC4gSXQgZG9lcyBub3QgY3JlYXRlIHRoZSBib2FyZCwgbm9yIGRlYWxzIHdpdGggdGhlIGZhY3QgdGhhdCB1c2VycyBcbmludGVyYWN0IHdpdGggdGhlIGJvYXJkIC0gaXQgZG9lcyBub3QgY2FyZS4gbWFpbi1nYW1lLmpzIGlzIGEgcGFnZSByZXNwb25zaWJsZSBmb3IgXG5tYWtpbmcgc3VyZSB0aGF0IHdoYXRldmVyIHBhZ2UgaW5mb3JtYXRpb24gY29tZXMgaXRzIHdheSBpcyBkaXNwbGF5ZWQsIGFuZCB0aGF0IHRoZSBuZXh0IFxuc3RlcCBhZnRlciBzdWJtaXNzaW9uIGlzIHRvIGRpc3BsYXkgdGhlIFBsYXllciAyIG1ha2UtYS1ib2FyZCBwYWdlIC8gb3IganVzdCBzdGFydCB0aGUgZ2FtZSAoaWYgYWdhaW5zdCBhIGJvdCkqL1xuXG5leHBvcnQgeyBtYWluR2FtZURpc3BsYXlDb250cm9sbGVyIH07XG4iLCJpbXBvcnQgeyBtYWluR2FtZURpc3BsYXlDb250cm9sbGVyIH0gZnJvbSBcIi4vbWFpbi1nYW1lXCI7XG5cbmNvbnN0IHB2Y1NjcmVlbkNvbnRyb2xsZXIgPSB7XG4gIGNvbnRlbnRTcGFjZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250ZW50XCIpLFxuICBpbml0aWF0ZTogZnVuY3Rpb24gKCkge1xuICAgIGxldCB0aXRsZSA9IHRoaXMuY3JlYXRlVGl0bGUoKTtcbiAgICBsZXQgZGlmZmljdWx0eUNob2ljZSA9IHRoaXMuY3JlYXRlRGlmZmljdWx0eUNob2ljZSgpO1xuXG4gICAgdGhpcy5jb250ZW50U3BhY2UuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgIHRoaXMuY29udGVudFNwYWNlLmFwcGVuZENoaWxkKGRpZmZpY3VsdHlDaG9pY2UpO1xuICB9LFxuICBjcmVhdGVUaXRsZTogZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHRpdGxlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICBjb25zdCBwdmNEZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICB0aXRsZS50ZXh0Q29udGVudCA9IFwiUGxlYXNlIHNlbGVjdCB0aGUgZGlmZmljdWx0eS5cIjtcbiAgICBwdmNEZXNjcmlwdGlvbi5pbm5lckhUTUwgPVxuICAgICAgXCJEb24ndCBzZWxlY3QgaGFyZCBmb3IgZ2lnZ2xlcyBiZWNhdXNlIDxlbT48c3Ryb25nPnlvdSB3aWxsPC9zdHJvbmc+PC9lbT4gbG9vc2UuIFRoaXMgaXMgPHN0cm9uZz5ub3Q8L3N0cm9uZz4gYSB3YXJuaW5nLiBBdmVyYWdlIGh1bWFuIHdpbnMgaW4gNjAtNzAgbW92ZXMsIHRoZSBhbGdvcml0aG0gd2lucyBpbiA1OC5cIjtcblxuICAgIHRpdGxlQ29udGFpbmVyLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICB0aXRsZUNvbnRhaW5lci5hcHBlbmRDaGlsZChwdmNEZXNjcmlwdGlvbik7XG5cbiAgICByZXR1cm4gdGl0bGVDb250YWluZXI7XG4gIH0sXG4gIGNyZWF0ZURpZmZpY3VsdHlDaG9pY2U6IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBidXR0b25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGVhc3lEaWZmaWN1bHR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBjb25zdCBtZWRpdW1EaWZmaWN1bHR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBjb25zdCBoYXJkRGlmZmljdWx0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cbiAgICBlYXN5RGlmZmljdWx0eS5jbGFzc0xpc3QuYWRkKFwiZGlmZmljdWx0eS1zZWxlY3RcIik7XG4gICAgbWVkaXVtRGlmZmljdWx0eS5jbGFzc0xpc3QuYWRkKFwiZGlmZmljdWx0eS1zZWxlY3RcIik7XG4gICAgaGFyZERpZmZpY3VsdHkuY2xhc3NMaXN0LmFkZChcImRpZmZpY3VsdHktc2VsZWN0XCIpO1xuXG4gICAgYnV0dG9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGVhc3lEaWZmaWN1bHR5KTtcbiAgICBidXR0b25Db250YWluZXIuYXBwZW5kQ2hpbGQobWVkaXVtRGlmZmljdWx0eSk7XG4gICAgYnV0dG9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGhhcmREaWZmaWN1bHR5KTtcblxuICAgIGVhc3lEaWZmaWN1bHR5LnRleHRDb250ZW50ID0gXCJFYXN5XCI7XG4gICAgbWVkaXVtRGlmZmljdWx0eS50ZXh0Q29udGVudCA9IFwiTWVkaXVtXCI7XG4gICAgaGFyZERpZmZpY3VsdHkudGV4dENvbnRlbnQgPSBcIuKaoO+4j0hhcmTimqDvuI9cIjtcblxuICAgIGVhc3lEaWZmaWN1bHR5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBkaWZmaWN1bHR5Q29udHJvbGxlci5jYWxsRWFzeSk7XG4gICAgbWVkaXVtRGlmZmljdWx0eS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZGlmZmljdWx0eUNvbnRyb2xsZXIuY2FsbE5vcm1hbCk7XG4gICAgaGFyZERpZmZpY3VsdHkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGRpZmZpY3VsdHlDb250cm9sbGVyLmNhbGxIYXJkKTtcblxuICAgIHJldHVybiBidXR0b25Db250YWluZXI7XG4gIH0sXG4gIGNsZWFyQWxsOiBmdW5jdGlvbiAoKSB7XG4gICAgcHZjU2NyZWVuQ29udHJvbGxlci5jb250ZW50U3BhY2UudGV4dENvbnRlbnQgPSBcIlwiO1xuICB9LFxufTtcblxuY29uc3QgZGlmZmljdWx0eUNvbnRyb2xsZXIgPSB7XG4gIGNhbGxFYXN5OiBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBnYW1lSW5mb3JtYXRpb24uY0RpZmZpY3VsdHkgPSBcImVhc3lcIjtcbiAgICBwdmNTY3JlZW5Db250cm9sbGVyLmNsZWFyQWxsKCk7XG4gICAgbmFtZUZvcm1Db250cm9sbGVyLmluaXRpYXRlKCk7XG4gIH0sXG4gIGNhbGxOb3JtYWw6IGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGdhbWVJbmZvcm1hdGlvbi5jRGlmZmljdWx0eSA9IFwibWVkaXVtXCI7XG4gICAgcHZjU2NyZWVuQ29udHJvbGxlci5jbGVhckFsbCgpO1xuICAgIG5hbWVGb3JtQ29udHJvbGxlci5pbml0aWF0ZSgpO1xuICB9LFxuICBjYWxsSGFyZDogZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZ2FtZUluZm9ybWF0aW9uLmNEaWZmaWN1bHR5ID0gXCJoYXJkXCI7XG4gICAgcHZjU2NyZWVuQ29udHJvbGxlci5jbGVhckFsbCgpO1xuICAgIG5hbWVGb3JtQ29udHJvbGxlci5pbml0aWF0ZSgpO1xuICB9LFxufTtcblxuY29uc3QgbmFtZUZvcm1Db250cm9sbGVyID0ge1xuICBjb250ZW50U3BhY2U6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGVudFwiKSxcbiAgaW5pdGlhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgdGl0bGUgPSB0aGlzLmNyZWF0ZVRpdGxlKCk7XG4gICAgbGV0IG5hbWVGb3JtID0gdGhpcy5jcmVhdGVGb3JtKCk7XG5cbiAgICB0aGlzLmNvbnRlbnRTcGFjZS5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgdGhpcy5jb250ZW50U3BhY2UuYXBwZW5kQ2hpbGQobmFtZUZvcm0pO1xuICB9LFxuICBjcmVhdGVGb3JtOiBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcbiAgICBsZXQgbmFtZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgbGV0IG5hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBsZXQgc3VibWl0TmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cbiAgICBuYW1lSW5wdXQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRcIik7XG4gICAgbmFtZUlucHV0LnNldEF0dHJpYnV0ZShcImlkXCIsIFwidW5hbWVcIik7XG4gICAgbmFtZUlucHV0LnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJ1bmFtZVwiKTtcbiAgICBuYW1lSW5wdXQuc2V0QXR0cmlidXRlKFwibWF4bGVuZ3RoXCIsIDMwKTtcbiAgICBuYW1lSW5wdXQuc2V0QXR0cmlidXRlKFwibWlubGVuZ3RoXCIsIDIpO1xuXG4gICAgc3VibWl0TmFtZS50ZXh0Q29udGVudCA9IGBTdWJtaXQgeW91ciBuYW1lYDtcbiAgICBzdWJtaXROYW1lLmNsYXNzTGlzdC5hZGQoXCJzdWJtaXQtbmFtZVwiKTtcblxuICAgIGZvcm0uYXBwZW5kQ2hpbGQobmFtZUNvbnRhaW5lcik7XG4gICAgbmFtZUNvbnRhaW5lci5hcHBlbmRDaGlsZChuYW1lSW5wdXQpO1xuICAgIG5hbWVDb250YWluZXIuYXBwZW5kQ2hpbGQoc3VibWl0TmFtZSk7XG5cbiAgICBzdWJtaXROYW1lLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBuYW1lRm9ybUNvbnRyb2xsZXIucHJvY2Vzc05hbWUpO1xuXG4gICAgcmV0dXJuIGZvcm07XG4gIH0sXG4gIGNyZWF0ZVRpdGxlOiBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSBgUGxheWVyIDEsIHBsZWFzZSBlbnRlciB5b3VyIG5hbWVgO1xuXG4gICAgdGl0bGUuY2xhc3NMaXN0LmFkZChcInRpdGxlXCIpO1xuXG4gICAgcmV0dXJuIHRpdGxlO1xuICB9LFxuICBwcm9jZXNzTmFtZTogZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgbGV0IHVuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1bmFtZVwiKS52YWx1ZTtcblxuICAgIGlmICh1bmFtZSA9PSBcIlwiIHx8IHVuYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHVuYW1lID0gYFBsYXllcjFgO1xuICAgIH1cblxuICAgIGdhbWVJbmZvcm1hdGlvbi5wbGF5ZXIxTmFtZSA9IHVuYW1lO1xuICAgIHB2Y1NjcmVlbkNvbnRyb2xsZXIuY2xlYXJBbGwoKTtcbiAgICBtYWluR2FtZURpc3BsYXlDb250cm9sbGVyLmluaXRpYXRlKGdhbWVJbmZvcm1hdGlvbik7XG4gIH0sXG59O1xuXG5jb25zdCBnYW1lSW5mb3JtYXRpb24gPSB7XG4gIHBsYXllcjFOYW1lOiBcIlwiLFxuICB0eXBlOiBcInB2Y1wiLFxuICBjRGlmZmljdWx0eTogXCJcIixcbn07XG5cbmV4cG9ydCB7IHB2Y1NjcmVlbkNvbnRyb2xsZXIgfTtcbiIsImltcG9ydCB7IG1haW5HYW1lRGlzcGxheUNvbnRyb2xsZXIgfSBmcm9tIFwiLi9tYWluLWdhbWVcIjtcblxuY29uc3QgcHZwU2NyZWVuQ29udHJvbGxlciA9IHtcbiAgY3VycmVudFBsYXllcjogMSxcbiAgY29udGVudFNwYWNlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRlbnRcIiksXG4gIG1vZGFsU3BhY2U6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9kYWwtcmVzZXJ2ZWQtc3BhY2VcIiksXG4gIGluaXRpYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IHRpdGxlID0gdGhpcy5jcmVhdGVUaXRsZSgpO1xuICAgIGxldCBmb3JtID0gdGhpcy5jcmVhdGVGb3JtKCk7XG5cbiAgICB0aGlzLmNvbnRlbnRTcGFjZS5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgdGhpcy5jb250ZW50U3BhY2UuYXBwZW5kQ2hpbGQoZm9ybSk7XG4gIH0sXG5cbiAgY3JlYXRlVGl0bGU6IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCB0aXRsZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IHJ1bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgIHRpdGxlLnRleHRDb250ZW50ID0gYFBsYXllciAke3RoaXMuY3VycmVudFBsYXllcn0sIHBsZWFzZSBlbnRlciB5b3VyIG5hbWVgO1xuICAgIHJ1bGVzLnRleHRDb250ZW50ID0gXCJDbGljayBtZSB0byByZWFkIGEgcXVpY2sgcnVsZSBydW4tZG93blwiO1xuXG4gICAgdGl0bGVDb250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgIHRpdGxlQ29udGFpbmVyLmFwcGVuZENoaWxkKHJ1bGVzKTtcblxuICAgIHRpdGxlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ0aXRsZS1jb250YWluZXJcIik7XG4gICAgdGl0bGUuY2xhc3NMaXN0LmFkZChcInRpdGxlXCIpO1xuICAgIHJ1bGVzLmNsYXNzTGlzdC5hZGQoXCJydWxlc1wiKTtcblxuICAgIHRoaXMuYWN0aXZhdGVSdWxlc1BvcHVwKHJ1bGVzKTtcblxuICAgIHJldHVybiB0aXRsZUNvbnRhaW5lcjtcbiAgfSxcblxuICBhY3RpdmF0ZVJ1bGVzUG9wdXAocnVsZXMpIHtcbiAgICBydWxlcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5ydWxlc1BvcHVwKTtcbiAgfSxcblxuICBydWxlc1BvcHVwKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy9EZXNjcmliZSBwYXNzLW4tcGxheSwgYWRkIGEgY291bnRlciBmb3IgMTAgc2Vjb25kcyB0byBzd2l0Y2guXG4gICAgY29uc3QgbW9kYWxTcGFjZSA9IHB2cFNjcmVlbkNvbnRyb2xsZXIubW9kYWxTcGFjZTtcbiAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaWFsb2dcIik7XG4gICAgY29uc3QgY2xvc2VNb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgcGFyYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuXG4gICAgcGFyYS5pbm5lckhUTUwgPVxuICAgICAgXCJDbGFzc2ljIGJhdHRsZXNoaXAgcnVsZXMuIEV2ZXJ5IGhpdCBnaXZlcyBhIHBsYXllciBhbm90aGVyIGNoYW5jZSBhdCBhIHNob3QuIEhvd2V2ZXIsIGlmIGEgcGxheWVyIG1pc3NlczogdGhlcmUgd2lsbCBiZSBhIDEwIHNlY29uZCB3aW5kb3cgdG8gcGFzcyB0aGUgY29tcHV0ZXIgdG8gdGhlIG90aGVyIHBsYXllci4gPGJyPiA8YnI+IFRoZSBmaXJzdCB0byB3aW4gaXMgdGhlIGZpcnN0IHRvIGRlc3Ryb3kgYWxsIHNoaXBzIG9mIHRoZSBvcHBvc2luZyBwbGF5ZXIuIFBhc3MgYW5kIHBsYXkhIERvbid0IGNoZWF0LCB5b3UgaGF2ZSAxMCBzZWNvbmRzIGV4YWN0bHkgZm9yIHRoYXQgcmVhc29uLlwiO1xuICAgIGNsb3NlTW9kYWwudGV4dENvbnRlbnQgPSBcInhcIjtcblxuICAgIHBhcmEuY2xhc3NMaXN0LmFkZChcInBucC1ydWxlc1wiKTtcbiAgICBjbG9zZU1vZGFsLmNsYXNzTGlzdC5hZGQoXCJjbG9zZS1wbnAtcnVsZXNcIik7XG4gICAgY2xvc2VNb2RhbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbW9kYWxDb250cm9sbGVyLmNsb3NlTW9kYWwpO1xuXG4gICAgbW9kYWxTcGFjZS5hcHBlbmRDaGlsZChtb2RhbCk7XG4gICAgbW9kYWwuYXBwZW5kQ2hpbGQoY2xvc2VNb2RhbCk7XG4gICAgbW9kYWwuYXBwZW5kQ2hpbGQocGFyYSk7XG5cbiAgICBtb2RhbENvbnRyb2xsZXIub3Blbk1vZGFsKG1vZGFsKTtcbiAgfSxcblxuICBjcmVhdGVGb3JtKCkge1xuICAgIGxldCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIik7XG4gICAgbGV0IG5hbWVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGxldCBuYW1lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgbGV0IHN1Ym1pdE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXG4gICAgbmFtZUlucHV0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xuICAgIG5hbWVJbnB1dC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInVuYW1lXCIpO1xuICAgIG5hbWVJbnB1dC5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIFwidW5hbWVcIik7XG4gICAgbmFtZUlucHV0LnNldEF0dHJpYnV0ZShcIm1heGxlbmd0aFwiLCAzMCk7XG4gICAgbmFtZUlucHV0LnNldEF0dHJpYnV0ZShcIm1pbmxlbmd0aFwiLCAyKTtcblxuICAgIHN1Ym1pdE5hbWUudGV4dENvbnRlbnQgPSBgU3VibWl0IFBsYXllciR7dGhpcy5jdXJyZW50UGxheWVyfSdzIG5hbWVgO1xuICAgIHN1Ym1pdE5hbWUuY2xhc3NMaXN0LmFkZChcInN1Ym1pdC1uYW1lXCIpO1xuXG4gICAgZm9ybS5hcHBlbmRDaGlsZChuYW1lQ29udGFpbmVyKTtcbiAgICBuYW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKG5hbWVJbnB1dCk7XG4gICAgbmFtZUNvbnRhaW5lci5hcHBlbmRDaGlsZChzdWJtaXROYW1lKTtcblxuICAgIHN1Ym1pdE5hbWUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZvcm1Db250cm9sbGVyLnByb2Nlc3NOYW1lKTtcblxuICAgIHJldHVybiBmb3JtO1xuICB9LFxuICBjbGVhckFsbCgpIHtcbiAgICBwdnBTY3JlZW5Db250cm9sbGVyLmNvbnRlbnRTcGFjZS50ZXh0Q29udGVudCA9IFwiXCI7XG4gIH0sXG59O1xuXG5jb25zdCBtb2RhbENvbnRyb2xsZXIgPSB7XG4gIGNsb3NlTW9kYWw6IGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdDtcbiAgICBwdnBTY3JlZW5Db250cm9sbGVyLm1vZGFsU3BhY2UudGV4dENvbnRlbnQgPSBcIlwiO1xuICB9LFxuICBvcGVuTW9kYWw6IGZ1bmN0aW9uIChtb2RhbCkge1xuICAgIG1vZGFsLnNob3dNb2RhbCgpO1xuICB9LFxufTtcblxuY29uc3QgZm9ybUNvbnRyb2xsZXIgPSB7XG4gIGdhbWVJbmZvcm1hdGlvbjoge1xuICAgIHBsYXllcjFOYW1lOiBcIlwiLFxuICAgIHBsYXllcjJOYW1lOiBcIlwiLFxuICAgIHR5cGU6IFwicHZwXCIsXG4gIH0sXG4gIHByb2Nlc3NOYW1lOiBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgdW5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VuYW1lXCIpLnZhbHVlO1xuXG4gICAgaWYgKHVuYW1lID09IFwiXCIgfHwgdW5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdW5hbWUgPSBgUGxheWVyJHtwdnBTY3JlZW5Db250cm9sbGVyLmN1cnJlbnRQbGF5ZXJ9YDtcbiAgICB9XG5cbiAgICBmb3JtQ29udHJvbGxlci5jcmVhdGVQbGF5ZXJPYmoodW5hbWUpO1xuICB9LFxuXG4gIGNyZWF0ZVBsYXllck9iajogZnVuY3Rpb24gKHVuYW1lKSB7XG4gICAgcHZwU2NyZWVuQ29udHJvbGxlci5jdXJyZW50UGxheWVyID09PSAxXG4gICAgICA/IChmb3JtQ29udHJvbGxlci5nYW1lSW5mb3JtYXRpb24ucGxheWVyMU5hbWUgPSB1bmFtZSlcbiAgICAgIDogKGZvcm1Db250cm9sbGVyLmdhbWVJbmZvcm1hdGlvbi5wbGF5ZXIyTmFtZSA9IHVuYW1lKTtcblxuICAgIHB2cFNjcmVlbkNvbnRyb2xsZXIuY3VycmVudFBsYXllciArPSAxO1xuXG4gICAgaWYgKHB2cFNjcmVlbkNvbnRyb2xsZXIuY3VycmVudFBsYXllciA+IDIpIHtcbiAgICAgIHB2cFNjcmVlbkNvbnRyb2xsZXIuY2xlYXJBbGwoKTtcbiAgICAgIG1haW5HYW1lRGlzcGxheUNvbnRyb2xsZXIuaW5pdGlhdGUoZm9ybUNvbnRyb2xsZXIuZ2FtZUluZm9ybWF0aW9uKTtcbiAgICAgIC8vdGFrZSBwbGF5ZXJzIHRvIG1haW4tZ2FtZS5qc1xuICAgIH0gZWxzZSB7XG4gICAgICBwdnBTY3JlZW5Db250cm9sbGVyLmNsZWFyQWxsKCk7XG4gICAgICBwdnBTY3JlZW5Db250cm9sbGVyLmluaXRpYXRlKCk7XG4gICAgfVxuICB9LFxufTtcblxuZXhwb3J0IHsgcHZwU2NyZWVuQ29udHJvbGxlciB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBpbml0aWFsUGFnZUNvbnRyb2xsZXIgfSBmcm9tIFwiLi9wYWdlcy9pbml0aWFsLWxvYWRcIjtcblxuaW5pdGlhbFBhZ2VDb250cm9sbGVyLmluaXRpYXRlKCk7XG4vL0F0IHRoaXMgcG9pbnQsIGluZGV4LmpzIGlzIGp1c3QgY3VzdG9tYXJ5XG4iXSwibmFtZXMiOlsiQ29tcHV0ZXIiLCJjb25zdHJ1Y3RvciIsImRpZmZpY3VsdHkiLCJwbGF5ZXJPYmoiLCJhbGdvcml0aG0iLCJnZXRBbGdvcml0aG0iLCJwbGF5IiwiU2hpcCIsIkdhbWVib2FyZCIsInBsYXllciIsImJvYXJkIiwiY3JlYXRlQm9hcmQiLCJtaXNzZWRTaG90cyIsInNoaXBDb3VudCIsInlBeGlzIiwiYm9hcmRQYXJ0IiwiaSIsInB1c2giLCJ4IiwiVGlsZSIsInhDb3JkIiwieUNvcmQiLCJwbGFjZVNoaXAiLCJzaGlwT2JqIiwiY29yZE9iaiIsInNoaXAiLCJ1bnBhY2tTaGlwIiwicGxhY2VtZW50RGF0YSIsInNoaXBEaXJlY3Rpb24iLCJwbGFjZU9uWCIsInBsYWNlT25ZIiwiZm9yRWFjaCIsInRpbGUiLCJhZGRTaGlwIiwiaGVhbHRoIiwidHlwZSIsInhTdGFydCIsInhFbmQiLCJ5U3RhcnQiLCJ0aWxlQXJyIiwiY29udGFpbnMiLCJTVE9QIiwieUVuZCIsInkiLCJyZWNlaXZlQXR0YWNrIiwiYXR0YWNrQ29yZGluYXRlcyIsImF0dGFja2VkVGlsZSIsImhpdCIsImF0dGFjayIsIm1lc3NhZ2UiLCJoYXNTaGlwIiwidGFrZUhpdCIsImlzU3VuayIsIkVycm9yIiwiaXNFbXB0eSIsInBvc2l0aW9uT2JqIiwicG9zaXRpb24iLCJQbGF5ZXIiLCJuYW1lIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiZ2FtZWJvYXJkIiwib3Bwb25lbnQiLCJhZGRPcHBvbmVudCIsIm9wcG9uZW50T2JqIiwiZG9tQ29udHJvbGxlciIsInBsYXllckRPTXMiLCJjcmVhdGVET01Cb2FyZCIsImJvYXJkQ29udGFpbmVyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiZG9tQXJyIiwiYm9hcmRQaWVjZSIsImNsYXNzTGlzdCIsImFkZCIsImFwcGVuZENoaWxkIiwiY29yZHNUb0RPTUluZGV4IiwiaW5kZXgiLCJnYW1lQ29udHJvbGxlciIsInBsYXllcnMiLCJ0dXJuIiwiY3JlYXRlUGxheWVyIiwidW5wYWNrR2FtZSIsImdhbWVPYmoiLCJzdGFydFBWUCIsInN0YXJ0UFZDIiwicGxheWVyMSIsInBsYXllcjFOYW1lIiwicGxheWVyMiIsImNEaWZmaWN1bHR5IiwiY29tcHV0ZXJDb250cm9scyIsImdhbWV0eXBlIiwicGxheWVyMk5hbWUiLCJwdnBTY3JlZW5Db250cm9sbGVyIiwicHZjU2NyZWVuQ29udHJvbGxlciIsImluaXRpYWxQYWdlQ29udHJvbGxlciIsImNvbnRlbnRTcGFjZSIsInF1ZXJ5U2VsZWN0b3IiLCJpbml0aWF0ZSIsInRpdGxlIiwiY3JlYXRlVGl0bGUiLCJmb3JtIiwiY3JlYXRlRm9ybSIsImdhbWVUeXBlQ29udGFpbmVyIiwicHZwQnV0dG9uIiwicHZjQnV0dG9uIiwidGV4dENvbnRlbnQiLCJhY3RpdmF0ZUxpc3RlbmVycyIsInRpdGxlQ29udGFpbmVyIiwiYmF0dGxlc2hpcEltYWdlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImxvYWRQVlAiLCJsb2FkUFZDIiwiZSIsInByZXZlbnREZWZhdWx0IiwiZ2FyYmFnZUNvbGxlY3QiLCJtYWluR2FtZURpc3BsYXlDb250cm9sbGVyIiwiZ2FtZUluZm9PYmoiLCJwMUJvYXJkIiwicDJCb2FyZCIsInVucGFja0Rpc3BsYXkiLCJwMUJvYXJkRE9NIiwicDJCb2FyZERPTSIsImRpc3BsYXlCb2FyZCIsImdhbWVJbmZvIiwiZGlmZmljdWx0eUNob2ljZSIsImNyZWF0ZURpZmZpY3VsdHlDaG9pY2UiLCJwdmNEZXNjcmlwdGlvbiIsImlubmVySFRNTCIsImJ1dHRvbkNvbnRhaW5lciIsImVhc3lEaWZmaWN1bHR5IiwibWVkaXVtRGlmZmljdWx0eSIsImhhcmREaWZmaWN1bHR5IiwiZGlmZmljdWx0eUNvbnRyb2xsZXIiLCJjYWxsRWFzeSIsImNhbGxOb3JtYWwiLCJjYWxsSGFyZCIsImNsZWFyQWxsIiwiZ2FtZUluZm9ybWF0aW9uIiwibmFtZUZvcm1Db250cm9sbGVyIiwibmFtZUZvcm0iLCJuYW1lQ29udGFpbmVyIiwibmFtZUlucHV0Iiwic3VibWl0TmFtZSIsInNldEF0dHJpYnV0ZSIsInByb2Nlc3NOYW1lIiwidW5hbWUiLCJ2YWx1ZSIsImN1cnJlbnRQbGF5ZXIiLCJtb2RhbFNwYWNlIiwicnVsZXMiLCJhY3RpdmF0ZVJ1bGVzUG9wdXAiLCJydWxlc1BvcHVwIiwibW9kYWwiLCJjbG9zZU1vZGFsIiwicGFyYSIsIm1vZGFsQ29udHJvbGxlciIsIm9wZW5Nb2RhbCIsImZvcm1Db250cm9sbGVyIiwic2hvd01vZGFsIiwiY3JlYXRlUGxheWVyT2JqIl0sInNvdXJjZVJvb3QiOiIifQ==
/* eslint-disable */
import { gameController } from "../controllers/game-controller";
import { domController } from "../controllers/dom-controller";

const mainGameDisplayController = {
  initiate: function (gameObj) {
    let gameInfoObj = gameController.unpackGame(gameObj);
    let { p1Board, p2Board } = this.unpackDisplay(gameInfoObj);

    let p1BoardDOM = domController.createDOMBoard();
    let p2BoardDOM = domController.createDOMBoard();

    this.displayBoard(p1BoardDOM);
  },
  unpackDisplay: function (gameInfo) {
    let p1Board = gameInfo.player1.gameboard.board;
    let p2Board = gameInfo.player2.gameboard.board;

    return {
      p1Board,
      p2Board,
    };
  },
  displayBoard(board) {
    //
  },
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

export { mainGameDisplayController };

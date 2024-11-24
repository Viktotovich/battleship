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
export { gameController };

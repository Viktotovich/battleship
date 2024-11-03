import { Player } from "../components/players";
/* Almost like classes, but just easier to visualize. Data can get overwhelming, 
this helps keep track of everything - this is my standard pattern for other projects*/

/*Pre-requisite tasks:
 * 1 - Initial load page to get the user input for name, type of game, etc
 * 2 - Pop-up with turn switch if Player vs Player. PvP is easier to test, at a sacrafice
 *  of having more things to create.
 * 3 - If PvC, algorithm logic goes first
 * 4 - DOM must exist at this point, same with UI.
 * 5 - Coordinates and DOM logic, workit-kit's logic was flawed: I've learned since. We
 * could have a list of DOM references which is a better implementation, the pointers have eventListeners, we don't need to figure out what was clicked where.
 * 6 - A condition for endGame... however this could probably done here.
 */

const gameController = {
  players: [],
  turn: 0,
  createPlayer: function (type, name = "") {
    let player = new Player(type, name);
    this.players.push(player);
  },
};

export { gameController };

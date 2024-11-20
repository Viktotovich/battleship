import { easyAlgorithm } from "../algorithms/easy-algorithm";
import { trailingAlgorithm } from "../algorithms/trailing-algorithm";

class Computer {
  constructor(difficulty, playerObj) {
    this.difficulty = difficulty;
    this.playerObj = playerObj;
    //send back a callback
    this.algorithm = this.getAlgorithm();
  }

  play() {
    if (trailingAlgorithm.trailing === true) {
      let [x, y] = trailingAlgorithm.continueTrailing();
      let attackResponce = this.playerObj.opponent.gameboard.receiveAttack([
        x,
        y,
      ]);

      return this.attackResponce(attackResponce);
    } else {
      let [x, y] = this.algorithm();
      let attackResponce = this.playerObj.opponent.gameboard.receiveAttack([
        x,
        y,
      ]);

      return this.unpackResponce(attackResponce, [x, y]);
    }
  }

  //Hunt and Target algorithm is in-common between all
  getAlgorithm() {
    if (this.difficulty === "easy") {
      //victory through randomness
      return easyAlgorithm.play; //return a callback
      //return easyAlgorithm.getRandomCord
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

  /* TODO: Disect this and make it it's own module
    easyAlgorithm() {
    let x = Math.round(Math.random() * 9);
    let y = Math.round(Math.random() * 9);

    let attackResponce = this.playerObj.opponent.gameboard.receiveAttack([
      x,
      y,
    ]);

    return this.unpackResponce(attackResponce, [x, y]);
  } */

  unpackResponce(attackResponce, cords) {
    //if you tried to hit an already hit tile, call the algorithm again
    if (
      attackResponce.message === "repetition" &&
      this.playerObj.opponent.gameboard.shipCount !== 0
    ) {
      return this.play();
    } else if (attackResponce.message === "bullseye") {
      //if successful, trail
      return trailingAlgorithm.initiate(cords);
    } else if (attackResponce.message === "sunk") {
      //if ship sunk, quit trail mode
      trailingAlgorithm.stop();
      return this.algorithm(); // we might need to return the success message too
    } else {
      //if a miss - return the response for other funcs to handle
      return attackResponce;
    }
  }

  //of the opponent
  getShortestShipFactor() {
    //very verbose, but look how it explains itself
    if (this.playerObj.opponent.gameboard.isEmpty()) {
      return 0;
    }

    let opponentShips = this.playerObj.opponent.gameboard.ships;

    let shipsAlive = [];

    opponentShips.forEach((ship) => {
      if (!ship.isSunk()) {
        shipsAlive.push(ship);
      }
    });

    let sortedShips = shipsAlive.sort((a, b) => a.health - b.health);
    return sortedShips[0].length;
  }
}

export { Computer };

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
      return trailingAlgorithm.continueTrailing();
    } else {
      return this.algorithm();
    }
  }

  //Hunt and Target algorithm is in-common between all
  getAlgorithm() {
    if (this.difficulty === "easy") {
      //victory through randomness
      return this.easyAlgorithm; //return a callback
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

  easyAlgorithm() {
    let x = Math.round(Math.random() * 9);
    let y = Math.round(Math.random() * 9);

    let attackResponce = this.playerObj.opponent.gameboard.receiveAttack([
      x,
      y,
    ]);

    return this.unpackResponce(attackResponce, [x, y]);
  }

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
      trailingAlgorithm.reset();
      return this.algorithm();
    } else {
      //if a miss - return the response for other funcs to handle
      return attackResponce;
    }
  }

  /* We can't use this feasibly TO TRAIL, as at times trailing with this leads to worst case scenario of having to fire 8 shots to get to a square occupied:
                          null
                          null 
  null - null - let's say we hit here - ship - null - null 
                          null
                          null

  If we use the shortest ship factor, worst case is that we will have to go up left 
  down right 2 squares from the hit, and then again up down left right (hit) - which 
  takes 8 hits. 

  Possible untested solution: get half of ship factor. However, this algorithm might be redundant except for random targeting. 
  */

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

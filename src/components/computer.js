import { easyAlgorithm } from "../algorithms/easy-algorithm";

class Computer {
  constructor(difficulty, playerObj) {
    this.difficulty = difficulty;
    this.playerObj = playerObj;
    //send back a callback
    this.algorithm = this.getAlgorithm();
  }

  play() {
    let [x, y] = this.algorithm();
    let attackResponse = this.playerObj.opponent.gameboard.receiveAttack([
      x,
      y,
    ]);

    return {
      attackResponse,
      x,
      y,
    };
  }

  //Hunt and Target algorithm is in-common between all
  getAlgorithm() {
    if (this.difficulty === "easy") {
      //victory through randomness
      return easyAlgorithm.play; //return a callback
      //return easyAlgorithm.getRandomCord
    }
  }
}

export { Computer };

/*
  Project is taking too long, so we are cutting down features (

  Feature graveyard:
   unpackTrail(attackResponce, cords, lastAction) {
    if (
      attackResponce.message === "repetition" &&
      this.playerObj.opponent.gameboard.shipCount !== 0
    ) {
      return this.play();
    } else if (attackResponce.message === "bullseye") {
      //keep up if succesful
      trailingAlgorithm.actionList.unshift(lastAction);
      trailingAlgorithm.trailedCords = cords; //keep trailing the succesful cords
      return this.play();
    } else if (attackResponce.message === "sunk") {
      trailingAlgorithm.stop();
      return this.algorithm();
    } else {
      //if trailing a cord, reset
      trailingAlgorithm.trailedCords = trailingAlgorithm.trailedData[0];
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


  else if (this.difficulty === "normal") {
        easy 2-step-space based algorithm, victory through efficient space-ing. Parody Algorithm.
      
      Improved: The space between each shot is the length of the shortest living ship
      return;
    } else {
      You know shit is about to get real when I link a video to Vsauce
      
      https://www.youtube.com/watch?v=LbALFZoRrw8

      Give a warning: You Are going to Loose

      Algorithm: Probability maps
      
      return;
    }
*/

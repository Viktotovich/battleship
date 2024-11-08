class Computer {
  constructor(difficulty, playerObj) {
    this.difficulty = difficulty;
    this.playerObj = playerObj;
    //send back a callback
    this.algorithm = this.getAlgorithm();
    this.trailing = false;
    this.trailedCords = null;
  }

  play() {
    if (this.trailing === true) {
      return this.trailShot(this.trailedCords);
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
      this.trailedCords = cords;
      return this.trailShot(cords);
    } else if (attackResponce.message === "sunk") {
      //if ship sunk, quit trail mode
      this.trailing = false;
      this.trailedCords = null;
      return this.algorithm();
    } else {
      //if a miss - return the response for other funcs to handle
      return attackResponce;
    }
  }

  //pass explicitly to have errors if I forget.
  trailShot(lastHitCoordinates) {
    /* Refer to notebook, simple algorithm:
    x changes twice, stays same twice. Change is +/- 1 x
    y changes twice, stays same twice. Change is +/- 1 y

    However, we are going greedier - and need to answer a few questions: what if we go out of bounds?
    */
    let [x, y] = lastHitCoordinates;

    //generators would be perfect here

    let attackResponce = this.playerObj.opponent.gameboard.receiveAttack();
  }

  getTileAbove(num) {
    return num > 0 ? num - 1 : null;
  }

  getTileBelow(num) {
    return num < 10 ? num + 1 : null;
  }

  getTileLeft(num) {
    return num > 0 ? num - 1 : null;
  }

  getTileRight(num) {
    return num < 10 ? num + 1 : null;
  }

  getShortestShipFactor() {
    /*another Ace up our sleeves, but we need to keep an array of ships stored on the 
    gameboard */
  }
}

export { Computer };

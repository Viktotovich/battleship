class Computer {
  constructor(difficulty, playerObj) {
    this.difficulty = difficulty;
    this.playerObj = playerObj;
    //send back a callback
    this.algorithm = this.getAlgorithm();
  }

  play() {
    // call the algorithm?
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
    // BUG FIX - there is no index 10 lol, oversight
    let x = Math.round(Math.random() * 9);
    let y = Math.round(Math.random() * 9);

    let attackResponce = this.playerObj.opponent.gameboard.receiveAttack([
      x,
      y,
    ]);

    //to verbose for my liking, but very solid
    if (
      attackResponce.attack === "failed" &&
      this.playerObj.opponent.gameboard.shipCount !== 0
    ) {
      return this.easyAlgorithm();
    } else {
      return attackResponce;
    }
  }
}

export { Computer };

class Computer {
  constructor(difficulty, playerObj) {
    this.difficulty = difficulty;
    this.playerObj = playerObj;
    this.algorithm = this.getAlgorithm();
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

export { Computer };

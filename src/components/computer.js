class Computer {
  constructor(difficulty, playerObj) {
    this.difficulty = difficulty;
    this.playerObj = playerObj;
    //send back a callback
    this.algorithm = this.getAlgorithm();
    this.trailObject = null;
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
      this.trailObject = null;
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
    */

    const trailObject = new Trailing(lastHitCoordinates);
    this.trailObject = trailObject;

    const trailCords = this.trailObject.findTrail();

    //this is what is blowing up, no cordinates - I went to work and forgot
    let attackResponce =
      this.playerObj.opponent.gameboard.receiveAttack(trailCords);

    /*Pseudo-code for trailing data, put initiallyHitCords, lastHitCords, and the rest 
    of the information inside that object. Including trailing = true || false. This is 
    cleaner, and allows us to have messy methods (which are the next steps).
    
    TODO:
    1 - Put the methods getTileAbove, and etc inside the trailingData object.
    2 - Add a few more properties: trailingData.hitShip === vertical || horizontal 
    (based on hit data)
    3 - Have a way to denote whether getTileAbove || below || etc has been covered.
    If we know that, e.g below is null - we don't have to call it again. 

    (optional)
    4 - This is probably scope creep, but maybe even track if we accidentally hit 
    another ship - keep it in the trailingData: accidentalHits Object||Arr. So that we 
    can deal with the first ship, and then the accidentally hit ship
    
    */

    return attackResponce;
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
  getShortestShipFactor() {
    let opponentShips = this.playerObj.opponent.gameboard.ships;
    let sortedShips = opponentShips.sort((a, b) => a.health - b.health);
    let i = 0;

    while (sortedShips[i].health && sortedShips[i].health === 0) {
      i++;

      if (i > 5) {
        return;
      }
    }

    return sortedShips[i].length;
  }
}

class Trailing {
  constructor(trailedCords) {
    this.trailing = true;
    this.trailedCords = trailedCords;
    this.trailingData = [];
    this.direction = null;
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

  findTrail() {
    //if left or right hit = trailing horizontal. If up or down == trail up or down
    return this.trailedCords; //up down left right CHANGE
    //Pasha Yebasha this is the problem, nothing is returned TODO returning arr to pass tests
  }
}

export { Computer };

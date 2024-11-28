/*
  From my notebook: 
  -------------------------------------------------------------------------------------
    Fun fact - we dont even need the board at all.
    10x10 board - 100 tiles. Choose a random number an go ship.length tiles
    down/right. Check if those tiles are taken, if they are - generate another point.

    Basically, any point 0-99. 99 will not have space to the rifht, so 0-95 is a 
    slightly inaccruate, but an effective version.
        Reasoning: Longest ship is 5 tiles long. I'ts inaccurate because after placing 
        the 5 tile ship, there are smaller ships that could fit into that little space.
  ------------------------------------------------------------------------------------
*/

const boardRandomizer = {
  initiate: function (ships) {
    //randomize for both horizontal and vertical placements
    ships.forEach((ship) => {
      boardRandomizer.generateDirectionToken(); //make an object
    });
  },
  generateDirectionToken() {
    let rToken = Math.round(Math.random() * 2);
    if (rToken === 1) {
      return "horizontal";
    } else {
      return "vertical";
    }
  },
  generateRandomPlacement(shipObj) {
    /*
      Send the ship with the token, and add a cord to that object
    */
  },
};

export { boardRandomizer };

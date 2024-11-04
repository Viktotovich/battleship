/*very import to deferentiate between this, and 
gameController*/

/* Next Steps:
    You can completely forget about all other pages, and only touch them when doing frontend. We get everything we will ever need out of them with the gameObj. 
    
    We need to import the 2 controllers, this page is going to be controlled by dom-controller, and driven by game-controller. 

    We send the information to game-controller to create all the necessary things for the game to flow. 

    We expect to receive information from the dom-controller, based on user actions - and we then relay this information to the game-controller
*/

const mainGameDisplayController = {
  initiate: function (gameObj) {
    this.unpackGame(gameObj);
  },
  unpackGame: function (gameObj) {
    gameObj.type === "pvp" ? this.startPVP(gameObj) : this.startPVC(gameObj);
  },
  startPVC: function (gameObj) {
    console.log(gameObj);
  },
  startPVP: function (gameObj) {
    console.log(gameObj);
  },
};

export { mainGameDisplayController };

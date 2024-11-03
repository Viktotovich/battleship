import { Player } from "../components/players";
/* Almost like classes, but just easier to visualize. Data can get overwhelming, 
this helps keep track of everything - this is my standard pattern for other projects*/

const gameController = {
  players: [],
  turn: 0,
  createPlayer: function (type, name = "") {
    let player = new Player(type, name);
    this.players.push(player);
  },
};

export { gameController };

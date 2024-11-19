/* eslint-disable */
import { Computer } from "../components/computer";
import { Player } from "../components/players";

/* Test boilerplate start */
let easyC = new Player("computer");
let easyCTest = new Computer("easy", easyC);

let testEnemy = new Player("player");
testEnemy.addOpponent(easyCTest.playerObj);

easyCTest.playerObj.addOpponent(testEnemy);
test("imports correctly", () => {
  expect(easyCTest.playerObj.name).toBe("Mr BotEvil");
});

//to test the algorithm, we need a boat
const chineseFishBoat = {
  health: 3,
  type: "Friendly Neighborhood Fishing Boat",
};

//And cords
let coordinatesObjTest = {
  xStart: 0,
  xEnd: 3,
  yStart: 0,
  yEnd: 0,
  shipDirection: "horizontal",
};

testEnemy.gameboard.placeShip(chineseFishBoat, coordinatesObjTest);

test("Computer makes a move, no issues in the test boilerplate (a test for the test)", () => {
  const attackResponce = easyCTest.play();
  expect(attackResponce["attack"]).toBe("success");
});
/* Test boilerplate end */

test("");

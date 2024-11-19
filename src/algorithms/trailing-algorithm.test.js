/* eslint-disable */
import { Computer } from "../components/computer";
import { Player } from "../components/players";
import { trailingAlgorithm } from "./trailing-algorithm";

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

test("We get the correct tiles with the actions / tile methods", () => {
  let testX = 1;
  let testY = 1;
  expect(trailingAlgorithm.getTileAbove(testX, testY)).toStrictEqual([1, 0]);
  expect(trailingAlgorithm.getTileBelow(testX, testY)).toStrictEqual([1, 2]);
  expect(trailingAlgorithm.getTileLeft(testX, testY)).toStrictEqual([0, 1]);
  expect(trailingAlgorithm.getTileRight(testX, testY)).toStrictEqual([2, 1]);
});

test("Randomize action correctly reduces the array size", () => {
  //write a test here
  // The effort to write a mock for this, would far exceed the effort needed to just console.log it. Might not be worth it
});

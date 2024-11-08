/* eslint-disable */
import { Computer } from "./computer";
import { Player } from "./players";

let easyC = new Player("computer");
let easyCTest = new Computer("easy", easyC);

let testEnemy = new Player("player");
testEnemy.addOpponent(easyCTest.playerObj);
easyCTest.playerObj.addOpponent(testEnemy);

test("imports correctly", () => {
  expect(easyCTest.playerObj.name).toBe("Mr BotEvil");
});

//it will have to be a good mock since the only way to test is by having another player
test.skip("Easy algorithm makes a play that attacks the enemy ship", () => {
  let attackResponce = easyCTest.easyAlgorithm();
  expect(attackResponce.attack).toBe("success");
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

test("Easy algorithm tries again if it hits a spot that is taken", () => {
  testEnemy.gameboard.placeShip(chineseFishBoat, coordinatesObjTest);
  easyCTest.getAlgorithm();
  for (let i = 0; i < 40; i++) {
    let attackResponce = easyCTest.algorithm();
    expect(attackResponce.attack).toBe("success");
  }
});

test("We correctly get the tile above", () => {
  expect(easyCTest.getTileAbove(0)).toBe(null);
  expect(easyCTest.getTileAbove(1)).toBe(0);
  expect(easyCTest.getTileAbove(9)).toBe(8);
});

test("We correctly get the tile below", () => {
  expect(easyCTest.getTileBelow(0)).toBe(1);
  expect(easyCTest.getTileBelow(10)).toBe(null);
  expect(easyCTest.getTileBelow(9)).toBe(10);
});

test("We correctly get tile to the left", () => {
  expect(easyCTest.getTileLeft(1)).toBe(0);
  expect(easyCTest.getTileLeft(0)).toBe(null);
  expect(easyCTest.getTileLeft(10)).toBe(9);
});

test("We correctly get tile to the right", () => {
  expect(easyCTest.getTileRight(1)).toBe(2);
  expect(easyCTest.getTileRight(0)).toBe(1);
  expect(easyCTest.getTileRight(10)).toBe(null);
});

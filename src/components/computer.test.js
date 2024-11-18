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

/* Will sometimes fail due to trailing algorithm being weak */
test("Easy algorithm tries again if it hits a spot that is taken", () => {
  testEnemy.gameboard.placeShip(chineseFishBoat, coordinatesObjTest);
  easyCTest.getAlgorithm();
  for (let i = 0; i < 40; i++) {
    let attackResponce = easyCTest.algorithm();
    expect(attackResponce.attack).toBe("success");
  }
});

test("We correctly get the tile above", () => {
  //fake trailShot to create a trailObject
  easyCTest.trailShot([6, 1]);

  expect(easyCTest.trailObject.getTileAbove(0)).toBe(null);
  expect(easyCTest.trailObject.getTileAbove(1)).toBe(0);
  expect(easyCTest.trailObject.getTileAbove(9)).toBe(8);
});

test("We correctly get the tile below", () => {
  expect(easyCTest.trailObject.getTileBelow(0)).toBe(1);
  expect(easyCTest.trailObject.getTileBelow(10)).toBe(null);
  expect(easyCTest.trailObject.getTileBelow(9)).toBe(10);
});

test("We correctly get tile to the left", () => {
  expect(easyCTest.trailObject.getTileLeft(1)).toBe(0);
  expect(easyCTest.trailObject.getTileLeft(0)).toBe(null);
  expect(easyCTest.trailObject.getTileLeft(10)).toBe(9);
});

test("We correctly get tile to the right", () => {
  expect(easyCTest.trailObject.getTileRight(1)).toBe(2);
  expect(easyCTest.trailObject.getTileRight(0)).toBe(1);
  expect(easyCTest.trailObject.getTileRight(10)).toBe(null);
});

test("We correctly get the shortest enemy ship factor", () => {
  expect(easyCTest.getShortestShipFactor()).toBe(3);
});

test("The while loop doesnt cause infinite callbacks", () => {
  //manually kill the ship
  //test if that ship is still counted
  //don't worry if there are no ships left, as that is a gameOver condition
});

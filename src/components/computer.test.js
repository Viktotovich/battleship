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
    let attackResponce = easyCTest.play();
    expect(attackResponce.attack).toBe("success");
  }
});

test("We correctly get the shortest enemy ship factor", () => {
  expect(easyCTest.getShortestShipFactor()).toBe(3);
});

test("Computer plays", () => {
  let attackResponce = easyCTest.play();
  expect(attackResponce.attack).toBe("success");
});
//Trailing algorithm removed because it's no long an integral part of computer

/* eslint-disable */
import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

const testGameboard = new Gameboard("Player");

test("The are 10 vertical arrays", () => {
  testGameboard.initialize();
  let tilesCount = 0;
  testGameboard.gameArea.forEach(() => {
    tilesCount++;
  });
  expect(tilesCount).toBe(10);
});

test("The are 10 horizontal arrays", () => {
  let tilesCount = 0;
  console.log(testGameboard.gameArea);
  testGameboard.gameArea[0].forEach(() => {
    tilesCount++;
  });
  expect(tilesCount).toBe(10);
});

let coordinatesObjTest = {
  cordStart: [0, 0],
  cordEnd: [3, 0],
  //we don't need direction as originally assumed - whoever creates the object decides
};

const destroyer = new Ship(3, "destroyer");
const chineseFishBoat = new Ship(3, "Friendly Neighborhood Fishing Boat");

test("Ships are placed", () => {
  testGameboard.placeShip(destroyer, coordinatesObjTest);
  //expect those coordinates to contain the Ship object
  expect(testGameboard[2][0]).toBe(destroyer);
});

test("Ships cannot be placed on top of each other", () => {
  expect(testGameboard.placeShip(chineseFishBoat, coordinatesObjTest)).toBe(
    Error
  );
});

test("Ships go boom", () => {
  testGameboard.receiveAttack([0, 0]);
  /*implies we want to turn hit squares into null, good idea? I don't know. Keep an eye on*/
  expect(testGameboard.gameArea[0][0]).toBe(null);
});

/* eslint-disable */
import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

const testGameboard = new Gameboard("Player");

test("The are 10 vertical arrays", () => {
  testGameboard.createBoard();
  let tilesCount = 0;
  testGameboard.board.forEach(() => {
    tilesCount++;
  });
  expect(tilesCount).toBe(10);
});

test("The are 10 horizontal arrays", () => {
  let tilesCount = 0;
  testGameboard.board[0].forEach(() => {
    tilesCount++;
  });
  expect(tilesCount).toBe(10);
});

let coordinatesObjTest = {
  xStart: 0,
  xEnd: 3,
  yStart: 0,
  yEnd: 0,
  shipDirection: "horizontal",
};

const destroyer = {
  health: 3,
  type: "destoyer",
};

const chineseFishBoat = {
  health: 3,
  type: "Friendly Neighborhood Fishing Boat",
};

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

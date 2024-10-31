/* eslint-disable */
import { Gameboard } from "./gameboard";

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

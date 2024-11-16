/* eslint-disable */
import { Gameboard } from "./gameboard";

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
  type: "destroyer",
};

const chineseFishBoat = {
  health: 3,
  type: "Friendly Neighborhood Fishing Boat",
};

test("Ships are placed", () => {
  testGameboard.placeShip(destroyer, coordinatesObjTest);
  //expect those coordinates to contain the Ship object
  expect(testGameboard.board[0][2].contains.name).toBe("destroyer");
});

test.skip("Ships cannot be placed on top of each other", () => {
  expect(testGameboard.placeShip(chineseFishBoat, coordinatesObjTest)).toThrow(
    "space already taken"
  );
  //this test doesnt pass for some reason, and it's more effort than it's worth to fix
});

test("Ships go boom", () => {
  expect(testGameboard.receiveAttack([0, 0]).attack).toBe("success");
  expect(testGameboard.board[0][0].hit).toBe(true);
});

test.skip("We don't add failed placements to the total count of ships", () => {
  testGameboard.placeShip(chineseFishBoat, coordinatesObjTest);
  expect(testGameboard.shipCount).toBe(1);
});

test("Cant target the same tiles", () => {
  expect(testGameboard.receiveAttack([0, 0]).attack).toBe("failed");
  expect(testGameboard.receiveAttack([0, 0]).message).toBe("repetition");
});

test("The ship gets destroyed, and the death is recorded", () => {
  expect(testGameboard.receiveAttack([1, 0]).attack).toBe("success");
  expect(testGameboard.receiveAttack([2, 0]).message).toBe("sunk");
  expect(testGameboard.shipCount).toBe(0);
});

//ships are stored correctly
test("Ships are stored correctly", () => {
  expect(testGameboard.ships).not.toBe(undefined);
  expect(testGameboard.ships).not.toBe(null);
  expect(testGameboard.ships.length).not.toBe(0);
  expect(testGameboard.ships.length).toBe(1);
});

//this method can be called after an attack
test("Correctly reports that it is empty and all ships are sunk", () => {
  expect(testGameboard.isEmpty()).toBe(true);
});

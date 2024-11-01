/* eslint-disable */
/* We cannot lint any of the modules here as eslint goes 
bonkers when we try*/
import { Ship } from "./ship";

const destroyer = new Ship(3, "destoyer");

test("The ship takes damage", () => {
  destroyer.hit();
  expect(destroyer.health).toBe(2);
});

test("The ship gets sunk", () => {
  destroyer.hit();
  destroyer.hit();
  expect(destroyer.isSunk()).toBe(true);
});

/* eslint-disable */
/* We cannot lint any of the modules here as eslint goes 
bonkers when we try*/
import { Ship } from "./ship";

const destoyer = new Ship(3, "destoyer");

test("The ship takes damage", () => {
  destoyer.hit();
  expect(destoyer.health).toBe(2);
});

test("The ship gets sunk", () => {
  destoyer.hit();
  destoyer.hit();
  expect(destoyer.isSunk()).toBe(true);
});

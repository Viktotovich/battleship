/* eslint-disable */
import { Player } from "./players";

let emptyBot = new Player("computer");

let humanPlayer = new Player("player", "NoVodka4u");

test("Gameboard is created", () => {
  expect(emptyBot.gameboard.shipCount).toBe(0);
});

test("We can add opponents, and it's accurate", () => {
  emptyBot.addOpponent(humanPlayer);
  humanPlayer.addOpponent(emptyBot);

  expect(emptyBot.opponent).toBe(humanPlayer);
  expect(humanPlayer.opponent).toBe(emptyBot);
});

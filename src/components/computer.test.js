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
test("Easy algorithm makes a play that attacks the enemy ship", () => {
  let attackResponce = easyCTest.easyAlgorithm();
  expect(attackResponce.attack).toBe("success");
});

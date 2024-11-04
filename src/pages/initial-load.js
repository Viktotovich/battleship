/*  Initial load page to get the user input for 

1 - name
2 - type of game (PvP or PvC)
3 - if PvC, difficulty

Nothing else matters - just to load the next page when done
 */
import { pvpScreenController } from "./pvp-screen";
import { pvcScreenController } from "./pvc-screen";

const initialPageController = {
  contentSpace: document.querySelector("#content"),
  initiate: function () {
    let title = this.createTitle();
    let form = this.createForm();

    this.contentSpace.appendChild(title);
    this.contentSpace.appendChild(form);
  },
  createForm: function () {
    const form = document.createElement("form");
    const gameTypeContainer = document.createElement("div");
    const pvpButton = document.createElement("button");
    const pvcButton = document.createElement("button");

    gameTypeContainer.classList.add("game-type-container");
    form.classList.add("game-type");
    pvpButton.classList.add("pvp");
    pvcButton.classList.add("pvc");

    pvpButton.textContent = "Play against a player";
    pvcButton.textContent = "Play against a computer";

    form.appendChild(gameTypeContainer);
    gameTypeContainer.appendChild(pvpButton);
    gameTypeContainer.appendChild(pvcButton);

    this.activateListeners(pvpButton, pvcButton);

    return form;
  },

  createTitle() {
    const titleContainer = document.createElement("div");
    const title = document.createElement("h2");
    const battleshipImage = document.createElement("div");

    title.textContent = "Play BattleShip";

    titleContainer.appendChild(title);
    titleContainer.appendChild(battleshipImage);
    return titleContainer;
  },

  activateListeners(pvpButton, pvcButton) {
    pvpButton.addEventListener("click", this.loadPVP);
    pvcButton.addEventListener("click", this.loadPVC);
  },

  loadPVP(e) {
    e.preventDefault();
    initialPageController.garbageCollect();
    pvpScreenController.initiate();
  },

  loadPVC(e) {
    e.preventDefault();
    initialPageController.garbageCollect();
    pvcScreenController.initiate();
  },

  garbageCollect() {
    this.contentSpace.textContent = "";
  },
};

export { initialPageController };

/*Lots of thinking went into deciding whether or not to use Tailwind to speed up frontend. Then I saw their playgroud, Jesus McChrist, I wouldn't touch that with a 10 feet pole lol*/

import { mainGameDisplayController } from "./main-game";

const pvpScreenController = {
  currentPlayer: 1,
  contentSpace: document.querySelector("#content"),
  modalSpace: document.querySelector("#modal-reserved-space"),
  initiate: function () {
    let title = this.createTitle();
    let form = this.createForm();

    this.contentSpace.appendChild(title);
    this.contentSpace.appendChild(form);
  },

  createTitle: function () {
    const titleContainer = document.createElement("div");
    const title = document.createElement("div");
    const rules = document.createElement("div");

    title.textContent = `Player ${this.currentPlayer}, please enter your name`;
    rules.textContent = "Click me to read a quick rule run-down";

    titleContainer.appendChild(title);
    titleContainer.appendChild(rules);

    titleContainer.classList.add("title-container");
    title.classList.add("title");
    rules.classList.add("rules");

    this.activateRulesPopup(rules);

    return titleContainer;
  },

  activateRulesPopup(rules) {
    rules.addEventListener("click", this.rulesPopup);
  },

  rulesPopup(e) {
    e.preventDefault();
    //Describe pass-n-play, add a counter for 10 seconds to switch.
    const modalSpace = pvpScreenController.modalSpace;
    const modal = document.createElement("dialog");
    const closeModal = document.createElement("div");
    const para = document.createElement("p");

    para.innerHTML =
      "Classic battleship rules. Every hit gives a player another chance at a shot. However, if a player misses: there will be a 10 second window to pass the computer to the other player. <br> <br> The first to win is the first to destroy all ships of the opposing player. Pass and play! Don't cheat, you have 10 seconds exactly for that reason.";
    closeModal.textContent = "x";

    para.classList.add("pnp-rules");
    closeModal.classList.add("close-pnp-rules");
    closeModal.addEventListener("click", modalController.closeModal);

    modalSpace.appendChild(modal);
    modal.appendChild(closeModal);
    modal.appendChild(para);

    modalController.openModal(modal);
  },

  createForm() {
    let form = document.createElement("form");
    let nameContainer = document.createElement("div");
    let nameInput = document.createElement("input");
    let submitName = document.createElement("button");

    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("id", "uname");
    nameInput.setAttribute("name", "uname");
    nameInput.setAttribute("maxlength", 30);
    nameInput.setAttribute("minlength", 2);

    submitName.textContent = `Submit Player${this.currentPlayer}'s name`;
    submitName.classList.add("submit-name");

    form.appendChild(nameContainer);
    nameContainer.appendChild(nameInput);
    nameContainer.appendChild(submitName);

    submitName.addEventListener("click", formController.processName);

    return form;
  },
  clearAll() {
    pvpScreenController.contentSpace.textContent = "";
  },
};

const modalController = {
  closeModal: function (e) {
    e.preventDefault;
    pvpScreenController.modalSpace.textContent = "";
  },
  openModal: function (modal) {
    modal.showModal();
  },
};

const formController = {
  gameInformation: {
    player1Name: "",
    player2Name: "",
    type: "pvp",
  },
  processName: function (e) {
    e.preventDefault();
    let uname = document.querySelector("#uname").value;

    if (uname == "" || uname === undefined) {
      uname = `Player${pvpScreenController.currentPlayer}`;
    }

    formController.createPlayerObj(uname);
  },

  createPlayerObj: function (uname) {
    pvpScreenController.currentPlayer === 1
      ? (formController.gameInformation.player1Name = uname)
      : (formController.gameInformation.player2Name = uname);

    pvpScreenController.currentPlayer += 1;

    if (pvpScreenController.currentPlayer > 2) {
      pvpScreenController.clearAll();
      mainGameDisplayController.initiate(formController.gameInformation);
      //take players to main-game.js
    } else {
      pvpScreenController.clearAll();
      pvpScreenController.initiate();
    }
  },
};

export { pvpScreenController };

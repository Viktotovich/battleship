import { mainGameDisplayController } from "./main-game";

const pvcScreenController = {
  contentSpace: document.querySelector("#content"),
  initiate: function () {
    let title = this.createTitle();
    let difficultyChoice = this.createDifficultyChoice();

    this.contentSpace.appendChild(title);
    this.contentSpace.appendChild(difficultyChoice);
  },
  createTitle: function () {
    const titleContainer = document.createElement("div");
    const title = document.createElement("h2");

    title.textContent = "Please select the difficulty.";

    titleContainer.appendChild(title);

    return titleContainer;
  },
  createDifficultyChoice: function () {
    const buttonContainer = document.createElement("div");
    const easyDifficulty = document.createElement("button");
    const mediumDifficulty = document.createElement("button");
    const hardDifficulty = document.createElement("button");

    buttonContainer.classList.add("difficulty-buttons");
    easyDifficulty.classList.add("difficulty-select");
    mediumDifficulty.classList.add("difficulty-select");
    hardDifficulty.classList.add("difficulty-select");

    buttonContainer.appendChild(easyDifficulty);
    buttonContainer.appendChild(mediumDifficulty);
    buttonContainer.appendChild(hardDifficulty);

    easyDifficulty.textContent = "Easy";
    mediumDifficulty.textContent = "Medium (Under works)";
    hardDifficulty.textContent = "⚠️Hard⚠️ (Under works)";

    mediumDifficulty.setAttribute("disabled", "");
    hardDifficulty.setAttribute("disabled", "");

    easyDifficulty.addEventListener("click", difficultyController.callEasy);
    mediumDifficulty.addEventListener("click", difficultyController.callNormal);
    hardDifficulty.addEventListener("click", difficultyController.callHard);

    return buttonContainer;
  },
  clearAll: function () {
    pvcScreenController.contentSpace.textContent = "";
  },
};

const difficultyController = {
  callEasy: function (e) {
    e.preventDefault();
    gameInformation.cDifficulty = "easy";
    pvcScreenController.clearAll();
    nameFormController.initiate();
  },
  callNormal: function (e) {
    e.preventDefault();
    gameInformation.cDifficulty = "medium";
    pvcScreenController.clearAll();
    nameFormController.initiate();
  },
  callHard: function (e) {
    e.preventDefault();
    gameInformation.cDifficulty = "hard";
    pvcScreenController.clearAll();
    nameFormController.initiate();
  },
};

const nameFormController = {
  contentSpace: document.querySelector("#content"),
  initiate: function () {
    let title = this.createTitle();
    let nameForm = this.createForm();

    this.contentSpace.appendChild(title);
    this.contentSpace.appendChild(nameForm);
  },
  createForm: function () {
    let form = document.createElement("form");
    let nameContainer = document.createElement("div");
    let nameInput = document.createElement("input");
    let submitName = document.createElement("button");

    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("id", "uname");
    nameInput.setAttribute("name", "uname");
    nameInput.setAttribute("maxlength", 30);
    nameInput.setAttribute("minlength", 2);

    submitName.textContent = `Submit your name`;
    submitName.classList.add("submit-name");

    form.appendChild(nameContainer);
    nameContainer.appendChild(nameInput);
    nameContainer.appendChild(submitName);

    submitName.addEventListener("click", nameFormController.processName);

    return form;
  },
  createTitle: function () {
    const title = document.createElement("div");

    title.textContent = `Player 1, please enter your name`;

    title.classList.add("title");

    return title;
  },
  processName: function (e) {
    e.preventDefault();
    let uname = document.querySelector("#uname").value;

    if (uname == "" || uname === undefined) {
      uname = `Player1`;
    }

    gameInformation.player1Name = uname;
    pvcScreenController.clearAll();
    mainGameDisplayController.initiate(gameInformation);
  },
};

const gameInformation = {
  player1Name: "",
  type: "pvc",
  cDifficulty: "",
};

export { pvcScreenController };

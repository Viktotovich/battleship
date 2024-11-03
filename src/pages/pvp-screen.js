const pvpScreenController = {
  gameInformation: {
    name: "",
    type: "",
  },
  currentPlayer: 1,
  contentSpace: document.querySelector("#content"),
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

    title.textContent = `${this.currentPlayer}, please enter your name`;
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
    const modal = document.createElement("dialog");
    //continue here
  },

  createForm() {
    let form = document.createElement("form");
    let nameContainer = document.createElement("div");
    let nameInput = document.createElement("input");
    let submitName = document.createElement("button");

    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("id", "uname");
    nameInput.setAttribute("name", "uname");

    submitName.textContent = `Submit ${this.currentPlayer}'s name`;
    submitName.classList.add("submit-name");

    form.appendChild(nameContainer);
    nameContainer.appendChild(nameInput);
    nameContainer.appendChild(submitName);

    return form;
  },
};

export { pvpScreenController };

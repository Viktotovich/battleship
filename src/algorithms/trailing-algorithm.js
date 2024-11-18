/* Refer to notebook, simple algorithm:
    x changes twice, stays same twice. Change is +/- 1 x
    y changes twice, stays same twice. Change is +/- 1 y
*/

const trailingAlgorithm = {
  trailedCords: null,
  trailing: true,
  trailingData: [],
  actionList: [],
  initiate: function (cords) {
    this.trailedCords = cords;
    return; //I forgot what we wanted to return, but we need to return something important. Inspect previous implementation to understand
  },
  createActionList: function () {
    this.actionList.push(
      this.getTileAbove,
      this.getTileBelow,
      this.getTileLeft,
      this.getTileRight
    );
  },
  randomizeAction: function () {
    let factor = this.actionList.length;
    let randomNumber = Math.round(Math.random * 10);
    let randomPossibleIndex = randomNumber % factor;
    return randomPossibleIndex;
  },
  continueTrailing: function () {
    //check already hit angles
  },
  getTileAbove: function (num) {
    return num > 0 ? num - 1 : null;
  },
  getTileBelow: function (num) {
    return num < 10 ? num + 1 : null;
  },
  getTileLeft: function (num) {
    return num > 0 ? num - 1 : null;
  },
  getTileRight: function (num) {
    return num < 10 ? num + 1 : null;
  },
  findTrail: function () {
    //if left or right hit = trailing horizontal. If up or down == trail up or down
    //if not a success, pop actionList
    return this.trailedCords; //up down left right CHANGE
  },
  stop: function () {
    this.trailedCords = null;
    this.trailing = false;
    this.trailedData = [];
    this.createActionList();
  },
};

export { trailingAlgorithm };

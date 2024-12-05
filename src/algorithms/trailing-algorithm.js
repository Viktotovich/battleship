/*Algorithm defunct, the time it would take to
implement and use this would be far too much. I want to 
include this badly, and this is a tough decision for me.

This is axed, but if anyone wants to ever implement it,
please do take inspiration, or feel free to use the below
starting point.

I wanted to make it work, but having very limited time
makes it an astronomically difficult task.
*/

const trailingAlgorithm = {
  trailedCords: null,
  initialHit: null,
  trailing: false,
  trailingData: [],
  actionList: [], //typescript called this the never type, wtf? TODO
  initiate: function (cords) {
    this.trailedCords = cords;
    this.initialHit = cords;
    this.trailing = true;
    this.trailingData.push(cords);
    this.createActionList();

    return this.continueTrailing();
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
    let randomNumber = Math.round(Math.random() * 10);
    let randomPossibleIndex = randomNumber % factor;
    let action = this.actionList[randomPossibleIndex];
    this.actionList.splice(randomPossibleIndex, 1);

    return action;
  },
  continueTrailing: function () {
    let [x, y] = this.trailedCords;
    let action = this.randomizeAction();

    return {
      newCords: action(x, y),
      lastAction: action,
    };
  },
  getTileAbove: function (x, y) {
    return y > 0 ? [x, y - 1] : null;
  },
  getTileBelow: function (x, y) {
    return y < 10 ? [x, y + 1] : null;
  },
  getTileLeft: function (x, y) {
    return x > 0 ? [x - 1, y] : null;
  },
  getTileRight: function (x, y) {
    return x < 10 ? [x + 1, y] : null;
  },
  stop: function () {
    this.trailedCords = null;
    this.initialHit = null;
    this.trailing = false;
    this.trailingData = [];
    this.actionList = [];
  },
};

export { trailingAlgorithm };

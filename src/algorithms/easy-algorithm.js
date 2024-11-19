const easyAlgorithm = {
  getRandomCord: function () {
    let x = Math.round(Math.random() * 9);
    let y = Math.round(Math.random() * 9);

    return [x, y];
  },
  play: function () {
    return easyAlgorithm.getRandomCord();
  },
};

export { easyAlgorithm };

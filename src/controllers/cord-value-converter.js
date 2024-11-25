const cordConverter = {
  flattenCords: function (x, y) {
    let index = x + y * 10;
    return index;
  },
  unpackCords: function (index) {
    //10's are Y pos
    // 1's are X pos
    if (index < 10) {
      return [index, 0]; //height is 0, less than 10
    } else {
      console.log(index);
      return [index[1], index[0]];
    }
  },
};

export { cordConverter };

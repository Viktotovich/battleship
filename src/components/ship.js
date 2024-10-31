class Ship {
  constructor(length, name) {
    this.length = length;
    this.name = name;
    this.health = length;
  }

  hit() {
    this.health -= 1;
  }

  isSunk() {
    if (this.health === 0) {
      return true;
    } else {
      return false;
    }
  }
}

export { Ship };

//To speed up cord look-up on board-randomizer

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    //bingo bango bongo, the dupes are gongo
    this.root = this.buildTree(arr);
  }

  //redundant-ish for our use-case
  buildTree(arr, startIndex = 0, endIndex = arr.length - 1) {
    if (startIndex > endIndex) {
      return null;
    }

    let midIndex = Math.floor((startIndex + endIndex) / 2);
    let root = new Node(arr[midIndex]);

    root.left = this.buildTree(arr, startIndex, midIndex - 1);
    root.right = this.buildTree(arr, midIndex + 1, endIndex);

    return root;
  }

  insert(value) {
    //create a new node if value isn't already in the array
    let currentNode = this.root;
    let previousNode;

    while (currentNode !== null) {
      if (value === currentNode.value) {
        return;
      }

      if (value > currentNode.value) {
        previousNode = currentNode;
        currentNode = currentNode.right;
      } else {
        previousNode = currentNode;
        currentNode = currentNode.left;
      }
    }

    let newValue = new Node(value);

    value > previousNode.value
      ? (previousNode.right = newValue)
      : (previousNode.left = newValue);
  }

  bstContains(value, currentNode = this.root) {
    if (currentNode === null) {
      return false;
    }

    if (value === currentNode.value) {
      return true;
    } else if (value > currentNode.value) {
      return this.bstContains(value, currentNode.right);
    } else {
      return this.bstContains(value, currentNode.left);
    }
  }
}

export { Tree };

/* 
Bad implementation: infinite recursion:

  bstContains(value) {
    if (value === null) {
      return false;
    } else if (value === this.root) {
      return true;
    } else if (value > this.root) {
      return this.bstContains(this.root.right);
    } else if (value < this.root) {
      return this.bstContains(this.root.left);
    } else {
      throw new Error("Kaboom");
    }
  }
*/

const dragHandler = {
  draggedDOM: null,
  initiate: function () {
    let unselectedTiles = document.querySelectorAll(".available");
    this.enableDrag(unselectedTiles);
  },
  enableDrag: function (tiles) {
    tiles.forEach((tile) => {
      tile.addEventListener("dragenter", (event) => {
        event.preventDefault();
        if (event.target.classList.contains("available")) {
          event.target.classList.add("dragover");
          dragHandler.draggedDOM = event.target;
        }
      });

      tile.addEventListener("dragover", (event) => {
        event.preventDefault();
      });

      tile.addEventListener("dragleave", (event) => {
        if (event.target.classList.contains("available")) {
          event.target.classList.remove("dragover");
        }
      });
    });
  },
  enableErrorDisplay: function (tiles) {
    tiles.forEach((tile) => {
      //show red if spot taken
    });
  },
};

export { dragHandler };
/*
Mid way through working on drag-n-drop I have realized something. 
Doing just a drag and drop won't work, I need to "send" ships to 
drag-n-drop or maintain some sort of order, and remove the ships from display
one by one*/

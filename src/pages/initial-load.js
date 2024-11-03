/*  Initial load page to get the user input for 

1 - name
2 - type of game (PvP or PvC)
3 - if PvC, difficulty

Nothing else matters - just to load the next page when done
 */

const initialPage = {
  contentSpace: document.querySelector("#content"),
  initiate: function () {
    this.buildContent();
  },
  buildContent: function () {
    //
  },
};

export { initialPage };

/*Lots of thinking went into deciding whether or not to use Tailwind to speed up frontend. Then I saw their playgroud, Jesus McChrist, I wouldn't touch that with a 10 feet pole lol*/

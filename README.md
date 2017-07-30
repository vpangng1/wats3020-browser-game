# WATS 3020 Browser Game Project

This project is designed to practice event handling in the context of a modern
JavaScript web application.

To complete this project, you will build a working Tic Tac Toe game. Some pieces
have been provided for you in order to allow you to focus on the events, event
listeners, and the way logic is executed in response to system events.

**Note:** In this game you have been given the Bootstrap framework to use. This
includes jQuery as a dependency. You are free to use Bootstrap CSS components as
much as you wish (grid, buttons, etc.), but avoid using jQuery or Bootstrap
JavaScript components when completing the Basic Requirements.

## Some Notes on Architecture

This is the most complex of all of our project so far. But if we break it down
to the basic functions, we can see that this project is really made up of a few
straightforward pieces.

The primary component of this game is the `TicTacToe` class. This class handles
all of the game mechanics, controls the game board, and generally provides most
of the logic for our page. The `TicTacToe` class has `player1` and `player2`
properties, which refer to `Player` class objects. These two classes make up
the entire logic of the game itself.

Outside of the class structure, there are a few event listeners to watch for
game-wide events. The first listener looks for the `DOMContentLoaded` event,
which tells the program that it's safe to run the game. The other listeners
are watching for `win` and `draw` events in order to provide a game end screen.

Finally, there is a `handleMove()` function that is used by the listeners we
apply to the game tiles. This function calls a set of methods on the `TicTacToe`
class instance. These are the steps to process each individual player move.

Note that the logic included outside of the class structures is simple and
refers to the "interface" we've created through our design of the classes. Also
note that we use multiple event listeners to respond to different things that
happen throughout the game. This is an event-driven architecture, meaning that
the event signals are what make each part of the game happen. Without them, our
game would never "do" anything.

## Basic Requirements

In order to complete this project you will need to fulfill these requirements:

* Create a `Player` class that accepts an `icon` parameter in the `constructor()`.
* Complete the creation of a `TicTacToe` class to handle the primary game functions.
    * Set up the game board using DOM manipulation commands.
    * Initialize values to count moves and track game status (playing, won, draw).
    * Add event listeners to game tiles to handle player interaction.
    * Create methods to handle game logic including recording moves, switching
      players, etc.
* Allow the player to begin a game by clicking the "Start Game" button.
* Add event listeners to the `document` object to handle "win" and "draw" events.

## Stretch Goals

If you complete the requirements above, try these stretch goals to make the
project more interesting and personal. (Feel free to use Bootstrap or jQuery
JavaScript components to make these stretch goals more interesting if you
prefer.)

* Re-style the game so it fits your design concept.
* Currently, when the user clicks "Play again", the game reloads the HTML page
  reset itself. It would be better if the game were reset using JavaScript.
  Create an event listener that would respond to the "play again" button click
  event to reset and restart the game using only JavaScript commands (so the browser does
  not need to reload the page).
* Create a "call draw" button that shows during each player's turn. If the
  players realize the game is going to be a draw, they can click the button to
  call the game as a draw and start a new one.
* Create a "coin flip" feature that randomly determines which player will start
  each game.
* **Advanced** Enhance the logic in the `checkForWinner()` method to determine if there are
  no possible winning moves. If not, call the game as a draw (without the need
  for the players to click a "call draw" button).
* **Advanced** Add a player profile form that can collect information from the
  player to customize the game. They could enter a `name` and select an `icon`
  preference from existing Glyphicons (already included and used in the game).


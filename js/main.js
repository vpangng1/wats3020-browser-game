/* WATS 3020 Browser Game project */
/* Build a tic tac toe game for two players. */

// Player Class
class Player {
    constructor(token){
        this.token = token;
    }
}

// Tic Tac Toe Game Class
class TicTacToe {
    constructor(){
        // logic to execute upon creation of a new class instance

        // Create Player class instances
        this.player1 = new Player('heart');
        this.player2 = new Player('star');

        this.currentPlayer = null;
        this.gameStatus = null;
        this.winner = null;
        this.moveCount = 0;

        // Grab DOM elements used during play.
        this.startPrompt = document.querySelector('#start-prompt');
        this.movePrompt = document.querySelector('#move-prompt');
        this.currentPlayerIcon = document.querySelector('.player-icon');
        this.gameboard = document.querySelector('#gameboard');
        this.winScreen = document.querySelector('#win-screen');
        this.winnerIcon = document.querySelector('#winner-icon');

        this.drawScreen = document.querySelector('#draw-screen');

        // Initialize an Array representing the board
        this.gameState = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];

        // Store Array of Win States
        this.winStates = [
          [[0,0],[0,1],[0,2]],
          [[1,0],[1,1],[1,2]],
          [[2,0],[2,1],[2,2]],
          [[0,0],[1,0],[2,0]],
          [[0,1],[1,1],[2,1]],
          [[0,2],[1,2],[2,2]],
          [[0,0],[1,1],[2,2]],
          [[0,2],[1,1],[2,0]]
        ];
    }
    checkForWinner(){
        for (let condition of this.winStates){
            let winningCondition = true;
            for (let position of condition){
                if (this.gameState[position[0]][position[1]] != this.currentPlayer.token) {
                    winningCondition = false;
                }
            }
            if (winningCondition) {
                console.log('We have a winner!');
                console.log(`Condition is: ${condition}`);
                this.gameStatus = 'won';
                this.winner = this.currentPlayer;

                // Dispatch a win event
                let winEvent = new Event('win');
                document.dispatchEvent(winEvent);

                return true; // Return a value to stop processing the additional move count check.
            }
        }
        this.moveCount++;
        console.log(`Reviewed move ${this.moveCount}.`)
        if (this.moveCount >= 9) {
            let drawEvent = new Event('draw');
            document.dispatchEvent(drawEvent);
        }
    }
    recordMove(event){
        let tile_x = event.target.dataset.x;
        let tile_y = event.target.dataset.y;
        this.gameState[tile_x][tile_y] = this.currentPlayer.token;

        event.target.setAttribute('class', `tile played glyphicon glyphicon-${this.currentPlayer.token}`);
    }
    switchPlayer(){
        if (this.currentPlayer === this.player1) {
            this.currentPlayer = this.player2;
        } else {
            this.currentPlayer = this.player1;
        }
        this.currentPlayerIcon.setAttribute('class', `player-icon glyphicon glyphicon-${this.currentPlayer.token}`);
    }
    setUpTileListeners(){
        // Set up event listeners for tiles
        let tileElements = document.querySelectorAll('.tile');
        for (let tile of tileElements) {
            tile.addEventListener('click', handleMove);
        }
    }
    showWinScreen(){
        // Display end game shim
        this.winScreen.setAttribute('class', 'show');
        this.winnerIcon.setAttribute('class', `glyphicon glyphicon-${this.winner.token}`);
    }
    showDrawScreen(){
        // Display end game shim
        this.drawScreen.setAttribute('class', 'show');
    }
    setUpBoard(){
        // Clear existing gameboard
        this.gameboard.innerHTML = '';

        for (let i=0; i<3; i++){
            // Create a new row of the game
            let newRow = document.createElement('div')
            newRow.setAttribute('class', 'row');

            // create columns in each row
            for (let j=0; j<3; j++){
                let newCol = document.createElement('div');
                newCol.setAttribute('class', 'col-xs-3');
                let newTile = document.createElement('span');
                newTile.setAttribute('class', 'tile glyphicon glyphicon-question-sign');

                newTile.dataset.x = i;
                newTile.dataset.y = j;

                newCol.appendChild(newTile);
                newRow.appendChild(newCol)
            }
            this.gameboard.appendChild(newRow);
        }

        this.setUpTileListeners();

    }
    initializeMovePrompt(){
        // hide startPrompt
        this.startPrompt.setAttribute('class', 'hidden');
        // remove `hidden` class
        this.movePrompt.setAttribute('class', '');
        this.currentPlayer = this.player1;
    }
    start(){
        // Method that begins a new game.
        // Establish a new board
        this.setUpBoard();

        // Initialize the Move Prompt
        this.initializeMovePrompt();

    }
}
// External function for event listeners
function handleMove(event){
    // record click for currentPlayer
    game.recordMove(event);

    // check for a winner
    game.checkForWinner();

    // switch players
    game.switchPlayer();
}

// Start the game
document.addEventListener('DOMContentLoaded', function(event){
    let startButton = document.querySelector('#start-button');
    startButton.addEventListener('click', function(event){
        game = new TicTacToe();
        game.start();
    });
})
document.addEventListener('win', function(event){
    game.showWinScreen();
});

document.addEventListener('draw', function(event){
    game.showDrawScreen();
});

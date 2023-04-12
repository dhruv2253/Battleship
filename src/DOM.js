
import Gameboard from "./gameboard";
import Player from "./player";
import Ship from "./ship";

const rotateButton = document.querySelector('.rotate');
const newGameButton = document.querySelector('.new-game');
const userBoard = document.querySelector('.user-board');
const aiBoard = document.querySelector('.ai-board');
const status = document.querySelector('.status');

const createGame = function () {

    // initialize players 
    const user = new Player();
    const ai = new Player();

    // set opponents 
    user.opp = ai;
    ai.opp = user;

    // keep track of whose turn it is
    let whoseTurn = user;

    // ships to be placed on board
    const ships = [Ship[5], Ship[4], Ship[3]];



    
    // Function that creates the user board and fills with squares containing datasets
    const createUserBoard = function () {
        for (let rows = 0; rows< user.gameboard.board.length; rows++) {
            for (let cols = 0; cols< user.gameboard.board[rows].length; cols++) {
                // create div square
                const gridSquare = document.createElement('div');
                gridSquare.classList.add('grid-square');

                // set data of grid squares to be equal to the (row, col)
                gridSquare.dataset.x = cols;
                gridSquare.dataset.y = rows;
                gridSquare.textContent = `${cols}, ${rows}`
                userBoard.appendChild(gridSquare);
            }
        }
    }

    // Function that creates the ai board and fills with squares containing datasets
    const createAiBoard = function () {
        for (let rows = 0; rows< ai.gameboard.board.length; rows++) {
            for (let cols = 0; cols< ai.gameboard.board[rows].length; cols++) {
                // create div square
                const aiGridSquare = document.createElement('div');
                aiGridSquare.classList.add('ai-grid-square');

                // set data of grid squares to be equal to the (row, col)
                aiGridSquare.dataset.x = cols;
                aiGridSquare.dataset.y = rows;
                aiGridSquare.textContent = `${cols}, ${rows}`

                aiBoard.appendChild(aiGridSquare);
            }
        }
    }

    // Place ai ships onto board at set location
    const placeAiShips = function() {
    
        const aiShip1 = new Ship(3);
        const aiShip2 = new Ship(4);
        const aiShip3 = new Ship(5);

        ai.gameboard.placeShip(0,0, aiShip1);
        ai.gameboard.placeShip(2,4, aiShip2);
        ai.gameboard.placeShip(5,0, aiShip3, true);

        // render ships at locations
        renderShips(ai);
    }


    // render ships onto board
    const renderShips = function(player) {

        // select which player's squares to render
        let squares;
        if (player == user) {
             squares = document.querySelectorAll('.grid-square');
        } else {
            squares = document.querySelectorAll('.ai-grid-square');
        }

        // add classes to squares based on what they contain
        squares.forEach(square => {
            // coordinate of square related to gameboard
            let squareStatus = player.gameboard.board[parseInt(square.dataset.x)][parseInt(square.dataset.y)];

            // add ship class to square if square is null
            if (squareStatus.ship != null) {
                square.classList.add('ship');

                // if there is a ship at the location and location has already been tried, add "damaged" class
                if (squareStatus.triedHit) {
                    square.classList.remove('ship');
                    square.classList.add('damaged');
                }
            }
            else {
                // square has nothing but a triedHit, add "miss" class to square
                if (squareStatus.triedHit) {
                    square.classList.add('miss');
                }
            }
        })

    }


    

    


    return {createUserBoard, createAiBoard, renderShips, placeAiShips}
}


export default createGame;
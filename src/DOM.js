
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
                const gridSquare = document.createElement('div');
                gridSquare.classList.add('grid-square');

                // set data of grid squares to be equal to the (row, col)
                gridSquare.dataset.x = cols;
                gridSquare.dataset.y = rows;
                gridSquare.textContent = `${cols}, ${rows}`

                aiBoard.appendChild(gridSquare);
            }
        }
    }

    


    return {createUserBoard, createAiBoard}
}


export default createGame;
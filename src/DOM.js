
import Gameboard from "./gameboard";
import Player from "./player";
import Ship from "./ship";

const rotateButton = document.querySelector('.rotate');
const newGameButton = document.querySelector('.new-game');
const userBoard = document.querySelector('.user-board');
const aiBoard = document.querySelector('.ai-board');
const status = document.querySelector('.status');

const createGame = function () {

    const user = new Player();
    const ai = new Player();
    user.opp = ai;
    ai.opp = user;
    let whoseTurn = user;

    const ships = [Ship[5], Ship[4], Ship[3]];



    
    const createUserBoard = function () {
        for (let rows = 0; rows< user.gameboard.board.length; rows++) {
            for (let cols = 0; cols< user.gameboard.board[rows].length; cols++) {
                const gridSquare = document.createElement('div');
                userBoard.classList.add('grid-square');
                gridSquare.dataset.x = cols;
                gridSquare.dataset.y = rows;
                userBoard.append(gridSquare);
            }
        }
    }

    return {createUserBoard}
}


export default createGame;
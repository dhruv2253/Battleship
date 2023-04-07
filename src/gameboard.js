import Ship from './ship.js'

// check if board cell is empty or has ship
const cellContent = function() {
    let ship = null;
    let triedHit = false;

    {return ship, triedHit}
}


const Gameboard = function() {
    // initialize board
    const initialize = function(size) {
        let board = [];

        for (let i = 0; i < size; i++) {
            board[i] = [];
            for (let j = 0; j < size; j++) {
                board[i][j] = null;
            }
        }
        return board;
    }

    // board
    
        
    // receive attack func
        // keep track of missed


    // all ships sunk check


    return {board, initialize, placeShip, cellContent}

}

export default Gameboard;
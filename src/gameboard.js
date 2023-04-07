import Ship from './ship.js'

// check if board cell is empty or has ship
const cellContent = function(x, y) {
    let ship = null;
    let triedHit = false;

    {return ship, triedHit}
}


const Gameboard = function() {
    // initialize board
    const initialize = function(size) {
        let board = [];

        // make board grid
        for (let i = 0; i < size; i++) {
            board[i] = [];
            for (let j = 0; j < size; j++) {
                board[i][j] = null;
            }
        }
        return board;
    }

    // board
    let board = initialize(7);

    // store how many ships are on the board
    let shipsOnBoard = [];

    // place ships onto board
    const placeShip = function(x, y, newShip) {

        // coordinates of ship to place
        let startOfShip = [x,y];

        if (x + newShip.length-1 >= 7) {
            startOfShip = [7-newShip.length, y];
        }
        

        let shipStartX = startOfShip[0];
        let shipStartY = startOfShip[1];

        // check overlapping 
        for (let i = 0; i < newShip.length; i++) {
            const cell = cellContent(shipStartX + i, shipStartY);
            if (cell.ship) {
                return false;
            }
        }
        

                // set ship property of each cell to the newShip object
        for (let i = 0; i < newShip.length; i++) {
            const cell = cellContent(shipStartX + i, shipStartY);
            cell.ship = newShip;
        }

        shipsOnBoard.push(newShip);
        return true;
        
        
        




    }
        
    // receive attack func
        // keep track of missed


    // all ships sunk check


    return {board, initialize, placeShip, cellContent, shipsOnBoard}

}

export default Gameboard;
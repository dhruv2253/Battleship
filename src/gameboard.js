import Ship from './ship.js'

// check if board cell is empty or has ship
const cellContent = function() {
    let ship = null;
    let triedHit = false;

    return{ ship, triedHit}
}


const Gameboard = function() {
    // initialize board
    const initialize = function(size) {
        let grid = [];

        // make board grid
        for (let i = 0; i < size; i++) {
            grid[i] = [];
            for (let j = 0; j < size; j++) {
                grid[i][j] = cellContent();
            }
        }
        return grid;
    }

    // board
    let board = initialize(7);

    // store how many ships are on the board
    let shipsOnBoard = [];

    // place ships onto board
    const placeShip = function(x, y, newShip, vertical=false) {

        // coordinates of ship to place
        let startOfShip = [x,y];
       
        if (vertical === false) {
            if (x + newShip.length-1 >= 7) {
                startOfShip = [7-newShip.length, y];
            }
            
    
            let shipStartX = startOfShip[0];
            let shipStartY = startOfShip[1];
    
            // check overlapping 
            for (let i = 0; i < newShip.length; i++) {
                if (board[shipStartX + i][shipStartY].ship) {
                    return false;
                }
            }
            
            
    
            shipsOnBoard.push(newShip);
            for (let i = 0; i < newShip.length; i++) {
                board[shipStartX + i][shipStartY].ship = newShip;
            }
            
        } else {
            if (y + newShip.length-1 >= 7) {
                startOfShip = [x, 7-newShip.length];
            }

            let shipStartX = startOfShip[0];
            let shipStartY = startOfShip[1];

            // check overlapping 
            for (let i = 0; i < newShip.length; i++) {
                if (board[shipStartY+i][shipStartX].ship) {
                    return false;
                }
            }
            
            shipsOnBoard.push(newShip);

            for (let i = 0; i < newShip.length; i++) {
                board[shipStartY+i][shipStartX].ship = newShip;
            }

            

        }
        

        return true;


    }
        
    // receive attack func
        // keep track of missed


    // all ships sunk check


    return {board, placeShip, shipsOnBoard}

}

export default Gameboard;
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
       
        // if ship placement is set to horizontal
        if (vertical === false) {

            // check if the ship being placed will fit on the board horizontally.
            if (x + newShip.length-1 >= 7) {
                startOfShip = [7-newShip.length, y];
            }
            
            // starting x and y of ship
            let shipStartX = startOfShip[0];
            let shipStartY = startOfShip[1];
    
            // check overlapping 
            for (let i = 0; i < newShip.length; i++) {
                if (board[shipStartX + i][shipStartY].ship) {
                    return false;
                }
            }
            
            
            // push ship to the ships on board arr
            shipsOnBoard.push(newShip);

            // add ship to coordinate
            for (let i = 0; i < newShip.length; i++) {
                board[shipStartX + i][shipStartY].ship = newShip;
            }
            
            // if set to vertical
        } else {
            // make sure ship to add fits onto board vertically
            if (y + newShip.length-1 >= 7) {
                startOfShip = [x, 7-newShip.length];
            }


            // coords
            let shipStartX = startOfShip[0];
            let shipStartY = startOfShip[1];

            // check overlapping 
            for (let i = 0; i < newShip.length; i++) {
                if (board[shipStartY+i][shipStartX].ship) {
                    return false;
                }
            }
            
            // push to array
            shipsOnBoard.push(newShip);

        
            // add ship to coord
            for (let i = 0; i < newShip.length; i++) {
                board[shipStartY+i][shipStartX].ship = newShip;
            }

            

        }
        

        return true;


    }
        
    // receive attack func
    const receiveAttack = function(x, y) {
        // location of the attack
        let attack = board[x][y];

        // if the location is already tried, return false
        if (attack.triedHit) {
            return false;
        }

        // if it was not tried, return true now that it has been attacked
        attack.triedHit = true;

        // if there is a ship at the location, hit it
        if(attack.ship !== null) {
            // hit ship
            attack.ship.hit();
         
        }

        return true;
    }
    

    // all ships sunk check
    const allSunk = function() {
        return shipsOnBoard.every(ship => ship.isSunk());
    }


    return {board, placeShip, shipsOnBoard, receiveAttack, allSunk}

}

export default Gameboard;

import Gameboard from "./gameboard";
import Player from "./player";
import Ship from "./ship";

const rotateButton = document.querySelector('.rotate');
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
    const ships = [Ship(5), Ship(4), Ship(3)];

    // access a ship in ships at shipNum as index
    let shipNum = 0;

    // rotation
    let vertical = false;



    
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
                

                aiBoard.appendChild(aiGridSquare);
            }
        }
    }

    // Place ai ships onto board at set location
    const placeAiShips = function() {
    
        // create ships
        const aiShip1 = new Ship(3);
        const aiShip2 = new Ship(4);
        const aiShip3 = new Ship(5);

        // place ships
        ai.gameboard.placeShip(0,0, aiShip1);
        ai.gameboard.placeShip(1,4, aiShip2);
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

    const AiTurn = function() {
        // if turn is users, ignore
        if (whoseTurn == user) {
            return;
        }

        // attack
        ai.aiAttack();

        // rerender ships after attacking
        renderShips(user);

        // if all user ships sunk, computer wins
        if (user.gameboard.allSunk()) {
            status.textContent = "Computer Wins!";
            // end game method
            endGame(ai);
        }

        // change turn
        whoseTurn = user;

    }

    // user attack 
    const userAttack = function(player) {
        // set opponent to player opponent
        const opponent = player.opp;
        
        // if opponent is user, select users squares, else ai's squares
        const oppSquare = opponent == user? '.grid-square': '.ai-grid-square';
        const squares = document.querySelectorAll(oppSquare);
        
        squares.forEach(square => {
            square.addEventListener('click', () => {
                // if opponents turn do nothing
                if (whoseTurn === opponent) {
                    return;
                }

                // attack
                let attack = player.attack(parseInt(square.dataset.x), parseInt(square.dataset.y));
               
                // attack hits ship
                if (attack && opponent.gameboard.board[parseInt(square.dataset.x)][parseInt(square.dataset.y)].ship !== null) {
                    status.textContent = 'Ship hit!';

                    // if all ships are sunk, end game
                    if (opponent.gameboard.allSunk()) {
                        status.textContent = 'You win!';
                        endGame(user);
                    }
                }
                //attack and there is no hit
                else if (attack) {
                    status.textContent = 'Miss!';
                }
                else {
                    // attack is at a spot that has already taken a hit
                    status.textContent = 'Already hit, try again';
                }

                // rerender opponents board
                renderShips(opponent);

                // switch turns
                if (attack === true) {
                    whoseTurn = opponent;   
                } 

            })
        })
    }


    // Method for displaying who won
    const endGame = function(win) {
        
        status.textContent = win===user? 'You won!' : "You lost!";
        const squares = document.querySelectorAll('.grid-square');

        // remove event listeners from the board since game is over
        squares.forEach(square => {
            square.removeEventListener('mouseover', shipHover);
            square.removeEventListener('click', placeShip);
        });

    }
    
    const shipHover = function(e) {

        // length of ship using the array of ships that are going to be added to board
        let l = ships[shipNum].length;

        const squares = document.querySelectorAll('.grid-square');

        // get start of ship coordinates
        let x = parseInt(e.target.dataset.x);
        let y = parseInt(e.target.dataset.y);
        let startOfShip = [x,y];

        // if ship placement is set to horizontal
        if (vertical === false) {

            // check if the ship being placed will fit on the board horizontally.
            if (x + l -1 >= 7) {
                startOfShip = [7-l, y];
            }
            
            // starting x and y of ship
            let shipStartX = startOfShip[0];
            let shipStartY = startOfShip[1];
    
            // check overlapping 
            for (let i = 0; i < l; i++) {
                if (user.gameboard.board[shipStartX + i][shipStartY].ship) {
                    e.target.classList.add('invalid');
                    e.target.addEventListener('mouseout', () => {
                        e.target.classList.remove('invalid');
                    })
                    return;
                }
            }


            // Create a set of placeables to be added and removed from based on where the mouse is 
            let placeables = new Set();

            for (let i = 0; i < l; i++) {
                squares.forEach(square => { 

                    // add to placeables
                    if (square.dataset.x === (shipStartX + i)+"" && square.dataset.y === (shipStartY)+"") {
                        square.classList.add('placeable');
                        placeables.add(square);
                    }

                    
                // remove from placeables and remove placeable class from square
                    e.target.addEventListener('mouseout', () => {
                        placeables.forEach(square => {
                            placeables.delete(square);
                            square.classList.remove('placeable');
                        })
                    })
                })
                
            }
            return;
        } 
        
        // when ship is vertical

        // make sure ship to add fits onto board vertically
        if (y + l-1 >= 7) {
            startOfShip = [x, 7-l];
        }

        // coords
        let shipStartX = startOfShip[0];
        let shipStartY = startOfShip[1];

        // check overlapping 
        for (let i = 0; i < l; i++) {
            if (user.gameboard.board[shipStartX][shipStartY+i].ship) {
                e.target.classList.add('invalid');
                    e.target.addEventListener('mouseout', () => {
                        e.target.classList.remove('invalid');
                    })
                    return;
            }
        }

        // Create a set of placeables to be added and removed from based on where the mouse is 
        let placeables = new Set();
        for (let i = 0; i < l; i++) {
            squares.forEach(square => { 

                // add to placeables
                if (square.dataset.x === (shipStartX)+"" && square.dataset.y === (shipStartY + i)+"") {
                    square.classList.add('placeable');
                    placeables.add(square);
                }

                // remove from placeables and remove placeable class from square
                e.target.addEventListener('mouseout', () => {
                    placeables.forEach(square => {
                        placeables.delete(square);
                        square.classList.remove('placeable');
                    })
                })
            })
            
        }
        return;

    }

    // Place ship on board
    const placeShip = function(e) {
        // if coord is invalid do not place
        if (e.target.classList.contains('invalid')) {
            return;
        }

        // set ship to place
        let ship = ships[shipNum];

        // place ship
        user.gameboard.placeShip(parseInt(e.target.dataset.x), parseInt(e.target.dataset.y), ship, vertical);
       
        renderShips(user); 
       
        shipNum++;
       

        // if all ships have been placed, remove event listeners
        if (shipNum+1 > ships.length) {
            const squares = document.querySelectorAll('.grid-square');

            // Remove listeners
            squares.forEach(square => {
                square.removeEventListener('mouseover', shipHover);
                square.removeEventListener('click', placeShip);
            });

            // hide rotate button
            rotateButton.style.visibility = 'hidden';

            
            beginBattle();
        }
        else {
            // if there are still ships left to place
            status.textContent = `Place your ${ships[shipNum].length} length ship`
        }


    }

    // Manually place ships onto board
    const choosePlaceShip = function() {
        const squares = document.querySelectorAll(".grid-square");
        squares.forEach(square => {
            // mouseover to see if ship's placeable at location
            square.addEventListener('mouseover', shipHover);
            
            // click to place ship at location
            square.addEventListener('click', placeShip);
        })
    }

    // Begin battle once all ships get placed
    const beginBattle = function() {
        status.textContent = 'Strike the enemy!'
        userAttack(user);
    }


    // start game 
    const startGame = function() {

        // hide new game button
        const newGameButton = document.querySelector('.new-game');
        newGameButton.style.visibility = 'hidden';

        // allow rotate button to change rotation
        rotateButton.addEventListener('click', () => {
            vertical = vertical? false: true;
            console.log(vertical);
        })
        
        // update status
        status.textContent = `Place your ${ships[shipNum].length} length ship`;

        placeAiShips();
        choosePlaceShip();
    }


    return {createUserBoard, createAiBoard, startGame}
}
export default createGame;

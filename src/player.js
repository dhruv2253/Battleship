import Ship from './ship.js'
import Gameboard from './gameboard.js'


const Player = function () {
    // gameboard
    const gameboard = new Gameboard();

    // opponent
    const opp = null;

    // commence player's attack on computer
    const attack = function(x, y) {

        // use gameboards function  receiveAttack
        return this.opp.gameboard.receiveAttack(x, y);
    }

    // create randomizer function that will be a parameter for ai attack.
    // for testing purposes
    const random = function(n) {

        // return a random number between 0, n
        return Math.floor(Math.random() * n);
        
    }

    // set that keeps track of all coords ai attacks
    const alreadyAttacked = new Set();

    // commence ai attack on player
    const aiAttack = function(r= random) {
        // random coordinates
        let x = r(7);
        let y = r(7);

        // if the coord to attack has not been added to set, attack it
        if(!alreadyAttacked.has(this.opp.gameboard.board[x][y])) {
            // attack location
            attack.call(this, x, y)
            // add this location to the set, since it has been attacked
            alreadyAttacked.add(this.opp.gameboard.board[x][y]);
            return [x, y];
        }
        else{
            // if it has been attacked, recall the function
            aiAttack.call(this, r);
        }
    }
    
    return {gameboard, opp, attack, aiAttack};
}


export default Player;
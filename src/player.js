import Ship from './ship.js'
import Gameboard from './gameboard.js'


const Player = function() {
    // gameboard
    const gameboard = new Gameboard();

    // opponent
    const opp = null;

    // commence player's attack on computer
    const playerAttack = function(x,y) {
        
        // use gameboard's function receiveAttack
        return this.opp.gameboard.receiveAttack(x,y);
            

    }

    // commence ai attack on player
    const aiAttack = function(n) {

        // randomize coordinates
         let x = Math.floor(Math.random() * n);
         let y = Math.floor(Math.random() * n);

         console.log(x)
         console.log(y)
         //attack player board using gameboard's function receive attack
         return this.opp.gameboard.receiveAttack(x,y);
    }

    
    return {gameboard, playerAttack, aiAttack, opp}
    

}

export default Player;
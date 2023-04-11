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
    // Set to keep track of already attacked coordinates
    const alreadyAttacked = new Set();
    // TODO: ai should not attack same spot more than once
    // commence ai attack on player
    const aiAttack = function(n) {
        // randomize coordinates
        let x = Math.floor(Math.random() * n);
        let y = Math.floor(Math.random() * n);
        console.log("x:" + x)
        console.log("y:" + y)
        // check if already attacked or out of bounds
        if(!alreadyAttacked.has(this.opp.gameboard.board[x][y])) {
            this.playerAttack(x,y)
            alreadyAttacked.add(this.opp.gameboard.board[x][y]);
            return [x, y];
        }
        else{
            this.aiAttack(n);
        }
    };
    


    
    return {gameboard, playerAttack, aiAttack, opp}
    

}

export default Player;
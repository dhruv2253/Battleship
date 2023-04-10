import Ship from './ship.js'
import Gameboard from './gameboard.js'


const Player = function() {
    const playerBoard = new Gameboard();
    const opp = null;

    const playerAttack = function(x,y) {
        
        return this.opp.gameboard.receiveAttack(x,y);
            

    }

    const aiAttack = function() {

         x = Math.floor(Math.random() * 8);
         y = Math.floor(Math.random() * 8);
         return playerBoard.receiveAttack(x,y);
    }

    
    return {playerBoard, playerAttack, aiAttack, opp}
    

}

export default Player;
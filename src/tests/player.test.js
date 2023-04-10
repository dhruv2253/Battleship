import Gameboard from "../gameboard.js";
import Ship from '../ship.js';
import Player from '../player.js';

test('attacking each other works ', () => {
    const player1 = new Player();
    const player2 = new Player();
    player1.opp = player2;
    player1.playerAttack(6, 6);
    expect(player2.gameboard.board[6][6].triedHit).toBe(true);
  
})

test('attacking can hit ships', () => {
    const player = new Player();
    const ai = new Player();
    const ship = new Ship(1);
    player.opp = ai;
    ai.opp = player;
    player.gameboard.placeShip(0,0, ship);
    
    ai.aiAttack(1);
    
    expect(player.gameboard.allSunk()).toBe(true);



})




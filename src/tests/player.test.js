import Gameboard from "../gameboard.js";
import Ship from '../ship.js';
import Player from '../player.js';

test('attack successful', () => {
    const player1 = new Player();
    const player2 = new Player();
    player1.opp = player2;
    player1.playerAttack(6, 6);
    expect(player2.gameboard.board[6][6].triedHit).toBe(true);
    console.log(player2.gameboard.board);
})
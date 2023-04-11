import Gameboard from "../gameboard.js";
import Ship from '../ship.js';
import Player from '../player.js';

test('Attacking each other works', () => {
    const player1 = new Player();
    const player2 = new Player();

    player1.opp = player2;

    player1.attack(0, 1);
    expect(player2.gameboard.board[0][1].triedHit).toBe(true);
})

test('AI attacks can hit ship', () => {
    const player = new Player();
    const ai = new Player();
    const ship = Ship(1);

    player.opp = ai;
    ai.opp = player;

    player.gameboard.placeShip(3,3,ship);

    const mockRandomizer = jest.fn().mockReturnValue(3);

    ai.aiAttack(mockRandomizer);
    expect(player.gameboard.allSunk()).toBe(true);
})

test('AI will not hit the same spot twice', () => {
    const player = new Player();
    const ai = new Player();
    const ship = new Ship(1);

    player.opp = ai;
    ai.opp = player;

    player.gameboard.placeShip(4,4,ship);

    const mockRandomizer = jest.fn()

    .mockReturnValueOnce(2)
    .mockReturnValueOnce(2)
    .mockReturnValue(4);

    ai.aiAttack(mockRandomizer);
    ai.aiAttack(mockRandomizer);

    expect(player.gameboard.allSunk()).toBe(true);
})






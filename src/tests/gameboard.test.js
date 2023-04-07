import Gameboard from "../gameboard.js";
import Ship from '../ship.js'

test('Board is created with given size', () => {
    const obj = Gameboard();
    obj.initialize(7);
    expect(obj.board.length).toBe(7);
})

test('new ship is added to shipsOnBoard', () => {
    const obj = Gameboard();
    const ship = Ship(3);
    obj.placeShip(2,2,ship);
    expect(obj.shipsOnBoard.length).toBe(1);
})


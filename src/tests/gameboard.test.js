import Gameboard from "../gameboard.js";
import Ship from '../ship.js'

test('Board is created with given size', () => {
    const obj = Gameboard();
    obj.initialize(7);
    expect(obj.board.length).toBe(7);
})


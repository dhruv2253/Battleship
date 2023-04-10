import Gameboard from "../gameboard.js";
import Ship from '../ship.js';


test('Gameboard should have a height of 7', () => {
    const gameboard = new Gameboard();
    expect(gameboard.board.length).toBe(7);
})

test('Gameboard should have a width of 7', () => {
    const gameboard = new Gameboard();
    expect(gameboard.board[0].length).toBe(7);
})

test('Gameboard should have no ships by default', () => {
    const gameboard = new Gameboard();
    expect(gameboard.board[0][0].ship).toBe(null);
})

test('new ship is added to shipsOnBoard', () => {
    const obj = new Gameboard();
    const ship = new Ship(3);
    obj.placeShip(2,2,ship, false);
    expect(obj.shipsOnBoard.length).toBe(1);
})

test('ships cannot overlap', () => {
    const obj = new Gameboard();
    const ship = new Ship(3);
    const ship2 = new Ship(3);
    obj.placeShip(2,2,ship, false);
    expect(obj.placeShip(2,2,ship2, false)).toBe(false);
});



test('ships cannot overlap, with rotation', () => {
    const obj = new Gameboard();
    const ship = new Ship(3);
    const ship2 = new Ship(3);
    obj.placeShip(1,0,ship);
    expect(obj.placeShip(0,1,ship2, true)).toBe(false);
  
})


test('ships can be added, with rotation', () => {
    const obj = new Gameboard();
    const ship = new Ship(3);
    const ship2 = new Ship(3);
    obj.placeShip(1,0,ship);
    expect(obj.placeShip(5,3,ship2, true)).toBe(true);
    
})


test('Attack is received', () => {
    const obj = new Gameboard();
    const ship = new Ship(3);  
    obj.placeShip(1,0,ship);
    expect(obj.receiveAttack(1,0)).toBe(true);
})

test('All ships have been sunk', () => {
    const obj = new Gameboard();
    const ship = new Ship(1); 
    obj.placeShip(1,0,ship);
    obj.receiveAttack(1,0);
    expect(obj.allSunk()).toBe(true);
})




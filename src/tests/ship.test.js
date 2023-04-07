import Ship from '../ship.js'


test('ship is made', () => {
    const obj = Ship(4);
    expect(obj.length).toBe(4);
});


test('ship is hit', () => {
    const obj = Ship(4);
    obj.hit();
    expect(obj.hits).toBe(1);
});

test('ship is not sunk', () => {
    const obj = Ship(4);
    obj.hit();
    expect(obj.isSunk()).toBe(false);
})

test('ship can sink', () => {
    const obj = Ship(4);
    obj.hit();
    obj.hit();
    obj.hit();
    obj.hit();
    expect(obj.isSunk()).toBe(true);
})

test('ship cannot have more hits than length', () => {
    const obj = Ship(2);
    obj.hit();
    obj.hit();
    obj.hit();
    expect(obj.hits).toBe(2);
})


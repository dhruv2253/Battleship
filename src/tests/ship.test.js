import ship from '../ship.js'


test('ship is made', () => {
    const obj = ship(4,0,false);
    expect(obj.length).toBe(4);
});


import ship from '../ship.js'


test('ship is made', () => {
    const obj = ship(4);
    expect(obj.length).toBe(4);
});


test('ship is hit', () => {
    const obj = ship(4);
    obj.hit();
    expect(obj.hits).toBe(1);
})


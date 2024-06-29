const functions = require('./index.js');

test('Displays Current Hit Count', () => {
    const ship = new functions.Ship(4, ['A1','A2']);
    expect(ship.displayHitCount()).toBe(0);
  });

test('Increases Current Hit Count', () => {
    const ship = new functions.Ship(4, ['A1','A2']);
    ship.hit();
    expect(ship.displayHitCount()).toBe(1);
  });

test('Ship with hits but not sunk', () => {
    const ship = new functions.Ship(4, ['A1','A2']);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });

test('Ship with enough hits to be sunk', () => {
    const ship = new functions.Ship(4, ['A1','A2']);
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

test('Recieve Repeat Attack', () => {
    const ship = new functions.Ship(2, ['A1','A2']);
    const gameboard = new functions.GameBoard();
    gameboard.ships.push(ship);
    gameboard.receiveAttack('A1')
    expect(gameboard.receiveAttack('A1')).toBe('Cannot Attack Same Coordinate Twice!!');
  });

test('Recieve Successful Attack', () => {
    const ship = new functions.Ship(2, ['A1','A2']);
    const gameboard = new functions.GameBoard();
    gameboard.ships.push(ship);
    expect(gameboard.receiveAttack('A1')).toBe('hit');
  });

test('Recieve Successful Final Attack', () => {
    const ship = new functions.Ship(2, ['A1','A2']);
    const ship2 = new functions.Ship(2, ['B3','B4']);
    const gameboard = new functions.GameBoard();
    gameboard.ships.push(ship);
    gameboard.ships.push(ship2);
    gameboard.receiveAttack('A2')
    expect(gameboard.receiveAttack('A1')).toBe('destroyed');
  });

test('Recieve Unsuccessful Attack', () => {
    const ship = new functions.Ship(2, ['A1','A2']);
    const gameboard = new functions.GameBoard();
    gameboard.ships.push(ship);
    expect(gameboard.receiveAttack('A3')).toBe('miss');
  });

test('All Ships Sunk', () => {
    const ship = new functions.Ship(2, ['A1','A2']);
    const gameboard = new functions.GameBoard();
    gameboard.ships.push(ship);
    gameboard.receiveAttack('A2');
    expect(gameboard.receiveAttack('A1')).toBe('Game Over');
  });

test('All Ships Not Sunk', () => {
    const ship = new functions.Ship(2, ['A1','A2']);
    const gameboard = new functions.GameBoard();
    gameboard.ships.push(ship);
    gameboard.receiveAttack('A2');
    expect(gameboard.gameOver()).toBe(false);
  });
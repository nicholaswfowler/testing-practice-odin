// EXAMPLE TEST

const functions = require('./functions.js');


test('Capitalizes "hello" to be "Hello"', () => {
    expect(functions.capitalize('hello')).toBe('Hello');
  });

test('reverses "hello" to be "olleh"', () => {
  expect(functions.reversal('hello')).toBe('olleh');
});

test('Adds 1 + 2 to equal 3', () => {
    expect(functions.calculator.add(1,2)).toBe(3);
  });
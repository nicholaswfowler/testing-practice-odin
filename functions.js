// EXAMPLE FUNCTION


function capitalize(word = '') {
    return word.replace(word[0], word[0].toUpperCase());
  }

function reversal(word){
  var reversal = [];
  for(let i = 0; i < word.length; i++){
    reversal.unshift(word[i]);
  }
  return(reversal.toString().replaceAll(',',''));
}

const calculator = {
  add: function add(a,b){
    return a+b;
  },
  subtract: function subtract(a,b){
    return a-b;
  },
  divide: function divide(a,b){
    return a/b;
  },
  multiply: function multiply(a,b){
    return a*b;
  }
}
  module.exports = {capitalize: capitalize,reversal:reversal, calculator:calculator};
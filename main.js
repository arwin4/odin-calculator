attachButtonListeners();

let numbersInput = 0;
let firstOperand = null;
let secondOperand = null;
let chosenOperator = null;

function attachButtonListeners() {
  const numberButtons = document.querySelectorAll('.number');
  numberButtons.forEach(button => {
    button.onclick = () => updateInput(button.id);
  });

  const clearButton = document.getElementById('clear');
  clearButton.onclick = () => clearScreen();

  const operatorButtons = document.querySelectorAll('.operator');
  operatorButtons.forEach(button => {
    button.onclick = () => saveFirstOperand(button.id);
  })

  const equalButton = document.getElementById('equals');
  equalButton.onclick = () => {
    console.log('calculating');
    let result = operate(chosenOperator, firstOperand, numbersInput);
    console.log(result);
  }
}

function updateInput(number) {
  if (numbersInput == 0) { // Prevent leading zeros
    numbersInput = '';
  }
  else if ((numbersInput == 0) && (number == 0)) { // Prevent adding 0 to 0
    return;
  }
  else if (numbersInput.length == 8) { // Limit display to 8 characters
    return;
  }
  // Append new input
  numbersInput += number;
  updateDisplay(numbersInput);

}

function saveFirstOperand(operator) {
  firstOperand = numbersInput;
  console.log('first operand is ' + firstOperand);
  chosenOperator = operator;
  console.log('the operator is ' + chosenOperator);
  clearScreen();
}

function clearScreen() {
  display = getDisplay();
  numbersInput = 0;
  display.textContent = numbersInput;
}

function getDisplay() {
  return document.querySelector('.display');
}

function updateDisplay(input) {
  display = getDisplay();
  display.textContent = input;
}

// Arithmetic
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return 'just no';
  return a / b;
}

function operate(operator, a, b) {
  // Calculates using the given operator

  a = parseInt(a);
  b = parseInt(b);
  
  switch (operator) {
    case 'add':
      return add(a, b);
    case 'subtract':
      return subtract(a, b);
    case 'multiply':
      return multiply(a, b);
    case 'divide':
      return divide(a, b);
    default:
      return 'error';
  }
}

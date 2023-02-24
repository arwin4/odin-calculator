attachButtonListeners();

let currentDisplay = null;
let firstOperand = null;
let secondOperand = null;
let chosenOperator = null;
let result = null;
let operatorPressed = false;

function attachButtonListeners() {
  const digitButtons = document.querySelectorAll('.digit');
  digitButtons.forEach(
    (button) => (button.onclick = () => handleDigitInput(button.id))
  );

  const clearButton = document.getElementById('clear');
  clearButton.onclick = () => clearScreen();

  const operatorButtons = document.querySelectorAll('.operator');
  operatorButtons.forEach((button) => {
    button.onclick = () => handleOperatorPress(button.id);
  });

  const equalButton = document.getElementById('equals');
  equalButton.onclick = () => showResult();
}

function handleDigitInput(digit) {
  // If this is the first digit, save digit in currentDisplay
  if (currentDisplay === null) {
    currentDisplay = digit;
    updateDisplay(currentDisplay);
  }
  // Limit display to 8 characters
  // if (currentDisplay.length == 8) {
  //   return;
  // }

  // Save current operand
  // If it's the second operand, save or update it
  if (firstOperand !== null && operatorPressed === true) {
    // Save it if it's the first digit
    if (secondOperand === null) {
      secondOperand = currentDisplay;
      console.log(
        'second operand has been set for the first time: ' + secondOperand
      );
      // Append the digit it's it's not the first
    } else {
      secondOperand += digit;
      console.log('second operand was updated to ' + secondOperand);
      currentDisplay = secondOperand;
    }
    // Save it if it's the first digit
  } else if (firstOperand === null) {
    firstOperand = currentDisplay;
    console.log(
      'first operand has been set for the first time: ' + firstOperand
    );
    // Append the digit it's it's not the first
  } else {
    firstOperand += digit;
    console.log('first operand was updated to ' + firstOperand);
    currentDisplay = firstOperand;
  }

  updateDisplay(currentDisplay);
}

function handleOperatorPress(operator) {
  chosenOperator = operator;
  toggleWaiting('operator-pressed');
  operatorPressed = true;
}

function toggleWaiting(event) {
  display = getDisplay();
  if (event === 'operator-pressed' || event === 'clear') {
    display.textContent = '_';
    currentDisplay = null;
  }
  // if (event === 'digit-pressed') {
  //   if (currentDisplay === null) {
  //     display.classList.toggle('waiting');
  //   } else if (currentDisplay === firstOperand) {
  //     display.classList.toggle('waiting');
  //   } else {
  //     return;
  //   }
  // } else if (event === 'operator-pressed') {
  //   display.textContent = '_';
  //   display.classList.toggle('waiting');
  // }
}

function showResult() {
  if (
    (chosenOperator === null, firstOperand === null, secondOperand === null)
  ) {
    return;
  }
  result = operate(chosenOperator, firstOperand, currentDisplay);
  console.log('calculating');
  console.log(result);
  display = getDisplay();
  display.textContent = result;
}

function clearScreen() {
  toggleWaiting('clear');
  firstOperand = null;
  secondOperand = null;
  chosenOperator = null;
  operatorPressed = false;
  result = null;
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

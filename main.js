attachButtonListeners();

let firstOperand = null;
let secondOperand = null;
let chosenOperator = null;
let result = null;
let operatorPressed = false;
let equalsPressed = false;

function attachButtonListeners() {
  const digitButtons = document.querySelectorAll('.digit');
  digitButtons.forEach(
    (button) => (button.onclick = () => handleDigit(button.id))
  );

  const clearButton = document.getElementById('clear');
  clearButton.onclick = () => handleClear();

  const operatorButtons = document.querySelectorAll('.operator');
  operatorButtons.forEach((button) => {
    button.onclick = () => handleOperator(button.id);
  });

  const equalButton = document.getElementById('equals');
  equalButton.onclick = () => handleEquals();
}

// Update the operands and show the input on the screen
function handleDigit(digit) {
  /* Accept input from scratch when equals has been pressed and the user isn't
  currently doing a calculation. */
  if (equalsPressed === true && operatorPressed === false) {
    acceptNewInput();
  }

  if (operatorPressed === false) {
    // If the operator hasn't been pressed, the first operand is being entered.
    if (firstOperand === null) {
      /* If this is the first digit that is entered, save it as the first 
      operand. Else, append the new digit to the operand. */
      firstOperand = digit;
    } else {
      firstOperand += digit;
    }
    updateDisplay(firstOperand);
  } else if (operatorPressed === true) {
    // If the operator has been pressed, save or update the second operand.
    if (secondOperand === null) {
      secondOperand = digit;
    } else {
      secondOperand += digit;
    }
    updateDisplay(secondOperand);
  }
}

function handleClear() {
  acceptNewInput();
  updateDisplay('_');
}

function handleOperator(operator) {
  // Ignore button press if no digit has been entered
  if (firstOperand === null) return;

  if (firstOperand !== null && secondOperand !== null) {
    /* Calculate and show intermediate result when user adds another operation.
      Then update operator. */
    showResult();
    chosenOperator = operator;
    return;
  } else {
    chosenOperator = operator;
    operatorPressed = true;
  }
}

function handleEquals() {
  equalsPressed = true;

  // Ignore button click if necessary information for the operation is missing
  if (
    chosenOperator === null ||
    firstOperand === null ||
    secondOperand === null
  )
    return;
  else {
    showResult();
    operatorPressed = false;
  }
}

function showResult() {
  result = operate(chosenOperator, firstOperand, secondOperand);
  console.log(result);

  // Allow subsequent operations to use current result
  firstOperand = result;
  secondOperand = null;

  // Show the result
  updateDisplay(result);
}

function acceptNewInput() {
  firstOperand = null;
  secondOperand = null;
  chosenOperator = null;
  result = null;
  operatorPressed = false;
  equalsPressed = false;
}

function updateDisplay(newContent) {
  const display = document.querySelector('.display');
  display.textContent = newContent;
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

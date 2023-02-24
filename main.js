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
    (button) => (button.onclick = () => handleDigitInput(button.id))
  );

  const clearButton = document.getElementById('clear');
  clearButton.onclick = () => acceptNewInput();

  const operatorButtons = document.querySelectorAll('.operator');
  operatorButtons.forEach((button) => {
    button.onclick = () => handleOperatorClick(button.id);
  });

  const equalButton = document.getElementById('equals');
  equalButton.onclick = () => handleEqualsClick();
}

// Update the operands and show the input on the screen
function handleDigitInput(digit) {
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

function handleOperatorClick(operator) {
  // Ignore button press if no digit has been entered
  if (firstOperand === null) return;
  // if first and second operator are present:
  //    calculate and show result.
  //    then the first operator gets the value of the second, and the second
  //    is set to null.
  // if the second operator is not present, continue
  if (firstOperand !== null && secondOperand !== null) {
    showResult();
    chosenOperator = operator;
    secondOperand = null;
    return;
  }
  chosenOperator = operator;
  // toggleWaiting('operator-pressed');
  operatorPressed = true;
}

function toggleWaiting(event) {
  if (event === 'operator-pressed' || event === 'clear') {
    updateDisplay('_');
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

function handleEqualsClick() {
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
  chosenOperator = null;

  // Show the result
  updateDisplay(result);
}

function acceptNewInput() {
  // toggleWaiting('clear');
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

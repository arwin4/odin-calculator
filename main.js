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
    (button) => (button.onclick = () => handleOperandInput(button.id))
  );

  const clearButton = document.getElementById('clear');
  clearButton.onclick = () => handleClear();

  const operatorButtons = document.querySelectorAll('.operator');
  operatorButtons.forEach((button) => {
    button.onclick = () => handleOperator(button.id);
  });

  const equalButton = document.getElementById('equals');
  equalButton.onclick = () => handleEquals();

  const periodButton = document.getElementById('.');
  periodButton.onclick = () => handleOperandInput('.');

  document.addEventListener('keydown', (e) => {
    handleKeyboardInput(e.key);
    e.preventDefault();
    // TODO: prevent default should only prevent unwanted inputs
  });
}

function handleKeyboardInput(key) {
  console.log('handling keyboard input... ' + key);
  switch (key) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      handleOperandInput(key);
      break;

    case '=':
    case 'Enter':
      handleEquals();
      break;

    case '.':
    case ',':
      handleOperandInput('.');
      break;

    case 'Delete':
      handleClear();
      break;

    case '+':
      handleOperator('add');
      break;

    case '-':
      handleOperator('subtract');
      break;

    case '*':
      handleOperator('multiply');
      break;

    case '/':
      handleOperator('divide');
      break;

    default:
      console.log('Unset key. Key pressed: ' + key + typeof key);
  }
}

// Update the operands and show the input on the screen
function handleDigit(digit, currentOperand) {
  if (currentOperand === 'first') {
    if (firstOperand === null) {
      /* If this is the first digit that is entered, save it as the first 
      operand. Else, append the new digit to the operand. */
      firstOperand = digit;
    } else {
      firstOperand += digit;
    }
    updateDisplay(firstOperand);
    return;
  }

  if (currentOperand === 'second') {
    // If the operator has been pressed, save or update the second operand.
    if (secondOperand === null) {
      secondOperand = digit;
    } else {
      secondOperand += digit;
    }
    updateDisplay(secondOperand);
    return;
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

function handleDecimalPoint(currentOperand) {
  // TODO: round decimals
  if (currentOperand === 'first') {
    try {
      if (firstOperand.includes('.')) return;
      firstOperand += '.';
      updateDisplay(firstOperand);
    } catch {
      firstOperand = '.';
      updateDisplay(firstOperand);
    }
    return;
  }

  if (currentOperand === 'second') {
    try {
      if (secondOperand.includes('.')) return;
      secondOperand += '.';
      updateDisplay(secondOperand);
    } catch {
      secondOperand = '.';
      updateDisplay(secondOperand);
    }
    return;
  }
}

function handleOperandInput(input) {
  /* Accept input from scratch when equals has been pressed and the user isn't
  currently doing a calculation. */
  if (equalsPressed === true && operatorPressed === false) {
    acceptNewInput();
  }

  // If the operator hasn't been pressed, deal with the first operand.
  if (operatorPressed === false) {
    if (input === '.') {
      handleDecimalPoint('first');
      return;
    } else {
      handleDigit(input, 'first');
      return;
    }
  }

  // If the operator has been pressed, deal with the second operand.
  if (operatorPressed === true) {
    if (input === '.') {
      handleDecimalPoint('second');
      return;
    } else {
      handleDigit(input, 'second');
      return;
    }
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
  a = parseFloat(a);
  b = parseFloat(b);

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

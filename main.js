attachButtonListeners();

// Save the numbers on the display in an object to allow setting up a proxy.
let displayValue = {
  num: '0',
}

const displayHandler = {
  set(target, prop, val) {
    const display = document.querySelector('.display');

    // Limit display to 8 digits
    if (target[prop].length > 8) {
      return true;
    }
    // Keep display clean of double and leading zeros
    else if (target[prop] == 0 && val.length > 1) {
      val = val.slice(1);
    }
    
    // Update the internal value
    target[prop] = val;
    // Change dom (update display)
    display.textContent = val;
    return true;
  }
}

// Detect attempted input to display
displayValue = new Proxy(displayValue, displayHandler);

function attachButtonListeners() {
  const numberButton = document.querySelectorAll('.number');
  numberButton.forEach(button => {
    // Add the clicked number to the display
    button.onclick = () => displayValue.num += button.id;
  });

  const clearButton = document.getElementById('clear');
  // clearButton.onclick = (e) => displayValue.num = clearButton.id;
  clearButton.onclick = () => clearDisplay();
}

function clearDisplay() {
  displayValue.num = 0;
  const display = document.querySelector('.display');
  display.textContent = '0';
  console.log(displayValue.num);
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
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);
    default:
      return 'error';
  }
}

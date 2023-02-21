attachButtonListeners();

// Save the numbers on the display in an object to allow setting up a proxy.
let displayValue = {
  num: '0',
}

const displayHandler = {
  set(target, prop, val) {
    // Keep display clean of double and leading zeros
     if (target[prop] == 0 && val.length > 1) val = val.slice(1);
     target[prop] = val;
    
    // Change dom
    const display = document.querySelector('.display');
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
    button.addEventListener('click', () => displayValue.num += button.id);
  });

  const clearButton = document.getElementById('clear');
  clearButton.onclick = () => displayValue.num = 0;
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

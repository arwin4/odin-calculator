attachButtonListeners();

function attachButtonListeners() {
  const numberButton = document.querySelectorAll('.number');
  numberButton.forEach(button => {
    button.addEventListener('click', () => displayInputNumber(button.id));
  });
}

function displayInputNumber(num) {
  const display = document.querySelector('.display');
  if (display.textContent === '0') display.textContent = ''; // Clear display
  display.textContent += num;
}

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

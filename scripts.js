// scripts.js

// Variables to store the current input, operator, and the result
let currentInput = '';
let operator = '';
let previousInput = '';
let result = 0;

// Selecting the display element
const display = document.querySelector('.display');

// Function to update the display
function updateDisplay(value) {
    display.textContent = value;
}

// Function to handle number button clicks
function handleNumberClick(number) {
    if (currentInput.length < 12) {
        currentInput += number;
        updateDisplay(currentInput);
    }
}

// Function to handle operator button clicks
function handleOperatorClick(op) {
    operator = op;
    if (currentInput !== '') {
        if (previousInput === '') {
            previousInput = currentInput;
        } else {
            calculate();
        }
        
        currentInput = '';
    }
}

// Function to handle the calculation
function calculate() {
    if (previousInput !== '' && currentInput !== '') {
        switch (operator) {
            case '+':
                result = parseFloat(previousInput) + parseFloat(currentInput);
                break;
            case '-':
                result = parseFloat(previousInput) - parseFloat(currentInput);
                break;
            case '*':
                result = parseFloat(previousInput) * parseFloat(currentInput);
                break;
            case '/':
                result = parseFloat(previousInput) / parseFloat(currentInput);
                break;
        }
        updateDisplay(result);
        previousInput = result.toString();
        currentInput = '';
    }
}

// Event listener for number buttons
const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        handleNumberClick(button.textContent);
    });
});

// Event listener for operator buttons
const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        handleOperatorClick(button.value);
    });
});

// Event listener for the clear button
document.querySelector('.clear').addEventListener('click', () => {
    currentInput = '';
    previousInput = '';
    operator = '';
    result = 0;
    updateDisplay('0');
});

// Event listener for the equals button
document.querySelector('.equals').addEventListener('click', () => {
    calculate();
    operator = '';
});

// Event listener for the sign button
document.querySelector('.sign').addEventListener('click', () => {
    if (currentInput !== '') {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay(currentInput);
    }
});

// Event listener for the percent button
document.querySelector('.percent').addEventListener('click', () => {
    if (currentInput !== '') {
        currentInput = (parseFloat(currentInput) / 100).toString();
        updateDisplay(currentInput);
    }
});

// Event listener for the decimal button
document.querySelector('.decimal').addEventListener('click', () => {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay(currentInput);
    }
});

// Initial display value
updateDisplay('0');

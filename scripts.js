let currentInput = '';
let operator = '';
let previousInput = '';
let result = 0;

const display = document.querySelector('.display');

function updateDisplay(value) {
    display.textContent = value;
}

function handleNumberClick(number) {
    if (currentInput.length < 12) {
        currentInput += number;
        updateDisplay(currentInput);
    }
}

function handleOperatorClick(op) {
    if (currentInput === '' && op === '-') {
        currentInput = '-';
        updateDisplay(currentInput);
    }
    else if (currentInput !== '') {
        if (previousInput !== '') {
            calculate();
        } else {
            previousInput = currentInput;
        }
        currentInput = ''; 
    }
    
    operator = op;
}
    

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

const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        handleNumberClick(button.textContent);
    });
});

const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        handleOperatorClick(button.value);
    });
});

document.querySelector('.clear').addEventListener('click', () => {
    currentInput = '';
    previousInput = '';
    operator = '';
    result = 0;
    updateDisplay('0');
});

document.querySelector('.equals').addEventListener('click', () => {
    calculate();
    operator = '';
});

document.querySelector('.sign').addEventListener('click', () => {
    if (currentInput !== '') {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay(currentInput);
    }
});

document.querySelector('.percent').addEventListener('click', () => {
    if (currentInput !== '') {
        currentInput = (parseFloat(currentInput) / 100).toString();
        updateDisplay(currentInput);
    }
});

document.querySelector('.decimal').addEventListener('click', () => {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay(currentInput);
    }
});

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (!isNaN(key)) {
        handleNumberClick(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        handleOperatorClick(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        handleClear();
    } else if (key === '%') {
        handlePercent();
    } else if (key === '.') {
        handleDecimal();
    } else if (key === 'Escape') {
        handleClear();
    } else if (key === 's' || key === 'S') {
        handleSign();
    }
});

updateDisplay('0');

let currentOperand = '';
let previousOperand = '';
let operation = null;

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    currentOperand = currentOperand.toString() + number.toString();
    updateDisplay();
}

function chooseOperation(op) {
    if (currentOperand === '' && op !== '√') return;
    if (op === '√') {
        computeSquareRoot();
        return;
    }
    if (previousOperand !== '') {
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = current !== 0 ? prev / current : 'Error';
            break;
        default:
            return;
    }
    
    currentOperand = computation;
    operation = null;
    previousOperand = '';
    updateDisplay();
}

function computeSquareRoot() {
    let value = parseFloat(currentOperand);
    if (isNaN(value) || value < 0) {
        currentOperand = 'Error';
    } else {
        currentOperand = Math.sqrt(value).toString();
    }
    updateDisplay();
}

function computePercentage() {
    let value = parseFloat(currentOperand);
    if (!isNaN(value)) {
        currentOperand = (value / 100).toString();
        updateDisplay();
    }
}

function deleteLast() {
    currentOperand = currentOperand.toString().slice(0, -1);
    updateDisplay();
}

function clearDisplay() {
    currentOperand = '';
    previousOperand = '';
    operation = null;
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('display').value = currentOperand;
}

// Keyboard support
document.addEventListener('keydown', (event) => {
    if (!isNaN(event.key) || event.key === '.') {
        appendNumber(event.key);
    } else if (['+', '-', '*', '/'].includes(event.key)) {
        chooseOperation(event.key);
    } else if (event.key === 'Enter') {
        compute();
    } else if (event.key === 'Backspace') {
        deleteLast();
    } else if (event.key === 'Escape') {
        clearDisplay();
    }
});

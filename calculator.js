function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return b != 0 ? a / b : 'Cant divide on 0';
}

function operate(a, operator, b) {
    a = +a, b = +b
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return substract(a, b);
        case '×':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}

// CALCULATOR VARIABLES
const calculator = {
    expression: [''],
    result: 0,
    isNewExpression: true,
};

// DOMs
const exprArea = document.querySelector('.expression');
const resultArea = document.querySelector('.result');
const calcBtns = document.querySelectorAll('.btn');
const clearBtn = document.querySelector('.btn-clear');
const backspaceBtn = document.querySelector('.btn-backspace');

// FUNCTIONS
const isNumber = (value) => !isNaN(+value);

function addToExprression(value) {
    const lastExprSymbol = calculator.expression[calculator.expression.length - 1].slice(-1);
    if (isNumber(value)) {
        isNumber(lastExprSymbol) ?
            calculator.expression[calculator.expression.length - 1] += value :
            calculator.expression.push(value);
    } else {
        isNumber(lastExprSymbol) ?
            calculator.expression.push(value) :
            calculator.expression[calculator.expression.length - 1] = value;
    };
    updateExpression();
};

function updateExpression() {
    exprArea.textContent = calculator.expression.join('');
};

function clearExpression() {
    exprArea.textContent = '';
    calculator.expression = [''];
};

function updateResult() {
    calculator.result = 123;
    resultArea.textContent = calculator.result;
};

function clearResult() {
    resultArea.textContent = '';
    calculator.result = 0;
};

function deleteLast() {
    const lastIndex = calculator.expression.length - 1;

    if (calculator.expression[lastIndex].length in [0, 1]) {
        if (calculator.expression.length === 1) {
            clearExpression();
            clearResult();
        } else {
            calculator.expression.pop()
            updateExpression();
            updateResult();
        };
    } else {
        calculator.expression[lastIndex] = calculator.expression[lastIndex].slice(0, -1);
        updateExpression();
        updateResult();
    };
};

// EVENTS
backspaceBtn.addEventListener('click', deleteLast);
clearBtn.addEventListener('click', () => {
    clearExpression();
    clearResult();
});

calcBtns.forEach(function (btn) {
    switch (btn.value) {
        case "=":
            btn.addEventListener('click', function () {
                if (calculator.expression != [''] && calculator.result != 0) {
                    calculator.expression = [`${calculator.result.toString()}`];
                    updateExpression();
                    resultArea.textContent = '';
                };
            });
            break;
        default:
            btn.addEventListener('click', function () {
                addToExprression(btn.value);
                updateResult();
            });
            break;
    }
})
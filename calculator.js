// TODO: float numbers
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
        // TODO: when first add +,-,/,*
        (isNumber(lastExprSymbol) && calculator.expression[calculator.expression.length - 1] != '') ?
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
    function calculate(expression = calculator.expression) {
        let localExpression = expression.slice();
        let maxIndex = isNumber(localExpression[localExpression.length - 1]) ? localExpression.length - 1 : localExpression.length - 2;

        for (let i = 0; i < maxIndex; i++) {
            if (localExpression[i] === '×' || localExpression[i] === '/') {

                if (localExpression[i] === '/' && localExpression[i + 1] === '0') return 'Are u dumbass?';

                localExpression = operateWithArray(localExpression, i);
                i--;
                maxIndex -= 2;
            };
        };

        for (let i = 0; i < maxIndex; i++) {
            if (localExpression[i] === '+' || localExpression[i] === '-') {
                localExpression = operateWithArray(localExpression, i);
                i--;
                maxIndex -= 2;
            };
        };

        return parseInt(localExpression[0]);
    }

    function operateWithArray(array, index) {
        const newElement = operate(array[index - 1], array[index], array[index + 1]).toString();
        array.splice(index - 1, 3, newElement);
        return array;
    }

    calculator.result = calculate();
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
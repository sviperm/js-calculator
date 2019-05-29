function add(a, b) {
    return a + b
}

function substract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return b != 0 ? a / b : 'Cant divide on 0'
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
    expression: '',
    functions: [],
    result: 0,
    isNewExpression: true,
}

// DOMs
const exprArea = document.querySelector('.expression');
const resultArea = document.querySelector('.result');
const calcBtns = document.querySelectorAll('.btn');
const clearBtn = document.querySelector('.btn-clear');
const backspaceBtn = document.querySelector('.btn-backspace');

// FUNCTIONS
function addToExprression(value) {
    calculator.expression += value
    exprArea.textContent = calculator.expression
}

function clearExpression() {
    exprArea.innerHTML = '';
    calculator.expression = '';
}

function calculateResult() {
    calculator.result = 123
    resultArea.textContent = calculator.result
}

function clearResult() {
    resultArea.textContent = '';
    calculator.result = 0
}

function deleteLast() {
    calculator.expression = calculator.expression.slice(0, -1)
    exprArea.textContent = calculator.expression
    if (calculator.expression.length === 0) {
        clearExpression();
        clearResult();
    } else {
        calculateResult();
    }
}

// EVENTS
backspaceBtn.addEventListener('click', deleteLast)
clearBtn.addEventListener('click', () => {
    clearExpression();
    clearResult();
});
calcBtns.forEach(function (btn) {
    switch (btn.value) {
        case "=":
            btn.addEventListener('click', function () {
                exprArea.textContent = calculator.result
                calculator.expression = calculator.result.toString()
                resultArea.textContent = ''

            });
            break
        default:
            btn.addEventListener('click', function () {
                addToExprression(btn.value)
                calculateResult()
            });
            break;
    }
    // if (btn.value != "=") {
    //     btn.addEventListener('click', function () {
    //         addToExprression(btn.value)
    //         calculateResult()
    //     })
    // } else {
    //     btn.addEventListener('click', function () {
    //         console.log(calculator)
    //         exprArea.textContent = calculator.result
    //         calculator.expression = calculator.result.toString()
    //         resultArea.textContent = ''
    //         console.log(calculator)
    //     })
    // }
})


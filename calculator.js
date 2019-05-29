function add(a, b) {
    return +a + +b
}

function substract(a, b) {
    return +a - +b
}

function multiply(a, b) {
    return +a * +b
}

function divide(a, b) {
    return b != 0 ? +a / +b : 'Cant divide on 0'
}

function operate(a, operator, b) {
    a = +a, b = +b
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return substract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}

// DOMs
const exprArea = document.querySelector('.expression');
const clearBtn = document.querySelector('.btn-clear');
clearBtn.addEventListener('click', function () {
    exprArea.innerHTML = ''
    console.log(exprArea)
});
// console.log(clearBtn)
"use script";

const darkModeSwitch = document.querySelector('.dark-mode');
const lightModeSwitch = document.querySelector('.light-mode');
const currTheme = localStorage.getItem('theme');
const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

darkModeSwitch.addEventListener('click', function() {
    lightModeSwitch.style.display = 'block';
    darkModeSwitch.style.display = 'none';
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
});

lightModeSwitch.addEventListener('click', function() {
    lightModeSwitch.style.display = 'none';
    darkModeSwitch.style.display = 'block';
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
});

if(currTheme) {
    if(currTheme === 'light') {
        lightModeSwitch.style.display = 'block';
        darkModeSwitch.style.display = 'none';
    } else {
        lightModeSwitch.style.display = 'none';
        darkModeSwitch.style.display = 'block';
    }
    document.documentElement.setAttribute('data-theme', currTheme);
}

function sendNumberValue(number) {
    if(awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

function addDecimal() {
    if(awaitingNextValue) return;
    if(!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber
};

function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    if(operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    if(!firstValue) {
        firstValue = currentValue;
    } else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    awaitingNextValue = true;
    operatorValue = operator;
}

inputBtns.forEach((inputBtn) => {
    if(inputBtn.value >= 0 && inputBtn.value <= 9) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if(inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    } else if(inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal());
    } 
});

function resetAll() {
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
}

clearBtn.addEventListener('click', resetAll);
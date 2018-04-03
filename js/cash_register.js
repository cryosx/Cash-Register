let display = document.getElementById('display_value');
let calculator = calculatorModule();
let cashRegister = CashRegister(0, display);
let operation = null;

let numButtons = document.getElementsByClassName('num_button');
for (let i = 0; i < numButtons.length; i++) {
    numButtons[i].addEventListener('click', function() {
        setDisplay(this.value);
        if (this.value % 2 === 0) {
            cash_register.className = 'retro';
        } else {
            cash_register.className = 'base_theme';
        }
    });
}

let periodBtn = document.getElementById('button_period');
periodBtn.addEventListener('click', function() {
    setDisplay(this.value);
});

let decimalBtn = document.getElementById('button_00');
decimalBtn.addEventListener('click', function() {
    display.innerHTML = (Number.parseFloat(display.innerHTML) / 100).toFixed(2);
});

let operatorBtns = document.getElementsByClassName('operator_button');
for (let i = 0; i < operatorBtns.length; i++) {
    operatorBtns[i].addEventListener('click', function() {
        if (operation) {
            calculator[operation](Number.parseFloat(getDisplay()));
            operation = this.value;
            clearDisplay();
            setDisplay(calculator.getTotal());
        } else {
            calculator.load(Number.parseFloat(getDisplay()));
            operation = this.value;
        }
    });
}

let calculateBtn = document.getElementById('button_calculate');
calculateBtn.addEventListener('click', function() {
    if (calculator.hasOwnProperty(operation)) {
        calculator[operation](Number.parseFloat(getDisplay()));
        operation = null;
        display.innerHTML = '0.00';
        calculator.clearMemory();
        setDisplay(calculator.getTotal());
    }
});

let clrDisplayBtn = document.getElementById('button_clear');
clrDisplayBtn.addEventListener('click', clearDisplay);

let getBalBtn = document.getElementById('button_get_balance');
getBalBtn.addEventListener('click', function() {
    cashRegister.getBalance();
});

let depositCashBtn = document.getElementById('button_deposit_cash');
depositCashBtn.addEventListener('click', function() {
    cashRegister.makeDeposit(getDisplay());
    clearDisplay();
});

let withdrawCashBtn = document.getElementById('button_withdraw_cash');
withdrawCashBtn.addEventListener('click', function() {
    cashRegister.makeWithdraw(getDisplay());
    clearDisplay();
});

function CashRegister(balance, display) {
    let _balance = balance;
    let _display = display;

    function getBalance() {
        _display.innerHTML = _balance.toFixed(2);
        return _balance;
    }

    function makeDeposit(value) {
        _balance += Number.parseFloat(value);
    }

    function makeWithdraw(value) {
        if (_balance >= value) {
            _balance -= Number.parseFloat(value);
        }
    }

    return {
        getBalance: getBalance,
        makeDeposit: makeDeposit,
        makeWithdraw: makeWithdraw
    };
}

function getDisplay() {
    let display = document.getElementById('display_value');
    return display.innerHTML;
}

function setDisplay(value) {
    let display = document.getElementById('display_value');
    if (
        display.innerHTML === '0.00' ||
        display.innerHTML === '0' ||
        operation !== null
    ) {
        display.innerHTML = value;
    } else {
        display.innerHTML += value;
    }
}

function clearDisplay() {
    let display = document.getElementById('display_value');
    display.innerHTML = '0.00';
    calculator.clearMemory();
    calculator.load(0);
    operation = null;
}

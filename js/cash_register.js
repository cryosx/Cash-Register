let display = document.getElementById('display');
let calculator = Calculator();
let cashRegister = CashRegister(0, display);
let operation = null;


let numButtons = document.getElementsByClassName('num_button');
for (let i = 0; i < numButtons.length; i++) {
    numButtons[i].addEventListener('click', function() {
        console.log(this.value);
        setDisplay(this.value);
    });
    
}

let operatorBtns = document.getElementsByClassName('operator_button');
for (let i = 0; i < operatorBtns.length; i++) {
    operatorBtns[i].addEventListener('click', function() {
        calculator.load(Number.parseFloat(getDisplay()));
        operation = this.value;
    });  
}

let calculateBtn = document.getElementById('button_calculate');
calculateBtn.addEventListener('click', function() {
    if (calculator.hasOwnProperty(operation)) {
        calculator[operation](Number.parseFloat(getDisplay()));
        operation = null;
        clearDisplay();
        setDisplay(calculator.getTotal());
    }
});

// let addBtn = document.getElementById('button_add');
// addBtn.addEventListener('click', function() {
//     calculator.clearMemory();
//     calculator.load(Number.parseFloat(display.innerHTML));
//     operation = 'add';
// });


let periodBtn = document.getElementById('button_period');
periodBtn.addEventListener('click', function() {
    setDisplay(this.value);
});

let decimalBtn = document.getElementById('button_00');
decimalBtn.addEventListener('click', function() {
    display.innerHTML = (Number.parseFloat(display.innerHTML)/100).toFixed(2);
});

let clrDisplayBtn = document.getElementById('button_clear');
clrDisplayBtn.addEventListener('click', clearDisplay);

let getBalBtn = document.getElementById('button_get_balance');
getBalBtn.addEventListener('click', cashRegister.getBalance);

let depositCashBtn = document.getElementById('button_deposit_cash');
depositCashBtn.addEventListener('click', function() {
    cashRegister.makeDeposit(getDisplay());
});

let withdrawCashBtn = document.getElementById('button_withdraw_cash');
withdrawCashBtn.addEventListener('click', function() {
    cashRegister.makeWithdraw(getDisplay());
});

function CashRegister(balance, display) {
    let _balance = balance;
    let _display = display;

    function getBalance() {
        console.log('Balance: ' + _balance);
        _display.innerHTML = _balance.toFixed(2);
        return _balance;
    }

    function makeDeposit(value) {
        _balance += Number.parseFloat(value);
        clearDisplay();
        console.log('Balance: ' + _balance);
    }

    function makeWithdraw(value) {
        if (_balance >= value) {
            _balance -= Number.parseFloat(value);
            clearDisplay();
        }
    }

    return {
        getBalance: getBalance,
        makeDeposit: makeDeposit,
        makeWithdraw: makeWithdraw,
    };

}

function getDisplay() {
    let display = document.getElementById('display');
    console.log(display.innerHTML);
    return display.innerHTML;
}

function setDisplay(value) {
    let display = document.getElementById('display');
    console.log(display.innerHTML);
    if (display.innerHTML === '0.00' || display.innerHTML === '0' || operation !== null) {
        display.innerHTML = value;
    } else {
        display.innerHTML += value;
    }
}

function clearDisplay() {
    let display = document.getElementById('display');
    display.innerHTML = '0.00';
    calculator.clearMemory();
}
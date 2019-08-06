//add
let add = (x, y) => {
    return x + y;
}

//subtract
let subtract = (x, y) => {
    return x - y
}

//multiply
let multiply = (x, y) => {
    return x * y
}

//divide
let divide = (x, y) => {
    return x / y
}

//operate
let operate = (operator, num1, num2) => {
    return operator(num1, num2)
}

let currentDisplay = document.querySelector('#display');
currentDisplay.textContent = '';
let indicator = 0;

let numberButton = document.querySelector('#key')
numberButton.addEventListener('click', (e) =>  {
    console.log(e)
    if(indicator === 0) {
        currentDisplay.textContent = e.target.innerText;
        indicator++
    } else if(indicator !== 0) {
        currentDisplay.textContent+= '' + e.target.innerText;
    }
});

let optionButton = document.querySelector('#operator');
optionButton.addEventListener('click', (e) => { 
    // console.log(e.target.innerText)
    if(indicator === 0) {
        currentDisplay.textContent = e.target.innerText;
        indicator++
    } else if(indicator !== 0) {
        currentDisplay.textContent+= '' + e.target.innerText;
    }
})

let equal = document.getElementById('equal')
equal.addEventListener('click', (e) => {
    let display = currentDisplay.textContent.split('')
    // let stringToNum = parseInt(display)
    let stringToNum = display.map((item) => {

        if(parseInt(item) = NaN) {
            return item;
        } else{
            return parseInt(item)
        }
    })

    console.log(stringToNum);
})

let operatorList = (x, y) => {
    if(e.target.innerText.includes('+')) {
        add(x, y)
    }
}

console.log(indicator)
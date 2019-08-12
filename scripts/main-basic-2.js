/**************************************************************************************************************************
 *                                                  SECOND PART
 * 
 *                             FOR DOCUMENTATION PURPOSE, MORE COMPLETE CODE AND FURTHER READ
 * ***********************************************************************************************************************/

const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.calculator_keys');
const display = document.querySelector('.calculator-display');

keys.addEventListener('click', (e) => {
    const previousKeyType = calculator.dataset.previousKeyType; // << THIS IS CUSTOM VALUE
    if(e.target.matches('button')) { // START IF MATCHES THE BUTTON
        let key = e.target
        console.log(key);
        // Remove .is-depressed class from all keys if pressed
        Array.from(key.parentNode.children).forEach((k) => k.classList.remove('is-depressed'))

        // The number of the key that was clicked
        // The current displayed number
        let keyContent = key.textContent;
        let displayedNum = display.textContent;

        // dataset is found in "data-[attibute]", check index.html
        let action = key.dataset.action;

        // If the key has a data-action that is either add, subtract, multiply or divide, the key is 'operator'.
        if( action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
          ) {
              console.log(`You press the "${action.toUpperCase()}" operator button`)
              // set the variable beforehand
              const firstValue = calculator.dataset.firstValue; // Setting CUSTOM VALUE
              const operator = calculator.dataset.operator;     // Setting CUSTOM VALUE
              const secondValue = displayedNum;                 // Setting CUSTOM VALUE

              // Note: It's sufficient to check for firstValue and operator because secondValue always exists
              if(firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'operate') {
                  const operateValue = operate(firstValue, operator, secondValue);
                  display.textContent = operateValue;
                  // Update calculated value as firstValue
                  calculator.dataset.firstValue = operateValue; // for chaining calculation
              } else {
                  // If there are no calculations, set displayedNum as the firstValue
                  calculator.dataset.firstValue = displayedNum;
              }

              // store displayed value before deleted, using "custom" value
              key.classList.add('is-depressed');
            //   calculator.dataset.firstValue = displayedNum;    // << CUSTOM VALUE
              // add "custom" attribute
              calculator.dataset.previousKeyType = 'operator'; // << CUSTOM VALUE
              calculator.dataset.operator = action;             // << CUSTOM VALUE, (key.dataset.action)
            //   display.textContent = 0;
          } 

          if(action === 'decimal') {
              // To check if the string already has a dot
              if(!displayedNum.includes('.')) {
                  display.textContent = displayedNum + '.'
              } else if(previousKeyType === 'operator' || previousKeyType === 'operate') {
                  display.textContent = '0.';
              }
              calculator.dataset.previousKeyType = 'decimal'   // << CUSTOM VALUE
          } 
          
          if(action === 'operate') { // EQUALS
              // use three values to operate calculation
              let firstValue = calculator.dataset.firstValue   // << FROM CUSTOM VALUE
              const operator = calculator.dataset.operator     // << FROM CUSTOM VALUE
              let secondValue = displayedNum;                  // << FROM CUSTOM VALUE

              if(firstValue) {
                  if(previousKeyType === 'operate') { // press equal after other calculation/equal
                    firstValue = displayedNum;
                    secondValue = calculator.dataset.modValue;
                  }
                display.textContent = operate(firstValue, operator, secondValue);
              }

              // set modValue attribute = secondValue use to next calculation
              calculator.dataset.modValue = secondValue;
              calculator.dataset.previousKeyType = 'operate'
          } 
          
          if(action === 'clear') {
              console.log('clear key!');
              calculator.dataset.firstValue = '';
              calculator.dataset.operator = '';
              calculator.dataset.secondValue = '';
              calculator.dataset.previousKeyType = ''

              display.textContent = 0;
              calculator.dataset.previousKeyType = 'clear'
          } 
          
          let numberKey = !action;
          if(numberKey) {
              if(displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'operate') {
                  display.textContent = keyContent;
              } else {
              // if it's not 0, append clicked key to displayed
                  display.textContent = displayedNum + keyContent;
              }
              console.log('number key!')
              calculator.dataset.previousKeyType = 'number'    // << CUSTOM VALUE
          }
    }
})


document.addEventListener("keydown", (event) => {
    let e = event.keyCode;
    let key = event.key; 
    if(e === 48 || e === 49 || e === 50 || e === 51 || e === 52 || e === 53 || e === 54 || e === 55 || e === 56 || e === 57) {
        console.log(event.key)
        console.log(isNaN(event.key))
        display.textContent = key;
    }
})

const operate = (x, operator, y) => {
    // before calculating, convert strings to numbers.
    let result = '';
    if(operator === 'add') {
        result = parseFloat(x) + parseFloat(y)
    } else if(operator === 'subtract') {
        result = parseFloat(x) - parseFloat(y)
    } else if(operator === 'multiply') {
        result = parseFloat(x) * parseFloat(y)
    } else if(operator === 'divide') {
        result = parseFloat(x) / parseFloat(y)
    }

    return result;
}
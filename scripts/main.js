const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.calculator_keys');
const display = document.querySelector('.calculator-display');
const previousKeyType = calculator.dataset.previousKeyType;

keys.addEventListener('click', (e) => {
    if(e.target.matches('button')) {
        let key = e.target
        // Remove .is-pressed class from all keys
        Array.from(key.parentNode.children).forEach((k) => k.classList.remove('is-pressed'))

        // The number of the key that was clicked
        // The current displayed number
        let keyContent = key.textContent;
        let displayedNum = display.textContent;

        // console.log(key.dataset.action)
        let action = key.dataset.action;

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
        // If the key has a data-action that is either add, subtract, multiply or divide, the key is 'operator'.
        if( action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
          ) {
              // store displayed value before wiped, using "custom" value
              calculator.dataset.firstValue = displayedNum;
              calculator.dataset.operator = action
              key.classList.add('is-pressed')
              // add "custom" attribute
              calculator.dataset.previousKeyType = 'operator';
              display.textContent = 0
          } else if(action === 'decimal') {
              display.textContent = displayedNum + '.'
          } else if(action === 'operate') {
              // use three values to operate calculation
              const firstValue = calculator.dataset.firstValue
              const operator = calculator.dataset.operator
              const secondValue = displayedNum;

              display.textContent = operate(firstValue, operator, secondValue);
          } else if(action === 'clear') {
              console.log('clear key!')
          } else if(!action) { // < NUMBER KEY
              // If it shows 0, replace display with clicked key
              if(displayedNum === '0' || previousKeyType === 'operator') {
                  display.textContent = keyContent;
              } else {
              // if it's not 0, append clicked key to displayed
                  display.textContent = displayedNum + keyContent;
              }
              console.log('number key!')
          }
    }
})
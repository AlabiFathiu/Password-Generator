// DOM Manipulation
const alertEl = document.getElementById('alert');
const clipboardEl = document.getElementById('clipboard');
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const symbolEl = document.getElementById('symbols');
const numberEl = document.getElementById('number');
const generateEl = document.getElementById('generate');


console.log(resultEl)
// Generate numbers
// random Lowercase alphabet
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
    
}
// console.log(getRandomLower())

// random uppercase alphabet
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)  
}
// console.log(getRandomUpper())

// random Number
function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)   
}
// console.log(getRandomNumber())

// Random symbol
function getRandomSymbol() {
    const symbol = '!@#$%^&*()?><:"{},.[]=-'
    return symbol[Math.floor(Math.random() * symbol.length)]   
}
// console.log(getRandomSymbol())

// Store all the function in an object
const randomFunction = {
     lower : getRandomLower,
     upper : getRandomUpper,
     symbol : getRandomSymbol,
     number : getRandomNumber
}

// GenrateEl event listener
generateEl.addEventListener('click', () => {
    // Get the typeof length value
    // typeof length value = string
    // convert to number using +
    const length = +lengthEl.value 
    // console.log(typeof length)
    
    // get the boolean value of checkboxes
    const hasLower = lowercaseEl.checked;
    const hasSymbol = symbolEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numberEl.checked;

    // console.log(hasLower)
    // console.log(hasUpper)
    // console.log(hasSymbol)
    // console.log(hasNumber)

    resultEl.innerText = generatePassword(
        hasLower,
        hasUpper,
        hasSymbol,
        hasNumber,
        length
    )
    // displayAlert('Password Generated', 'success')
})

// Generate Password Function
function generatePassword(lower, upper, number, symbol, length) {
    // Initialize a password variable
    let generatedPassword = '';
    // get the number of checkboxes clicked
    const typesCount = lower + upper + number + symbol;
    // console.log('typesCount :', typesCount)

    // create an array of types object
    const typesArr = [{lower}, {upper}, {number}, {symbol}]
    // console.log('TypesArr:', typesArr)

    // filter out the unchecked boxes from the array
    const filterTypersArr = typesArr.filter(item => Object.values(item)[0])
    // console.log(filterTypersArr)

    if(typesCount === 0) {
        displayAlert('Please check the boxes', 'danger')
        return '';
    }

    // loop through the typesCount
    for(i = 0; i < length; i += typesCount){
        // select each checkBoxes
        filterTypersArr.forEach(type => {
            // get the keys from the randomFunction()
            const funcName = Object.keys(type)[0]

            // add the keys to the generated password
            generatedPassword += randomFunction[funcName]();
        })
    }
    const finalPassword = generatedPassword.slice(0, length)
    displayAlert('Password Generated', 'success')
    return finalPassword
}

// Alert 
function displayAlert (text, action) {
    alertEl.innerText = text;
    alertEl.classList.add(`alert-${action}`)

    // remove alert after 1sec
    setTimeout(function() {
        alertEl.innerText = '';
        alertEl.classList.remove(`alert-${action}`)
    }, 2000)
}


// Copy to clipboard
clipboardEl.addEventListener('click', () => {
    const textArea = document.createElement('textarea');
    const password = resultEl.innerText

    if(!password) {
        displayAlert('Cannot copy empty value', 'danger');
        return '';
    }

    textArea.value  = password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
    displayAlert('Clipboard copied', 'success')
})




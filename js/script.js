//Focus on the Name Field by default
let nameInput = document.getElementById('name')
nameInput.focus();
//T-shirt info section
//disable the color select element
const colorSelect = document.getElementById('color')
colorSelect.disabled=true
//set variables for design and color section
const designSelect = document.getElementById('design');
const colorThemes = colorSelect.children;
//Payment info section
//set the variable to the payment select ID
const paymentForm = document.getElementById('payment')
const credit = document.getElementById('credit-card')
const paypal = document.getElementById('paypal')
const bitcoin = document.getElementById('bitcoin')

//Form Validation Section
const form = document.querySelector('form')
//helper functions
const nameHint = document.getElementById('name-hint');
const emailHint = document.getElementById('email-hint');
const ccHint = document.getElementById('cc-hint');
const zipHint = document.getElementById('zip-hint');
const cvvHint = document.getElementById('cvv-hint');
const actHints = document.getElementById('activities-hint')
const emailInput = document.getElementById('email');
const cardNum = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvvNum = document.getElementById('cvv');
const allInputBox = document.querySelectorAll('input[type="checkbox"]');
//Job Role section
//grab the values from HTML and store in a variable
const jobRole = document.getElementById('title');
const otherRole = document.getElementById('other-job-role');
//register for activites section
//program the register for activities section to listen for user changes 
const registerCheck = document.getElementById('activities');
const activitesCost = document.getElementById('activities-cost');
let totalCost = 0;


//otherRole should be hidden on start
otherRole.style.display = 'none';
//create a listener for jobrole that has a function to hide/unhide
jobRole.addEventListener('change', (e) => {
    e.preventDefault()
    const jobValue = e.target.value
    if (jobValue === 'other') {
        otherRole.style.display = 'block';
    } else {
        otherRole.style.display = 'none';
    }
});

//program the design select element to listen for user changes
designSelect.addEventListener('change', (e) => {
    colorSelect.disabled = false;
    let themeSelect = e.target.value;
    colorThemes[0].textContent = 'Please select a color';
    color.value = 'Please select a color';

    //create a loop that goes through the options
    for (let i = 0; i < colorThemes.length; i++) {
        let dataTheme = colorThemes[i].getAttribute('data-theme');
        //compare the two if they match show themes 
        if (themeSelect === dataTheme) {
            colorThemes[i].hidden = false;
        } else if (themeSelect !== dataTheme) {
            colorThemes[i].hidden = true;
        }
    }

})

//add an event listener for activities selection
registerCheck.addEventListener('change', (e) => {
    const dataCost = parseInt(e.target.getAttribute('data-cost'))
    //for each checked i want to add to the total cost
    if(e.target.checked) {
        totalCost += dataCost;
    }else {
        totalCost -= dataCost;
    }
    activitesCost.innerHTML = `Total: $${totalCost}`;
     
})

paymentForm.value = 'credit-card'
paypal.style.display = "none";
bitcoin.style.display = "none";

paymentForm.addEventListener('change', (e) => {
    const paymentValue = e.target.value;
    const paymentMethods = [credit, paypal, bitcoin]

    for (let i = 0; i < paymentMethods.length; i++) {
        if (paymentValue === paymentMethods[i].getAttribute('id')) {
            paymentMethods[i].style.display = "block";
        } else {
            paymentMethods[i].style.display = "none";
        }
    }
});
//form validation 
const passed = (test) => {
    let parentElement = test.parentElement;
    parentElement.classList.add('valid');
    parentElement.classList.remove('not-valid');
}
const failed = (test) => {
    let parentElement = test.parentElement;
    parentElement.classList.add('not-valid');
    parentElement.classList.remove('valid');
}
//name validation
const nameVal = () => {
    const nameField = nameInput.value;
    const nameTest = /\s/g.test(nameField);
    if (!nameTest || nameField.length == 0) {
        failed(nameInput);
        nameHint.style.display = "block";
    } else {
        passed(nameInput);
    }
    return nameTest;
}

//email address
const emailVal = () => {
    const emailField = emailInput.value;
    const emailTest = /^[^@]+@[^@.]+\.[A-Z]+$/i.test(emailField);
    if (!emailTest || emailField.length == 0) {
        failed(emailInput);
        emailHint.style.display = "block";
    } else {
        passed(emailInput);
    }
    return emailTest;
}
//register
const activitesVal = () => {
    let actTest = totalCost > 0
     if(!actTest) {
    actHints.style.display = "block";
    failed(registerCheck);
    } else {
        passed(registerCheck); 
    }
    return actTest
   }
//Credit section
const creditVal = () => {
    const ccNum = cardNum.value;
    const creditTest = /^[\d]{13,16}$/.test(ccNum);
    if (!creditTest || ccNum.length < 13) {
        ccHint.style.display = "block";
        failed(cardNum);
    } else {
        passed(cardNum);
    }
    return creditTest
}
const zipVal = () => {
    const zipNum = zipCode.value;
    const zipTest = /^[\d]{5}$/.test(zipNum);
    if (!zipTest || zipNum.length < 5) {
        zipHint.style.display = "block";
        failed(zipCode);
    } else {
        passed(zipCode);
    }
    return zipTest
}
const cvvVal = () => {
    const cvv = cvvNum.value;
    const cvvTest = /^[\d]{3}$/.test(cvv);
    if (!cvvTest || cvv.length < 3) {
        cvvHint.style.display="block";
        failed(cvvNum);
    } else {
        passed(cvvNum);
    }
    return cvvTest
}

//accessibility
allInputBox.forEach(e => {
    e.addEventListener('focus', function () {
        e.parentElement.className='focus';
    });
    e.addEventListener('blur', function () {
        e.parentElement.classList.remove('focus');
    });
})

form.addEventListener('submit', (e) => {
    e.preventDefault() // to prevent refresh
    //if all are true submit name, email, activities
    if (!nameVal()) {
        e.preventDefault();
    } else{
        nameInput.classList.remove('error-border');
    }
    if (!emailVal()) {
        e.preventDefault();
    } else{
        emailInput.classList.remove('error-border')
    }
    if(!activitesVal()) {
        e.preventDefault();
    }
    if (paymentForm.value === 'credit-card') {
        if (!creditVal()) {
            e.preventDefault()
        } else {
            cardNum.classList.remove('error-border')
        }
        if (!zipVal()) {
            e.preventDefault()
        } else{
            zipCode.classList.remove('error-border')
        }
        if (!cvvVal()) {
            e.preventDefault()
        } else{
            cvvNum.classList.remove('error-border')
        }
    }
})
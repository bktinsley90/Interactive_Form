//Focus on the Name Field by default
document.getElementById('name').focus();
//Job Role section
//grab the values from HTML and store in a variable
const jobRole = document.getElementById('title');
const otherRole = document.getElementById('other-job-role');
//otherRole should be hidden on start
otherRole.style.display = 'none';
//create a listener for jobrole that has a function to hide/unhide
jobRole.addEventListener('change', (e) => {
    e.preventDefault()
    const jobValue = e.target.value 
    if(jobValue === 'other'){
        otherRole.style.display = 'block';
     } else {
         otherRole.style.display = 'none';
     }
});
//T-shirt info section
//disable the color select element
const colorSelect = document.getElementById('color')
colorSelect.style.display = 'none'
 
//set variables for design and color section
const designSelect = document.getElementById('design');
const colorThemes = colorSelect.children;
//program the design select element to listen for user changes
designSelect.addEventListener('change',(e)=>{
    colorSelect.style.display = 'block';
    themeSelect = e.target.value;
    //console.log(themeSelect)
    colorThemes[0].textContent = 'Please select a color';
    color.value = 'Please select a color';

    //create a loop that goes through the options
    for(let i =0; i < colorThemes.length; i++){
        let dataTheme = colorThemes[i].getAttribute('data-theme');
        //compare the two if they match show themes 
        if(themeSelect === dataTheme){
            colorThemes[i].hidden =false;
        }else if(themeSelect !== dataTheme){
            colorThemes[i].hidden = true;
        }
    }

})
//register for activites section
//program the register for activities section to listen for user changes 
const registerCheck = document.getElementById('activities');
const activitesCost = document.getElementById('activities-cost');
//add an event listener for activities selection
registerCheck.addEventListener('change', () => {
    let totalCost = 0;
   //console.log(dataCost) 
   //for each checked i want to add to the total cost
   const checkBoxList = document.querySelectorAll('input[type="checkbox"]:checked');
   for(let i = 0; i< checkBoxList.length;i++){
       totalCost += parseInt(checkBoxList[i].getAttribute('data-cost'))
   }
   activitesCost.innerHTML = `Total: $${totalCost}`;
})

//Payment info section
//set the variable to the payment select ID
const paymentForm = document.getElementById('payment').options.value;
const paymentOptions = document.getElementsByTagName('option').value


//console.log(paymentOptions)
// paymentForm.addEventListener('change', (e)=>{
//     const paymentValue = e.target.value;
//     const paymentMethods = ['creditCard', 'paypal','bitcoin'];

//     for(let i =0; i < paymentMethods.length; i++){
//         const paymentID = paymentMethods[i];
//         if(paymentValue === paymentID){
//             paymentMethods[i].hidden = false;
//         }else{
//             paymentMethods[i].hidden = true;
//         }
//     }
// });

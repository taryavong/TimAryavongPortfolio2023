// Define variables
const myButton = document.querySelector('#myButton');
const myHeading = document.querySelector('#myHeading');
const myHeader = document.querySelector('#myHeader');
const toggleButton = document.getElementById('#headerToggle');

let isTextVisible = true;
// a quick little toggle button using a boolean if condition
myButton.addEventListener('click', () => {
  //if true say hello, if false say goodbye
  if(isTextVisible){
    myHeading.textContent = 'Hello, World!'
  } else {;
    myHeading.textContent = 'Goodbye, World!'
  }
  //make bool false so that clicking the button again prompts the else condition instead
  isTextVisible = !isTextVisible;
});

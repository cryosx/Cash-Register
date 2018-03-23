let numButtons = document.getElementsByClassName('num_button');

for (let i = 0; i < numButtons.length; i++) {
    numButtons[i].addEventListener('click', function() {
        console.log(arguments);
        console.log(this.innerHTML);
    })
    
}

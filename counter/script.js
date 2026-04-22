
const countEl = document.getElementById("count");
const message = document.getElementById("message");

const increment = document.getElementById("increment");
const decrement = document.getElementById("decrement");

let count = 0;
const MIN = 0;
const MAX = 10;

function handleIncrement(){
    if (count >= MAX) return;
    count++;
    render();
}

function handleDecrement(){
    if (count <= MIN) return;
    count--;
    render();
}

function render(){
    countEl.textContent = count;
    
    if(count === MAX) {
        message.textContent = "Max reached" 
    } else if (count === MIN){
        message.textContent = "Min reached"
    } else {
        message.textContent = "";
    }

    increment.disabled = count === MAX;
    decrement.disabled = count === MIN;
}

increment.addEventListener("click", handleIncrement)

decrement.addEventListener("click", handleDecrement)


render();
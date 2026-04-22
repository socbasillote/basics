
const countEl = document.getElementById("count");
const message = document.getElementById("message");

const increment = document.getElementById("increment");
const decrement = document.getElementById("decrement");

let count = 0;
const MIN = 0;
const MAX = 10;

let hasInteracted = false;


function handleIncrement(){
    hasInteracted = true;
    if (count >= MAX) return;
    count++;
    render();
}

function handleDecrement(){
    hasInteracted = true;
    if (count <= MIN) return;
    count--;
    render();
}

function renderCount(){
    countEl.textContent = count;
}

function messageFunc() {
    if (!hasInteracted){
        message.textContent = "";
        return
    }

    if(count === MAX) {
        message.textContent = "Max reached" 
    } else if (count === MIN){
        message.textContent = "Min reached"
    } else {
        message.textContent = "";
    }
    
}
function buttons() {
    let disMax = count === MAX;
    let disMin = count === MIN;

    increment.disabled = disMax;
    decrement.disabled = disMin;
}

function render(){
    renderCount();
    messageFunc();
    buttons();
}

increment.addEventListener("click", handleIncrement)
decrement.addEventListener("click", handleDecrement)



render();
const inputField = document.getElementById("inputField");
const submitBtn = document.getElementById("submitBtn");
const remaningCount = document.getElementById("remaningCount");
const textMessage = document.getElementById("textMessage");

const exceedMsg = document.createElement("p")


const maxChar = 50;

exceedMsg.textContent = "Limit exceeded";
exceedMsg.style.display = "none";
textMessage.appendChild(exceedMsg);


function realTimeCount() {
    return inputField.value.length
}

function button(length){
    if(length > maxChar){
        submitBtn.disabled = true;
        
    } else {
        submitBtn.disabled = false;
    }
}
function styleEffect(length){

    if (length > maxChar) {
        inputField.classList.add("error");
        inputField.classList.remove("warning");
    }  else if (length > 40) {
        inputField.classList.add("warning");
    }else {
        inputField.classList.remove("error");
        inputField.classList.remove("warning");
    }
    
}

function renderMessage(length) {
    exceedMsg.style.display = length > maxChar ? "block" : "none";
}
function remainingC(length){
    const total = maxChar - length;
    remaningCount.textContent = total;
}



function render(){
    let length = realTimeCount();

    button(length);
    remainingC(length)
    styleEffect(length);
    renderMessage(length);
}


inputField.addEventListener("input", render);

render();
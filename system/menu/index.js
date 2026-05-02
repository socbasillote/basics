const select = document.getElementById("select");

const trigger = select.querySelector("[data-select-trigger]"); // 1
const label = select.querySelector("[data-select-label]");
const menu = select.querySelector("[data-select-menu");
const options = Array.from(select.querySelectorAll(".select__option"));

console.log(options);
const state = {
    isOpen: false,
    selectedIndex: -1,
    focusedIndex: 0
}

// ------- RENDER -------
function render(){
    select.classList.toggle("open", state.isOpen);
    
    options.forEach((opt, i) => {
        opt.classList.toggle("focused", i === state.focusedIndex);
        opt.classList.toggle("selected"< i === state.selectedIndex);
    });

    if (state.selectedIndex >= 0) {
        label.textContent = options[state.selectedIndex].textContent;
    }
}

// ------ OPEN / CLOSE --------
function open() {
    state.isOpen = true;
    state.focusedIndex = state.selectedIndex >= 0 ? state.selectedIndex : 0;
    render();
}

function close() {
    state.isOpen = false;
    render();
}

// ------- SELECT ---------
function selectOption(index) {
    state.selectedIndex = index;
    close();
}


// --------- EVENTS ----------

// click trigger
trigger.addEventListener("click", () => {
    state.isOpen ? close() : open();
})

// click option
menu.addEventListener("click", (e) => {
    const option = e.target.closest(".select__option");
    if (!option) return;

    const index = options.indexOf(option);
    console.log(index);
    selectOption(index);
})
const modal = document.getElementById("modal");
const btnModal = document.getElementById("btnModal");
const closeBtn = document.querySelector(".modal-close");
const overlay = document.querySelector(".modal-overlay");

let isOpen = false; // state

const focusableSelectors = `
    a[href], button, textarea, input, select,
    [tabIndex]:not([tabindex="-1"])
`;

const focusableElements = modal.querySelectorAll(focusableSelectors);
const firstEl = focusableElements[0];
const lastEl = focusableElements[focusableElements.length -1];
console.log(focusableElements)
console.log(focusableElements.length -1)
// Set initial focus
firstEl.focus();


function openModal(){
    if (isOpen) return;

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // lock scroll

    document.addEventListener("keydown", handleEscape);
    isOpen = true;
}
function closeModal(){
    if (!isOpen) return;

    modal.classList.add("hidden");
    document.body.style.overflow = ""; //restore scroll

    document.removeEventListener("keydown", handleEscape);
    isOpen = false;
};


// -- Events ----
function handleEscape(e){
    if (e.key === "Escape"){
        closeModal();
    }
}

overlay.addEventListener("click", (e) => {
    if (e.target === overlay){
        closeModal();
    }
});

btnModal.addEventListener("click", openModal);
closeBtn.addEventListener("click",closeModal);

modal.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        if (e.shiftKey) {
            // Shift + Tab (backwards)
            if (document.activeElement === firstEl){
                e.preventDefault();
                lastEl.focus();
            }
        } else {
            // tab (forward)
            if (document.activeElement === lastEl) {
                e.preventDefault();
                firstEl.focus();
                console.log(firstEl.focus())
            }
        }
        
    }
})
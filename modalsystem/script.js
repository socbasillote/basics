const modal = document.getElementById("modal");
const btnModal = document.getElementById("btnModal");
const closeBtn = document.querySelector(".modal-close");
const overlay = document.querySelector(".modal-overlay");

btnModal.addEventListener("click",(e) => {
    openModal();
});

function openModal(){
    modal.classList.remove("hidden");
}
function closeModal(){
    modal.classList.add("hidden");
    //modalBody.innerHTML = "";
    console.log("heloo")
};


overlay.addEventListener("click", closeModal);
closeBtn.addEventListener("click",closeModal);
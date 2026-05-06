export default class Modal{
    
    constructor(root) {
        this.root = document.getElementById(root);
        this.btn = document.querySelector("[data-btn]");
        this.modalContent = document.querySelector(".modalContent");
        this.modal = document.querySelector('#modal');

        this.init();
    }

    init() {
        this.btn.addEventListener("click", () => this.open());

        this.root.addEventListener("click", (e) => {
            if (!e.target.closest(".modalContent")) {
                this.close();
            }
        });

        this.modalContent.addEventListener("click", (e) => {
            if (e.target.closest(".closeModal")) {
                this.close();
            }
        });
    }

    open(){
        this.modal.classList.add('active');
    }

    close(){
        this.modal.classList.remove('active');
    }
}
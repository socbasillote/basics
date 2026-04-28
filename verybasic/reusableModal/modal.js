
class Modal {
    static activeStack = []; // trakc open modals (for esc handling)
    static initialized = false;

    constructor(selector) {
        this.modal = document.querySelector(selector);
        if (!this.modal) return;

        this.id = selector;

        // bind instance methods
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);

        // register this instance globally
        Modal.instances = Modal.instances || {};
        Modal.instances[selector] = this;

        // initialize global linsteners once
        if (!Modal.initialized) {
            Modal.initGlobalEvents();
            Modal.initialized = true;
        }
    }

    // -------- INSTANCE METHODS ---------
    open() {
        this.modal.classList.add("active");
        document.body.style.overflow = "hidden";

        // push to stack
        Modal.activeStack.push(this);
    }

    close() {
        this.modal.classList.remove("active");

        // remove from stack
        Modal.activeStack = Modal.activeStack.filter(m => m !== this);

        if (Modal.activeStack.length === 0) {
            document.body.style.overflow = "";
        }
    }

    // --------- STATIC GLOBAL EVENTS -----------
    static initGlobalEvents() {
        // CLICK HANDLING
        document.addEventListener("click", (e) => {
            const openBtn = e.target.closest("[data-modal-open]");
            const closeBtn = e.target.closest("[data-modal-close]");

            // OPEN
            if (openBtn) {
                const selector = openBtn.dataset.modalOpen;
                const instance = Modal.instances?.[selector];
                if (instance) instance.open();
                return;
            }

            // CLOSE or (button or overlay)
            if (closeBtn) {
                const modalEl = closeBtn.closest(".modal");
                const instance = Modal.instances?.[`#${modalEl.id}`];
                if (instance) instance.close();
                return;
            }
        });

        // ESC KEY ( close top-most only)
        document.addEventListener("keydown", (e) => {

             
            if (e.key === "Escape") {
                const top = Modal.activeStack.at(-1);
                if (top) top.close();
            }
        })
    }
}

export default Modal;
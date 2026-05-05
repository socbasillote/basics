// Modal.js
export default class Modal {
  static instances = {};

  constructor(selector) {
    this.modal = document.querySelector(selector);
    if (!this.modal) return;

    this.id = selector;
    Modal.instances[selector] = this;

    this.init();
  }

  init() {
    document.addEventListener("click", (e) => {
      const openBtn = e.target.closest("[data-modal-open]");
      const closeBtn = e.target.closest("[data-modal-close]");
        console.log('dasdsa')
      if (openBtn) {
        const id = openBtn.dataset.modalOpen;
        Modal.instances[id]?.open();
      }

      if (closeBtn) {
        this.close();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.close();
    });
  }

  open() {
    this.modal.classList.add("active");
  }

  close() {
    this.modal.classList.remove("active");
  }
}
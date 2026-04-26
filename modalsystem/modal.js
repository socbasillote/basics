class Modal {
  constructor(modalEl) {
    this.modal = modalEl;
    this.focusableSelectors = `
      a[href], button, textarea, input, select,
      [tabindex]:not([tabindex="-1"])
    `;
    
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  open() {
    this.previousFocus = document.activeElement;

    this.modal.hidden = false;

    this.focusableElements = this.modal.querySelectorAll(this.focusableSelectors);
    this.firstEl = this.focusableElements[0];
    this.lastEl = this.focusableElements[this.focusableElements.length - 1];

    this.firstEl?.focus();

    this.modal.addEventListener('keydown', this.handleKeydown);
  }

  close() {
    this.modal.hidden = true;

    this.modal.removeEventListener('keydown', this.handleKeydown);

    this.previousFocus?.focus();
  }

  handleKeydown(e) {
    if (e.key === 'Escape') {
      this.close();
      return;
    }

    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === this.firstEl) {
          e.preventDefault();
          this.lastEl.focus();
        }
      } else {
        if (document.activeElement === this.lastEl) {
          e.preventDefault();
          this.firstEl.focus();
        }
      }
    }
  }
}
export default Modal;
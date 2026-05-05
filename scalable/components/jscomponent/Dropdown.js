export default class Dropdown {
    constructor(root) {
        this.root = document.querySelector(root);
        if (!this.root) return;

        this.trigger = this.root.querySelector("[data-dropdown-trigger]");
        this.menu = this.root.querySelector("[data-dropdown-menu]");

        this.isOpen = false;

        this.init();
    }

    init() {
        this.trigger.addEventListener("click", () => {
            this.toggle();
        });
        
        document.addEventListener("click", (e) => {
            if (!this.root.contains(e.target)) {
                this.close();
            }
        });
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.render();
    }

    open() {
        this.isOpen = true;
        this.render();
    }

    close(){
        this.isOpen = false;
        this.render();
    }

    render() {
        this.root.classList.toggle("open", this.isOpen);
    }
}
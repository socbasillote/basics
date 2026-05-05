export default class Tabs{
    constructor(root) {
        this.root = document.querySelector(root);
        if (!this.root) return;

        this.tabs = this.root.querySelectorAll("[data-tab]");
        this.panels = this.root.querySelectorAll("[data-panel]");

        this.init();

        // Active first tab by default if none active
        const activeTab = this.root.querySelector("[data-tab].active");
        if (!activeTab && this.tabs.length) {
            this.activate(this.tabs[0].dataset.tab);
        }
    }

    init() {
        this.root.addEventListener("click", (e) => {
            const tab = e.target.closest("[data-tab]");
            if (!tab) return;

            this.activate(tab.dataset.tab);
        });
    }

    activate(id) {
        this.tabs.forEach(t =>
            t.classList.toggle("active", t.dataset.tab === id)
        );

        this.panels.forEach(p =>
            p.classList.toggle("active", p.dataset.panel === id)
        );
    }
}

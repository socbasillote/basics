export default class Practice {
    constructor(root) {
        this.root = document.querySelector(root);
        this.btn = document.querySelectorAll('[data-btn]');
        this.panel = document.querySelectorAll('[data-panel]');
        this.init();
    }

    init(){
        this.root.addEventListener("click", (e) => {
            const btn = e.target.closest('[data-btn]');
            if(!btn) return;
            console.log(btn);

            this.activate(btn.dataset.btn);
        })
        
    }

    activate(id){
        this.btn.forEach(b => 
            b.classList.toggle("active", b.dataset.btn === id)
        );

        this.panel.forEach(p =>
            p.classList.toggle("open", p.dataset.panel === id)
        );
    }
}
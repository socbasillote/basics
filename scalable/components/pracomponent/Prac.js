export default class Practice{
    
    constructor(root){
        this.root = document.querySelector(root);
       this.innerHtml = this.root.querySelector('.hide');
       this.btn = this.root.querySelector("[data-btn]");
       this.para = this.root.querySelectorAll("[data-para]");
        this.init();
    }

    init(){
        this.root.addEventListener("click", (e) => {
            const btn = e.target.closest("[data-btn]");
            if(!btn) return;
            console.log(btn.dataset.btn);
            this.activate(btn.dataset.btn);
        })
    };

    activate(id){
        this.para.forEach(p => 
            p.classList.toggle("active", p.dataset.para === id)
        );
    }
}
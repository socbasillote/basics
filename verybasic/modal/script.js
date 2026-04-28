// OPEN MODAL
document.addEventListener("click", function (e) { 
    const openBtn = e.target.closest("[data-modal-open]");
    
    if (openBtn) {
        console.log(openBtn.dataset);
        const selector = openBtn.dataset.modalOpen;
        
        console.log(selector)
        const modal = document.querySelector(selector);
        if (modal) modal.classList.add("active");
        return;
    }

    // CLOSE MODAL (button or overlay)
    const closeBtn = e.target.closest("[data-modal-close]");
    if (closeBtn) {
        const modal = closeBtn.closest(".modal");
        if (modal) modal.classList.remove("active");
        return;
    }
});

// ESC KEY CLOSE
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        document.querySelectorAll(".modal.active").forEach(modal => {
            modal.classList.remove("active");
        });
    }
})
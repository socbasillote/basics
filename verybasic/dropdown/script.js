const dropdown = document.getElementById("dropdown");

// Toggle dropdown
document.addEventListener("click", function (e) {
    const button = e.target.closest("[data-dropdown-button]");

    // If clicking the button -> toggle
    if (button) {
        const parent = button.closest(".dropdown");
        parent.classList.toggle("active");
        return;
    }

    // If clicking outside -> close ALL dropdowns
    const allDropdown = document.querySelectorAll(".dropdown");

    allDropdown.forEach(drop => {
        if (!drop.contains(e.target)){
            drop.classList.remove("active");
        }
    });
});

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        document
            .querySelectorAll(".dropdown")
            .forEach(drop => drop.classList.remove("active"));
    }
})
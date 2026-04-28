const dropdown = document.getElementById("dropdown");

// Toggle dropdown
document.addEventListener("click", function (e) {
    const button = e.target.closest("[data-dropdown-button]");
 //   console.log(button);
    // If clicking the button -> toggle
    if (button) {
        const currentDropdown = button.closest(".dropdown");

        //Close sibling dropdowns (save level)
        const parentMenu = currentDropdown.parentElement;
        const siblingDropdowns = parentMenu.querySelectorAll(":scope > .dropdown");

        siblingDropdowns.forEach(drop => {
            if (drop !== currentDropdown) {
                drop.classList.remove("active");
            }
        })

        // Toggle current
        currentDropdown.classList.toggle("active");
        return;
    }

    // If clicking outside -> close ALL dropdowns
    const allDropdown = document.querySelectorAll(".dropdown");
    console.log(allDropdown)
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
const app = document.getElementById("filterApp");

let currentFilter = "all";

const items = app.querySelectorAll(".item");
const buttons = app.querySelectorAll(".filter-btn");



// --------- RENDER --------
function render(filter) {
    currentFilter = filter;

    items.forEach(item => {
        const status = item.dataset.status;

        if (filter === "all" || status === filter) {
            item.classList.remove("hidden");
        } else {
            item.classList.add("hidden");
        }
    });

    // update active button
    buttons.forEach(btn => btn.classList.remove("active"));

    const activeBtn = app.querySelector(
        `.filter-btn[data-filter="${filter}"]`
    );

    if (activeBtn) activeBtn.classList.add("active");

    const count = [...items].filter(item => {
    const status = item.dataset.status;
    return currentFilter === "all" || status === currentFilter;
}).length;

console.log("Visible items:", count);
}

// ------- EVENTS -------
app.addEventListener("click", function (e) {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;

    const filter = btn.dataset.filter;
    render(filter);
})

const count = [...items].filter(item => {
    const status = item.dataset.status;
    return currentFilter === "all" || status === currentFilter;
}).length;

console.log("Visible items:", count);
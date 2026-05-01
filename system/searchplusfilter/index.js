const app = document.getElementById("app");

const items = app.querySelectorAll(".item");
const buttons = app.querySelectorAll(".filter-btn");
const searchInput = app.querySelector("[data-search]");


// -------- STATE --------
const state = {
    filter: "all",
    search: "",
};

// -------- RENDER --------
function render() {
    const searchLower = state.search.toLowerCase();

    items.forEach(item => {
        const status = item.dataset.status;
        const text = item.textContent.toLowerCase();

        const matchFilter = 
            state.filter === "all" || status === state.filter;

        const matchSearch = text.includes(searchLower);

        if (matchFilter && matchSearch) {
            item.classList.remove("hidden");
        } else {
            item.classList.add("hidden");
        }
        console.log(text);
    });

    // update active button
    buttons.forEach(btn => btn.classList.remove("active"));

    const activeBtn = app.querySelector(
        `.filter-btn[data-filter=${state.filter}]`
    );

    if (activeBtn) activeBtn.classList.add("active");
}

// --------- EVENTS ----------

// Filter click
app.addEventListener("click", function (e) {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;

    state.filter = btn.dataset.filter;
    render();
    console.log(state.filter);
})

// Search input (real-time)
searchInput.addEventListener("input", function (e) {
    state.search = e.target.value;
    render();
});

render();
const accordion = document.querySelector(".accordion");

accordion.addEventListener("click", (e) => {
    const header = e.target.closest(".header");
    if (!header) return;

    const targetId = header.dataset.target;
    const content = document.querySelector(`.content[data-id="${targetId}"]`);
    console.log(content);

    if (!content) return;
    const item = content.closest(".item");
    const isActive = item.classList.contains("active");

    // close all first
    document.querySelectorAll(".item")
        .forEach(item => item.classList.remove("active"));

    // if it was not active before, open it
    if (!isActive) {
        item.classList.add("active");
    }
})
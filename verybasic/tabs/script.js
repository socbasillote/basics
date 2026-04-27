const tabsContainer = document.getElementById("tabs");

// Event Delegation (important)
tabsContainer.addEventListener("click", function (e) {
    const clickedTab = e.target.closest(".tab");
    console.log(clickedTab)
    // Guard clause
    if (!clickedTab) return;

    const tabId = clickedTab.dataset.tab;

    // Remove active from all tabs
    const allTabs = tabsContainer.querySelectorAll(".tab");
    allTabs.forEach(tab => tab.classList.remove("active"));

    // Remove active from all content
    const allPanels = tabsContainer.querySelectorAll(".tab-panel");
    allPanels.forEach(panel => panel.classList.remove("active"));

    // Active clicked tab
    clickedTab.classList.add("active");

    // Active matching content
    const targetPanel = tabsContainer.querySelector(
        `.tab-panel[data-content="${tabId}"]`
    );

    if (targetPanel) {
        targetPanel.classList.add("active");
    }
})
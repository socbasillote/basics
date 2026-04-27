const tabsContainer = document.getElementById("tabs");

// Event Delegation (important)
tabsContainer.addEventListener("click", function (e) {
    const clickedTab = e.target.closest(".tab");
    
    // Guard clause
    if (!clickedTab) return;

    const tabId = clickedTab.dataset.tab;

    const allTabs = tabsContainer.querySelectorAll(".tab");
    const allPanels = tabsContainer.querySelectorAll(".tab-panel");

    allTabs.forEach(tab => tab.classList.remove("active"));
    // Active clicked tab
    clickedTab.classList.add("active");

    
    allPanels.forEach(panel => {
        if( panel.classList.contains("active")) {
            panel.classList.remove("active");
        }
    });

    // Active matching content
    const targetPanel = tabsContainer.querySelector(
        `.tab-panel[data-content="${tabId}"]`
    );

    if (targetPanel) {
        // slight delay ensures transition kicks in properly
        requestAnimationFrame(() => {
            targetPanel.classList.add("active");
        })
    }
})
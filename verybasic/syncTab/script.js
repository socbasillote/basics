const tabs = document.getElementById("tabs");

const allTabs = tabs.querySelectorAll(".tab");
const allPanels = tabs.querySelectorAll(".tab-panel");

// -------- RENDER --------
function activateTab(tabId) {
    // remove active
    allTabs.forEach(t => t.classList.remove("active"));
    allPanels.forEach(p => p.classList.remove("active"));

    // activate matching tab
    const tabBtn = tabs.querySelector(`[data-tab="${tabId}"]`);
    const panel = document.getElementById(tabId);

    if (tabBtn && panel) {
        tabBtn.classList.add("active");
        panel.classList.add("active");
    }
}

// --------- INITIAL LOAD ---------
function initFromHash() {
    const hash = window.location.hash.replace("#", "");

    if (hash) {
        activateTab(hash);
    } else {
        // default tab
        activateTab("tab-1");
    }
}


// ---------- CLICK HANDLER ---------
tabs.addEventListener("click", function (e) {
    const tab = e.target.closest(".tab");
    if (!tab) return;

    const tabId = tab.dataset.tab;

    window.location.hash = tabId;
});


// ----------- HASH CHANGE LISTENER -----------
window.addEventListener("hashchange", function () {
    const hash = window.location.hash.replace("#", "");
    activateTab(hash);
    console.log(hash);
})


// ---------- INIT ---------
initFromHash();
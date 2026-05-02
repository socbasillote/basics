const form = document.getElementById("form");

const steps = form.querySelectorAll(".step");
const inputs = form.querySelectorAll("[data-field]");
const progressBar = form.querySelector("[data-progress]");

const state = {
    step: 0,
    data: {
        email: "",
        password: "",
        name: ""
    }
};

// ------- VALIDATION -------
function validateStep() {
    const errors = [];

    if (state.step === 0) {
        if (!state.data.email) errors.push("Email required");
        if (!state.data.password || state.data.password.length < 6) {
            errors.push("Password must be at least 6 chars");
        }
    }

    if (state.step === 1) {
        if (!state.data.name) errors.push("Name required");
    }

    return errors;
}


// ------- RENDER -------
function render() {
    // Show correct step
    steps.forEach((step, i) => {
        step.classList.toggle("active", i === state.step);
    });

    // Update progress
    const progress = ((state.step) / (steps.length - 1)) * 100;
    progressBar.style.width = `${progress}%`;

    // Update buttons
    const prevBtn = form.querySelector('[data-action="prev"]');
    const nextBtn = form.querySelector('[data-action="next"]');
    const submitBtn = form.querySelector('[data-action="submit"]');

    prevBtn.hidden = state.step === 0;
    nextBtn.hidden = state.step === steps.length - 1;
    submitBtn.hidden = state.step !== steps.length - 1;
}

// -------- NAVIGATION ---------
function next() {
    const errors = validateStep();

    if (errors.length > 0) {
        alert(errors.join("\n"));
        return;
    }

    if (state.step < steps.length - 1) {
        state.step++;
        render();
    }
}

function prev() {
    if (state.step > 0) {
        state.step--;
        render();
    }
}

// -------- EVENTS ---------


// Input update
form.addEventListener("input", (e) => {
    const input = e.target.closest("[data-field]");
    if (!input) return;

    const field = input.dataset.field;
    state.data[field] = input.value;
})


// Buttons
form.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;

    const action = btn.dataset.action;

    if (action === "next") next();
    if (action === "prev") prev();
});

// Submit
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const errors = validateStep();
    if (errors.length > 0 ) {
        alert(errors.join("\n"));
        return;
    }
    console.log("FINAL DATA: ",state.data);
})


// ------ INIT ------
render();
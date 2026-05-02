const form = document.getElementById("form");
const inputs = form.querySelectorAll("[data-field]");


const state = {
    email: "",
    password: "",
    touched: {
        email: false,
        password: false
    },
    errors: {
        email: "",
        password: ""
    }
};

// ---------- VALIDATION -----------
function validate() {
    const errors = {};

    // Email
    if (!state.email) {
        errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(state.email)) {
        errors.email = "Invalid email format";
    }

    // Password
    if (!state.password) {
        errors.password = "Password is required";
    } else if (state.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
    }

    state.errors = errors;
}

// ------ RENDER ---------
function render() {
    inputs.forEach(input => {
        const field = input.dataset.field;
        const errorEl = form.querySelector(`[data-error="${field}"]`);

        // show error only if touched
        if (state.touched[field] && state.errors[field]) {
            errorEl.textContent = state.errors[field];
            input.classList.add("invalid");
        } else {
            errorEl.textContent = "";
            input.classList.remove("invalid");
        }
    });
}


// ------- EVENTS --------


// Input (real-time typeing)
form.addEventListener("input", (e) => {
    const input = e.target.closest("[data-field]");
    if (!input) return;
    console.log(input);
    const field = input.dataset.field;
    state[field] = input.value;

    validate();
    render();
});

// Blur (mark as touched)
form.addEventListener("blur", (e) => {
    const input = e.target.closest("[data-field]");
    console.log(input)
    if (!input) return;

    const field = input.dataset.field;
    console.log(field);
    state.touched[field] = true;

    validate();
    render();
}, true);

// Submit
form.addEventListener("submit", (e) => {
    e.preventDefault();

    // mark all as touched
    Object.keys(state.touched).forEach(key => {
        state.touched[key] = true;
    });

    validate();
    render();

    const hasErrors = Object.keys(state.errors).length > 0;

    if (!hasErrors) {
        console.log("Form submittted: ", {
            email: state.email,
            password: state.password
        });
    }
})


const state = {
    counters: []
};

function generateId() {
    return Date.now() + Math.random();
}

function setState(updater){
    const newState = updater(state);

    Object.assign(state, newState);

    render();
}

function addCounter() {
    setState((currentState) => {
        return {
            counters: [
                ...currentState.counters,
                {
                    id: generateId(),
                    value: 0
                }
            ]
        };
    });
}

function updateCounter(id, change) {
    setState((currentState) => {
        return {
            counters: currentState.counters.map(counter => {

                if (counter.id !== id) {
                    return counter;
                }

                return {
                    ...counter,
                    value: counter.value + change
                };
            })
        };
    });
}

function resetCounter(id) {
    setState((currentState) => {
        return {
            counters: currentState.counters.map(counter => {

                if (counter.id !== id) {
                    return counter;
                }

                return {
                    ...counter,
                    value: 0
                };

            })
        }
    })
}

function getTotal() {
    return state.counters.reduce((sum, counter) => {
        return sum + counter.value;
    }, 0);
}

function getHighest() {
    if (state.counters.length === 0) return 0;

    return Math.max(
        ...state.counters.map(counter => counter.value)
    );
}

function getLowest() {
    if (state.counters.length === 0) return 0;

    return Math.min(
        ...state.counters.map(counter => counter.value)
    );
}

function render() {
    const counterList = document.getElementById("counter-list");

    counterList.innerHTML = state.counters.map(counter => {
        return `
            <div class="counter-card">

                <div class="counter-value">
                    ${counter.value}
                </div>

                <div class="counter-controls">

                    <button
                        data-action="decrement"
                        data-id="${counter.id}"
                    >
                    -
                    </button>

                    <button
                        data-action="increment"
                        data-id="${counter.id}"
                    >
                    +
                    </button>

                    <button
                        data-action="reset"
                        data-id="${counter.id}"
                    > 
                        Reset 
                    </button>

                </div>
            </div>
        `;
    }).join("");

    document.getElementById("total-value").textContent = getTotal();

    document.getElementById("highest-value").textContent = getHighest();

    document.getElementById("lowest-value").textContent = getLowest();
}

document
    .getElementById('counter-list')
    .addEventListener("click", (event) => {
        
        const button = event.target.closest("button");

        if (!button) return;

        const action = button.dataset.action;
        const id = Number(button.dataset.id);

        switch (action) {
            case "increment":
                updateCounter(id, 1);
                break;
            case "decrement":
                updateCounter(id, -1);
                break;
            case "reset":
                resetCounter(id);
                break;
        }
    });


    document
        .getElementById("add-counter-btn")
        .addEventListener("click", addCounter);

    
render();

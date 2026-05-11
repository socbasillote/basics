import { getHighest, getLowest, getTotal } from "./computedState.js";

const initialState = {
    counters: [],
    history: [],
    past: []
};

const savedState = localStorage.getItem("counter-app-state");

const state = savedState
    ? JSON.parse(savedState)
    : initialState;

function generateId() {
    return Date.now() + Math.random();
}

function setState(updater){
    const newState = updater(state);

    Object.assign(state, newState);

    localStorage.setItem(
        "counter-app-state",
        JSON.stringify(state)
    );

    render();
}

function addCounter() {
    setState((currentState) => {

        const newCounter = {
            id: generateId(),
            value: 0
        };
        
        return {
            counters: [
                ...currentState.counters,
                newCounter
            ],

            past: [
                ...currentState.past,
                createSnapshot()
            ],

            history: [
                createHistoryEntry("Added new counter"),
                ...currentState.history
            ]
        };
    });
    console.log(state);
}

function updateCounter(id, change) {

    setState((currentState) => {

        const actionText = 
            change > 0
                ? "Incremented"
                : "Decremented";

        return {
            counters: currentState.counters.map(counter => {

                if (counter.id !== id) {
                    return counter;
                }

                return {
                    ...counter,
                    value: counter.value + change
                };
            }),

            past: [
                ...currentState.past,
                createSnapshot()
            ],

            history: [
                createHistoryEntry(
                    `${actionText} counter ${id}`
                ),
                ...currentState.history
            ]
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

            }),

            past: [
                ...currentState.past,
                createSnapshot()
            ],

            history: [
                createHistoryEntry(
                    `Reset counter ${id}`
                ),
                ...currentState.history
            ]
        };
    });
}

function createHistoryEntry(message) {
    return {
        id: generateId(),
        message,
        timestamp: new Date().toLocaleDateString()
    };
}

function createSnapshot() {
    return {
        counters: structuredClone(state.counters)
    };
}

function undo(){
    if (state.past.length === 0) {
        return;
    }

    const previousState = state.past[state.past.length - 1];

    setState((currentState) => {

        return {
            counters: previousState.counters,

            past: currentState.past.slice(0, -1),

            history: [
                createHistoryEntry("Undo action"),
                ...currentState.history
            ]
        };
    });
}

function render() {
    const counterList = document.getElementById("counter-list");
    const historyList = document.getElementById("history-list");

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

    historyList.innerHTML = 
        state.history.map(item => {
            return `
                <div class="history-item">
                    <span>${item.message}</span>
                    <small>${item.timestamp}</small>
                </div>
            `;
        }).join("");



    document.getElementById("total-value").textContent = getTotal(state);

    document.getElementById("highest-value").textContent = getHighest(state);

    document.getElementById("lowest-value").textContent = getLowest(state);
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

    document
        .getElementById("undo-btn")
        .addEventListener("click", undo);


render();

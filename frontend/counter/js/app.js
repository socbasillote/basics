import { getHighest, getLowest, getTotal } from "./computedState.js";
import { reducer } from "./reducer.js"
import { generateId } from "./utils.js";

const ACTIONS = {
    ADD_COUNTER: "ADD_COUNTER",
    INCREMENT: "INCREMENT",
    DECREMENT: "DECREMENT",
    RESET: "RESET",
    UNDO: "UNDO"
}

const initialState = {
    counters: [],
    history: [],
    past: []
};

const savedState = localStorage.getItem("counter-app-state");

const state = savedState
    ? JSON.parse(savedState)
    : initialState;


function setState(newState){

    Object.assign(state, newState);

    localStorage.setItem(
        "counter-app-state",
        JSON.stringify(state)
    );

    render();
}

function dispatch(action) {
    const newState = reducer(state, action, ACTIONS);

    setState(newState);
}


export function createSnapshot() {
    return {
        counters: structuredClone(state.counters)
    };
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
                
                dispatch({
                    type: ACTIONS.INCREMENT,
                    payload: { id }
                });

                break;


            case "decrement":
                
                dispatch({
                    type: ACTIONS.DECREMENT,
                    payload: { id }
                });
                
                break;


            case "reset":
                
                dispatch({
                    type: ACTIONS.RESET,
                    payload: { id }
                });

                break;
        }
    });


    document
        .getElementById("add-counter-btn")
        .addEventListener("click", () => {

            dispatch({
                type: ACTIONS.ADD_COUNTER
            });
        });

    document
        .getElementById("undo-btn")
        .addEventListener("click", () => {

            dispatch({
                type: ACTIONS.UNDO
            });
        });


render();

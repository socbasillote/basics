import { dispatch } from "../redux/reducer.js";
import { addTodo } from "../actions/todoActions.js";

const app = document.getElementById("app");

const todoInput = document.querySelector(".todoInput");
const addTodoBtn = document.querySelector(".addTodoBtn");

const priorities = document.getElementById("priority");
const filterPriority = document.getElementById("filterPriority");

export function setupEvents() {
    addTodoBtn.addEventListener("click", () => {
        addTodo(
            todoInput.value,
            Number(priorities.value)
        );

        todoInput.value = "";
    });

    app.addEventListener("click", handleClick);

    filterPriority.addEventListener(
        "change",
        handlePriorityFilter
    );
}

function handleClick(e) {
    const li = e.target.closest("[data-id]");

    if (li) {
        const id = li.dataset.id;

        if (e.target.closest(".deleteBtn")) {
            dispatch({
                type: "DELETE_TODO",
                payload: id
            });
        }

        if (e.target.closest(".updateBtn")) {
            dispatch({
                type: "UPDATE_TODO",
                payload: id
            });
        }

        if (e.target.closest(".saveBtn")) {
            const title =
                document.querySelector(".editInput")
                    .value;

            const priority = Number(
                document.getElementById("editPriority")
                    .value
            );

            dispatch({
                type: "SAVE_TODO",
                payload: {
                    id,
                    title,
                    priority
                }
            });
        }

        if (e.target.closest(".cancelBtn")) {
            dispatch({
                type: "CANCEL_UPDATE"
            });
        }

        if (e.target.closest(".checkBox")) {
            dispatch({
                type: "TOGGLE_TODO",
                payload: id
            });
        }
    }

    if (e.target.closest(".completeBtn")) {
        dispatch({
            type: "ACTIVE_TODO",
            payload: "COMPLETE"
        });
    }

    if (e.target.closest(".activeBtn")) {
        dispatch({
            type: "ACTIVE_TODO",
            payload: "ACTIVE"
        });
    }

    if (e.target.closest(".allBtn")) {
        dispatch({
            type: "ACTIVE_TODO",
            payload: "ALL"
        });
    }
}

function handlePriorityFilter(e) {
    const value = Number(e.target.value);

    if (value === 3) {
        dispatch({ type: "SORT_HIGH" });
    }

    if (value === 1) {
        dispatch({ type: "SORT_LOW" });
    }
}
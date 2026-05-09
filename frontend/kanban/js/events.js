import { addTask, deleteTask, updateTask } from "./state.js";
import { renderBoard } from "./render.js";
import { state } from "./state.js";

export function setupEvents() {
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("add-task-btn")) {
            const columnId = e.target.dataset.columnId;
            const input = e.target.previousElementSibling;

            const value = input.value.trim();
            if (!value) return;

            addTask(columnId, value);
            input.value = "";
            renderBoard(state); // re-render everything
        }
    });
}


document.addEventListener("click", (e) => {

    // Add Task
    if (e.target.classList.contains("add-task-btn")) {
        const columnId = e.target.dataset.columnId;
        const input = e.target.previousElementSibling;

        const value = input.value.trim();
        if (!value) return;

        addTask(columnId, value);
        input.value = "";
    }

    // DELETE TASK
    if (e.target.classList.contains("delete-task-btn")) {
        const taskId = e.target.dataset.id;
        deleteTask(taskId);
    }
});


document.addEventListener("dblclick", (e) => {
    if (!e.target.classList.contains("task-text")) return;

    const span = e.target;
    const taskId = span.dataset.id;

    const currentText = span.textContent;

    const input = document.createElement("input");
    input.value = currentText;
    input.className = "edit-input";

    span.replaceWith(input);

    input.focus();

    function save() {
        const value = input.value.trim();

        if (value) {
            updateTask(taskId, value);
        }
    }
    
    input.addEventListener("blur", save);

    input.addEventListener("keydown", (e) => {
        if (e.key === "enter") {
            input.blur();
        }
    });
});


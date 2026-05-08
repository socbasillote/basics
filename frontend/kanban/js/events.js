import { addTask } from "./state.js";
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

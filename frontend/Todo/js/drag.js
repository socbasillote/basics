import { state, setState } from "./state.js";

export function setupDragAndDrop() {

    const list = document.getElementById("todoList");

    list.addEventListener("dragstart", e => {

        const li = e.target.closest(".todo-item");

        state.draggedTodoId = li.dataset.id;
    });

    list.addEventListener("dragover", e => {
        e.preventDefault();
    });

    list.addEventListener("drop", e => {

        const target = e.target.closest(".todo-item");

        if (!target) return;

        const targetId = target.dataset.id;

        const draggedIndex = state.todos.findIndex(t => t.id === state.draggedTodoId);

        const targetIndex = state.todos.findIndex( t => t.id === targetId);

        setState(state => {
            const [removed] =
                state.todos.splice(draggedIndex, 1);
            
            state.todos.splice(targetIndex, 0, removed);
        });
    });
}
import { state, setState, subscribe } from "./state.js";
import { render } from "./render.js";

import { saveState, loadState } from "./storage.js";
import { addTodo, deleteTodo, toggleTodo, editTodo, undoDelete } from "./handlers.js";

import { setupDragAndDrop } from "./drag.js";

/* ====== LOAD STATE ====== */
const saved = loadState();

if (saved) {
    Object.assign(state, saved);
}


/* ======= SUBSCRIBE ======= */
subscribe(() => {
    render();
    saveState(state);
})


/* ======= INITIAL RENDER ======= */
render();


/* ====== FORM ======= */
const form = document.getElementById('todoForm');

form.addEventListener("submit", e => {
    e.preventDefault();

    addTodo({
        title: todoInput.value,
        dueDate: dueDate.value,
        priority: priority.value,
        category: category.value
    });
    form.reset();
});

/* ======= FILTERS ======= */
document.querySelector(".filters")
    .addEventListener("click", e => {
        
        if (!e.target.dataset.filter) return;

        setState(state => {
            state.filter = e.target.dataset.filter;
        });
    });


/* ====== SEARCH ======= */
searchInput.addEventListener("input", e => {

    setState(state => {
        state.search = e.target.value;
    });
});


/* ======== THEME ======== */

themeToggle.addEventListener("click", () => {

    setState(state => {

        state.theme = state.theme === "dark" ? "light" : "dark";
    });
})


/*  ======== EVENT DELEGATION ======= */

todoList.addEventListener("click", e => {

    const li = e.target.closest(".todo-item");

    if (!li) return;

    const id = li.dataset.id;

    if (e.target.classList.contains('delete-btn')) {
        deleteTodo(id);
    }

    if (e.target.classList.contains('edit-btn')) {
        editTodo(id);
    }

    if (e.target.classList.contains("toggle")) {
        toggleTodo(id);
    }
});


/* ====== BULK ACTIONS ======= */
completeAll.addEventListener("click", () => {

    setState(state => {
        state.todos.forEach(todo => {
            todo.completed = true;
        });
    });
});

deleteCompleted.addEventListener("click", () => {
    setState(state => {
        state.todos = 
            state.todos.filter(todo => !todo.completed);
    });
});

/* ====== KEYBOARD SHORTCUT ======== */
window.addEventListener("keydown", e => {
    if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        undoDelete();
    }
});

/* =========== DRAG ======== */
setupDragAndDrop();
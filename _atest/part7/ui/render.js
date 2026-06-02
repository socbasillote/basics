import { state } from "../redux/reducer.js";
import { getFilterTodo } from "../redux/selectors.js";
import { createTodoDefault, updateTodoElement } from "../elemnt.js";

const lists = document.getElementById("lists");

export function render() {
    lists.innerHTML = "";

    const todos = getFilterTodo(state);

    todos.forEach(createTodo);
}

function createTodo(todo) {
    const li = document.createElement("li");

    li.dataset.id = todo.id;
    li.draggable = true;

    li.className = `list ${
        todo.priority === 1
            ? "priolow"
            : todo.priority === 2
            ? "priomid"
            : "priohigh"
    }`;

    if (state.editIdTodo === todo.id) {
        updateTodoElement(li, todo);

        lists.appendChild(li);

        const editInput = document.querySelector(".editInput");

        editInput.focus();
        editInput.setSelectionRange(
            editInput.value.length,
            editInput.value.length
        );

        return;
    }

    createTodoDefault(li, todo);
    lists.appendChild(li);
}
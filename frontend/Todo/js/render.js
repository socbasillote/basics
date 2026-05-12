import { state } from "./state.js";

export function render() {
    renderTheme();
    renderTodos();
}

function renderTheme() {
    document.body.className = 
        state.theme === "light"
            ? "light"
            : "";
}

function renderTodos() {

    const list = document.getElementById("todoList");
    const empty = document.getElementById("emptyState");

    let todos = [...state.todos];

    // Derived State
    if (state.filter === 'active') {
        todos = todos.filter(todo => !todo.completed);
    }

    if (state.filter === 'completed') {
        todos = todos.filter(todo => todo.completed);
    }

    if (state.search) {
        todos = todos.filter(todo => 
            todo.title
                .toLowerCase()
                .includes(state.search.toLocaleLowerCase())
        );
    };

    list.innerHTML = "";

    if (!todos.length) {
        empty.style.display = "block";
    } else {
        empty.style.display = "none";
    }

    todos.forEach(todo => {
        const li = document.createElement("li");

        li.className = `
            todo-item
            priority-${todo.priority}
            ${todo.completed ? "completed" : ""}
        `;

        li.draggable = true;

        li.dataset.id = todo.id;

        li.innerHTML = `
            <div class="todo-left>
                
                <input 
                    type="checkbox"
                    class="toggle
                    ${todo.completed ? "checked" : ""}
                />

                <div> 
                    <div class="title"> 
                        ${todo.title}
                    </div>

                    <small>
                        ${todo.category || ""}
                        ${todo.dueDate || ""}
                    </small>
                </div>
            </div>

            <div>

                <button class="edit-btn">
                    Edit
                </button>

                <button class="delete-btn">
                    Delete
                </button>
            </div>
        `;

        list.appendChild(li);
    })
}
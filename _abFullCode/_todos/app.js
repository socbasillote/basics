import { createStore } from "./store.js";
import {
    todoReducer,
    todoActions
} from "./slices/todoSlice.js";

import {
    loggerMiddleware
} from "./middleware.js";
import { rootReducer } from "./rootReducer.js";
import { filterActions } from "./slices/filterSlice.js";
import { themeActions } from "./slices/themeSlice.js";
import { priorityActions } from "./slices/prioritySlice.js";
import { fetchTodoIdea } from "./middleware/todoIdeaThunk.js";
import { thunkMiddleware } from "./middleware/thunkMiddleware.js";

const store = createStore(
    rootReducer,
    [thunkMiddleware ,loggerMiddleware]
);

const input =
    document.getElementById("todoInput");

const prioritySelect = document.getElementById("prioritySelect")

const addBtn =
    document.getElementById("addBtn");

const list =
    document.getElementById("todoList");


const themeBtn = document.getElementById('themeBtn')

const allBtn = document.getElementById('allBtn');
const activeBtn = document.getElementById('activeBtn');
const completedBtn = document.getElementById('completedBtn');

const allPriorityBtn = document.getElementById('allPriorityBtn');
const highBtn = document.getElementById('highBtn');
const mediumBtn = document.getElementById('mediumBtn');
const lowBtn = document.getElementById('lowBtn');

function render() {
    const state = store.getState();
    console.log(state);
    list.innerHTML = "";

    let todos = state.todos

    if(state.priority !== 'all') {
        todos = todos.filter(todo => todo.priority === state.priority);
    }
    if (state.filter === 'active'){
        todos = todos.filter(todo => !todo.completed);
    } else if (state.filter === 'completed'){
        todos = todos.filter(todo => todo.completed);
    }
    

    todos.forEach(todo => {

        const li =
            document.createElement("li");

        li.textContent = todo.completed
            ? `✅ ${todo.text}`
            : todo.text
        
        li.onclick = () => {
            store.dispatch(
                todoActions.toggleTodo(todo.id)
            )
        }

        const removeBtn =
            document.createElement("button");

        removeBtn.textContent = "Delete";

        removeBtn.onclick = (e) => {
            e.stopPropagation();

            store.dispatch(
                todoActions.removeTodo(todo.id)
            );
        };

        li.appendChild(removeBtn);

        list.appendChild(li);
    });

    document.body.className = state.theme;
}

store.subscribe(render);



addBtn.addEventListener("click", () => {

    const text = input.value.trim();
    
    if (!text) return;

    store.dispatch(
        todoActions.addTodo(text, prioritySelect.value)
    );

    input.value = "";
});


themeBtn.onclick = () => {

    store.dispatch(themeActions.toggleTheme())
}

allBtn.addEventListener('click', () => {
    store.dispatch(filterActions.setFilter("all"));
});

activeBtn.addEventListener('click', () => {
    store.dispatch(filterActions.setFilter("active"));
});

completedBtn.addEventListener('click', () => {
    store.dispatch(filterActions.setFilter("completed"))
})

highBtn.onclick = () => {
    store.dispatch(
        priorityActions.setPriority("high")
    )
}

mediumBtn.onclick = () => {
    store.dispatch(
        priorityActions.setPriority("medium")
    )
}

lowBtn.onclick = () => {
    store.dispatch(
        priorityActions.setPriority("low")
    )
}

allPriorityBtn.onclick = () => {
    store.dispatch(
        priorityActions.setPriority("all")
    )
}


const ideaBtn = document.getElementById('ideaBtn');
ideaBtn.onclick = () => {
    store.dispatch(fetchTodoIdea());
}

render();
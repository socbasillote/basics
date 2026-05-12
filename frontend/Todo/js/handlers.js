import { state, setState } from "./state.js";
import { generateId, showToast } from "./utils.js";

export function addTodo(data) {

    const todo = {
        id: generateId(),
        title: data.title,
        completed: false,
        dueDate: data.dueDate,
        priority: data.priority,
        category: data.category
    };

    setState(state => {
        state.todos.unshift(todo);
    });

    showToast("Todo added");

}

export function deleteTodo(id) {
    
    const deleted = state.todos.find(
        todo => todo.id === id
    );

    setState(state => {
        state.todos = 
            state.todos.filter(todo => todo.id !== id);

        state.lastDeletedTodo = deleted;
    });

    showToast("Todo deleted");
}

export function undoDelete() {

    if (!state.lastDeletedTodo) return;

    setState(state => {
        state.todos.unshift(state.lastDeletedTodo);
        state.lastDeletedTodo = null;
    });

    showToast("Undo successful");
}

export function toggleTodo(id) {

    setState(state => {
        
        const todo = state.todos.find(
            todo => todo.id === id
        );

        todo.completed = !todo.completed;
    });
}

export function editTodo(id) {
    
    const todo = state.todos.find(
        todo => todo.id === id
    );

    const title = prompt("Edit todo", todo.title);

    if (!title) return;

    setState(state => {
        todo.title = title;
    });

    showToast("Todo updated");
}
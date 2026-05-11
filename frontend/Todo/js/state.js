export const state = {
    todos: [],
    filter: "all",
    search: "",
    theme: "dark",
    draggedTodoId: null,
    lastDeletedTodo: null
};

const listeners = [];

export function subscribe(listener) {
    listeners.push(listener);
}

export function setState(updated) {
    updater(state);

    listeners.forEach(listener => listener(state));
}
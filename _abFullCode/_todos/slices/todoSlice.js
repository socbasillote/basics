let nextId = 1;
const initialState = []

export const todoActions = {
    addTodo: (text, priority) => ({
        type: "todo/add",
        payload: {text, priority}
    }),

    removeTodo: (id) => ({
        type: "todo/remove",
        payload: id
    }),

    toggleTodo: (id) => ({
        type: "todos/toggle",
        payload: id
    })
};

export function todoReducer(state = initialState, action) {
    switch (action.type) {
        case "todo/add":
            return [
                ...state,
                {
                    id: Date.now(),
                    text: action.payload.text,
                    priority: action.payload.priority,
                    completed: false
                }
            ];

        case "todo/remove":
            return state.filter(
                todo => todo.id !== action.payload
            );

        case "todos/toggle":
            return state.map(todo =>
                todo.id === action.payload
                    ? {
                        ...todo,
                        completed: !todo.completed
                    }
                    : todo
            );

        default:
            return state;
    }
}
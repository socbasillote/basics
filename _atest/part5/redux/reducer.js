export let state = {
    todos: [],
    editListId: null
};

let listeners = [];

export function reducer(state, action){
    switch(action.type) {

        case "ADD_TODO":
            return {
                ...state,
                todos: [...state.todos, action.payload]
            };
        
        case "DELETE_TODO":
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            };
        
        case "SET_EDIT":
            return {
                ...state,
                editListId: action.payload
            };

        case "SAVE_TODO":
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload.id
                        ? {...todo, title: action.payload.title }
                        : todo
                ),
                editListId: null
            }
        
        case "TOGGLE_TODO":
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload
                        ? { ...todo, status: !todo.status }
                        : todo
                )
            };

        case "CANCEL_EDIT":
            return {
                ...state,
                editListId: null
            };

        default:
            return state;
    }
}

export function dispatch(action){
    state = reducer(state, action);
    listeners.forEach(fn => fn());
}

export function subscribe(fn){
    listeners.push(fn);
}

// action.type and the action.payload
export let state = {
    todos: [],
    editTodoId: null
}

let listeners = [];

function reducer(state, action){
    switch(action.type){
        case 'ADD_TODO':
            return {
                ...state,
                todos: [...state.todos, action.payload]
            };

        case 'DELETE_TODO':
            return {
                ...state,
                todos:   state.todos.filter(todo => todo.id !== action.payload)
            };

        case 'UPDATE_TODO':
            return {
                ...state,
                editTodoId: action.payload
            };

        case 'SAVE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo => todo.id === action.payload.id
                    ? {...todo, title: action.payload.title }
                    : todo
                ),
                editTodoId: null
            }

        case 'CANCEL_EDIT':
            return {
                ...state,
                editTodoId: action.payload
            };

        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo => todo.id === action.payload
                    ? {...todo, status: !todo.status ? true : false}
                    : todo
                )
            }

        default:
            state
    }
}

export function dispatch(action){
    state = reducer(state, action);
    listeners.forEach(fn => fn());
}

export function subscribe(fn){
    listeners.push(fn);
}
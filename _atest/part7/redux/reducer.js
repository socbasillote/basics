
export let state = {
    todos: [],
    editIdTodo: null

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
                todos: state.todos.filter(todo => todo.id !== action.payload)
            };
        
        case 'UPDATE_TODO':
            return {
                ...state,
                editIdTodo:  action.payload
            };
        case 'SAVE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo => todo.id === action.payload.id 
                    ? {...todo, title: action.payload.title} 
                    : todo
                ),
                editIdTodo: null
            }
        case 'CANCEL_UPDATE':
            return {
                ...state,
                editIdTodo: null
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
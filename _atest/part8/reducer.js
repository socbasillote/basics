

export let state = {
    todos: [],
    edidTodoId: null,
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
                todos: [...state.todos.filter(todo => todo.id !== action.payload)]
            }
            
        default: 
            return state
    }
}

export function getState(){
    return state;
}

export function dispatch(action){
    state = reducer(state, action);
    listeners.forEach(fn => fn()); 
}

export function subscribe(fn){
    listeners.push(fn);
}
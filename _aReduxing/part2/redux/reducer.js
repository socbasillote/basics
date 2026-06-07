

export let initialState = {
    todos: [],
    editTodoId: null,
    filterTodo: 'ALL'
}

let listeners = [];

function reducer(state, action){

    switch(action.type){
        case 'ADD_TODO':
            return {
                ...state,
                todos: [...state.todos, action.payload]
            }
        case 'DELETE_TODO':
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            }

        default:
            return state
    }
}


export function dispatch(action){
    initialState = reducer(initialState, action);

    listeners.forEach(func => func());
}

export function subscriber(fn){
    listeners.push(fn);
}
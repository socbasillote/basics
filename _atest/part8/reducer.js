

export let state = {
    todos: [],
    edidTodoId: null,
    filterTodo: 'ALL'
}

let listeners = [];

function reducer(state, action){

    switch(action.type){
        case 'ADD_TODO':
            return {
                ...state,
                todos: [...state.todos, action.payload]
            };
        
        case 'TOGGLE_TODO':{
            return {
                ...state,
                todos: state.todos.map(todo => 
                    todo.id === action.payload
                    ? {...todo, status: !todo.status }
                    : todo
                )
            }
        }
        
        case 'DELETE_TODO':
            return {
                ...state,
                todos: [...state.todos.filter(todo => todo.id !== action.payload)]
            }

        case 'UPDATE_TODO':
            return {
                ...state,
                edidTodoId: action.payload
            }

        case 'SAVE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo => todo.id == action.payload.id
                        ? {...todo, title: action.payload.title}
                        : todo
                    ),
                edidTodoId: null
            }


        case 'ACTIVE_TODO':
            return {
                ...state,
                filterTodo: action.payload
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
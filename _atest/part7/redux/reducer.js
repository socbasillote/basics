
export let state = {
    todos: [],
    editIdTodo: null,
    filterTodo: 'ALL',

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
                    ? {...todo, title: action.payload.title, priority: action.payload.priority} 
                    : todo
                ),
                editIdTodo: null
            }
        case 'CANCEL_UPDATE':
            return {
                ...state,
                editIdTodo: null
            };

        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo => todo.id === action.payload
                    ? {...todo, status: !todo.status}
                    : todo
                )
            }

            
        case 'ACTIVE_TODO':
            return {
                ...state,
                filterTodo: action.payload
            }

        case 'SORT_HIGH':
            return {
                ...state,
                todos: state.todos.sort((a, b) =>  b.priority - a.priority)
            };
            
        case 'SORT_LOW':
            return {
                ...state,
                todos: state.todos.sort((a, b) =>  a.priority - b.priority)
            }

        case 'REORDER_TODOS': {
            const orderedTodos = action.payload.map(id =>
                state.todos.find(todo => todo.id === id)
            );

            return {
                ...state,
                todos: orderedTodos
            };
        }

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
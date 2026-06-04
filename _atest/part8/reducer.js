

export let state = {
    todos: [],
    edidTodoId: null,
    filterTodo: 'ALL',
    sortTodo: 'High'
}

let listeners = [];

function reducer(state, action){

    switch(action.type){
        case 'START_UP':
            return {
                ...state,
                todos: state.todos.sort((a, b) => a.createdAt - b.createdAt)
            }
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

        
        case 'ALL_TODO':
            return {
                ...state,
                filterTodo: action.payload
            }
        case 'ACTIVE_TODO':
            return {
                ...state,
                filterTodo: action.payload
            }
        case 'COMPLETE_TODO':
            return {
                ...state,
                filterTodo: action.payload
            }
        

        case 'SORT_LOW':{
            return {
                ...state,
                todos: state.todos.sort((a, b) => b.priority - a.priority),
                sortTodo: 'Low'
            }
        }

        case 'SORT_HIGH': {
            return {
                ...state,
                todos: state.todos.sort((a,b) => a.priority - b.priority),
                sortTodo: 'High'
            }
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
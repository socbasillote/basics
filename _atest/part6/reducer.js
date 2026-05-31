
// action.type and the action.payload
export let state = {
    todos: [],
    editTodoId: null,
    filter: 'ALL'
}

let listeners = [];

export function reducer(state, action){
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
                    ? {...todo, status: !todo.status}
                    : todo
                )
            }
        
        case 'TODO_ACTIVE':
            return {
                ...state,
                filter: 'ACTIVE'
            };
        
        case 'TODO_COMPLETE':
            return {
                ...state,
                filter: 'COMPLETE'
            };

        case 'TODO_ALL':
            return {
                ...state,
                filter: 'ALL'
            }
        default:
            return state
    }
}



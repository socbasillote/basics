
let initialState = {
    todos: [],
    editTodoId: null,
    filterTodo: 'ALL'
}

export function reducer(state = initialState, action){

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
            };
        
        case 'UPDATE_TODO':
            return {
                ...state,
                editTodoId: action.payload
            }
        case 'SAVE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo => todo.id === action.payload.id
                    ? {...todo, title: action.payload.title}
                    : todo
                 ),
                 editTodoId: null
            }
        case 'CANCEL_EDIT':
            return {
                ...state,
                editTodoId: null
            }
        default:
            return state
    }
}




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
                todos: state.todos.filter(todo => todo.id !== action.payload)
            };

        case 'UPDATE_TODO':
            return {
                ...state,
                editIdTodo: action.payload
            }

        
        case 'CANCEL_UPDATE':
            return {
                ...state,
                editIdTodo: action.payload
            }

        default:
            return state
    }
}
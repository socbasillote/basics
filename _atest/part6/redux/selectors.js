export function getFilteredTodos(state){

    switch(state.filter){
        case 'ACTIVE':
            return state.todos.filter(todo => !todo.status);

        case 'COMPLETE':
            return state.todos.filter(todo => todo.status);

        default:
            return state.todos;
    }
}

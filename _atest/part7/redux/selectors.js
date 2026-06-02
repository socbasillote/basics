export function getFilterTodo(state){

    switch(state.filterTodo){
        case 'ACTIVE':
            return state.todos.filter(todo => !todo.status);
        case 'COMPLETE':
            return state.todos.filter(todo => todo.status);
        case 'btnandsort':
            
        default:
            return state.todos
    }
}
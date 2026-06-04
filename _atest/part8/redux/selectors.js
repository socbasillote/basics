
export function getTodoFilter(state){

    switch(state.filterTodo){
        case 'ACTIVE':
            return state.todos.filter(todo => !todo.status);
        case 'COMPLETE':
            return state.todos.filter(todo => todo.status);
        
        default:
            return state.todos;
    }
}
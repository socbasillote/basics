

let initialState = {
    todos: [],
    editTodoId: null,
    filterTodo: 'ALL'
}

function createStore(reducer, initialState, middleware = []){

    let state = initialState
    function getState(){
        return state
    }
}
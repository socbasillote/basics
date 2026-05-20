
export let state = [];
export let editItemId = null;

export function addTodo(todoInput){
    const todoId = Date.now();
    const todoTitle = todoInput.value;

    if(!todoTitle) return;

    let newTodo = {
        id: todoId,
        title: todoTitle,
        status: 'active'
    };

    state.push(newTodo);

    todoInput.value = '';
}


export function deleteTodo(id){
    state = state.filter(todo => todo.id != id);
}

export function updateTodo(id){
    editItemId = id
   console.log(editItemId);
}

export function saveBtn(id, newTitle){

    state = state.map(todo => {
        if(todo.id == id){
            return {
                ...todo,
                title: newTitle
            };
        }
        return todo
    })

    editItemId = null;
}

export function cancelUpdate(){
    editItemId = null;
}



const todoInput = document.querySelector('.todoInput');


export function addTodo(store){
    const titleValue = todoInput.value;
    const createdAt = Date.now();

    const newTodo = {
        id:  crypto.randomUUID(),
        createdAt,
        title: titleValue,
        status: false,
        priority: 1,
    }

    store.dispatch({type: 'ADD_TODO', payload: newTodo})
    todoInput.value = '';
}
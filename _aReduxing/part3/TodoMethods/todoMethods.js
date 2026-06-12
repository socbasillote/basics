


const todoInput = document.querySelector('.todoInput');


export function addTodo(store){
    const titleValue = todoInput.value;
    const id = crypto.randomUUID();
    const createdAt = Date.now();

    const newTodo = {
        id,
        createdAt,
        title: titleValue,
        status: false,
        priority: 1,
    }

    store.dispatch({type: 'ADD_TODO', payload: newTodo})
    todoInput.value = '';
}
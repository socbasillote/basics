
const inputTodo = document.querySelector('.inputTodo');

export function addTodo(){
    const title = inputTodo.value;

    const newTodo = {
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        title,
        status: false
    }
    
}


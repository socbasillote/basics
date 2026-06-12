import { reducer } from "./redux/reducer.js";
import { createStore } from "./redux/store.js";
import { defaultTodo } from "./ui/listElement.js";

const app = document.getElementById('app');
const lists = document.getElementById('lists');

const todoInput = document.querySelector('.todoInput');
const addTodoBtn = document.querySelector('.addTodoBtn');

const store = createStore(reducer);


function render(){
    lists.textContent = '';
    
    store.getState().todos.forEach(todo => {
        createTodo(todo);
    })
}


function createTodo(todo){
    const li = document.createElement('li');
    li.dataset.id = todo.id;
    li.className = 'list';

    defaultTodo(li, todo);

    lists.appendChild(li);
}

function addTodo(){
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

}

addTodoBtn.addEventListener('click', addTodo)
store.subscriber(render);
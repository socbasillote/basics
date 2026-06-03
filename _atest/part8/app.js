import { dispatch, getState, subscribe } from "./reducer.js";
import { todoElement } from "./ui/elemnt.js";

const app = document.getElementById('app');
const lists = document.getElementById('lists');

const todoInput = document.querySelector('.todoInput');
const addTodoBtn = document.querySelector('.addTodoBtn');



function render(){
    lists.innerHTML = '';
    let state = getState();
    state.todos.forEach(todo => {
        createTodo(todo);
    })
    
}

function createTodo(todo){
    const li = document.createElement('li');
    li.dataset.id = todo.id;
    li.className = 'list';
    todoElement(todo, li);

    lists.appendChild(li);
}

function addTodo(){

    const newTodo = {
        title: todoInput.value,
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        status: false
    }

    dispatch({type: 'ADD_TODO', payload: newTodo})
    todoInput.value = '';
}

app.addEventListener('click', (e) => {
    const list = e.target.closest('[data-id]');
    if (!list) return;

    const id = list.dataset.id;

    if(e.target.closest('.deleteBtn')){
        console.log(id)
        dispatch({type: 'DELETE_TODO', payload: id});
    }

})

addTodoBtn.addEventListener('click', addTodo);

subscribe(render);
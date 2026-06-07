import { dispatch, initialState, subscriber } from "./redux/reducer.js";
import { defaultTodo } from "./ui/elemnt.js";

const app = document.getElementById('app');
const lists = document.getElementById('lists');

const todoInput = document.querySelector('.todoInput');
const addTodoBtn = document.querySelector('.addTodoBtn');


function render(){
    lists.textContent = '';
    let state = initialState;

    state.todos.forEach(todo => {
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
    console.log('add')
    const newTodo = {
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        title: todoInput.value,
        status: false,
        priority: 1
    }

    dispatch({type: 'ADD_TODO', payload: newTodo})
    todoInput.value = '';
}


addTodoBtn.addEventListener('click', addTodo)

subscriber(render);
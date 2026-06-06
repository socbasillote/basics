
import { initialState, reducer } from "./redux/reducer.js";
import { createStore } from "./redux/store.js";
import { defaultTodo } from "./ui/elemnt.js";

const app = document.getElementById('app');
const lists = document.getElementById('lists');

const addTodoBtn = document.querySelector('.addTodoBtn');

const store = createStore(reducer, initialState);
const inputTodo = document.querySelector('.inputTodo');


function render(){
    lists.textContent = '';

    const state = store.getState();

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

export function addTodo(){
    const title = inputTodo.value;

    const newTodo = {
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        title,
        status: false
    }

    store.dispatch({type: 'ADD_TODO', payload: newTodo})
    inputTodo.value = '';
    console.log(store.getState());
}

app.addEventListener('click', (e) => {
    const li = e.target.closest('[data-id]');
    if(!li) return;
    const id = li.dataset.id;

    if(e.target.closest('.deleteBtn')){
        store.dispatch({type: 'DELETE_TODO', payload: id})
    }
    console.log(id);
})

addTodoBtn.addEventListener('click', addTodo);


store.subscribe(render);

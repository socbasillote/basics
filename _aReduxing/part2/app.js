import { loggerMiddleware, persistMiddleware, timerMiddleware } from "./redux/loggerMiddleware.js";
import { reducer } from "./redux/reducer.js";
import { createStore } from "./redux/store.js";
import { defaultTodo, updateTodoElement } from "./ui/elemnt.js";

const app = document.getElementById('app');
const lists = document.getElementById('lists');

const todoInput = document.querySelector('.todoInput');
const addTodoBtn = document.querySelector('.addTodoBtn');

const store = createStore(reducer, [loggerMiddleware, timerMiddleware, persistMiddleware]);

function render(){
    lists.textContent = '';
    let state = store.getState();

    state.todos.forEach(todo => {
        createTodo(todo, state.editTodoId);
    })

}


function createTodo(todo, editTodoId){
    const li = document.createElement('li');
    li.dataset.id = todo.id;
    li.className = 'list';

    if(editTodoId === todo.id) {
        updateTodoElement(li, todo);
        lists.appendChild(li);
        return;
    }

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

    store.dispatch({type: 'ADD_TODO', payload: newTodo})
    todoInput.value = '';
}

app.addEventListener('click', (e) => {
    const li = e.target.closest('[data-id]');
    if (!li) return;
    const id = li.dataset.id;

    if(e.target.closest('.deleteBtn')){
        store.dispatch({type: 'DELETE_TODO', payload: id})
    }
    if(e.target.closest('.updateBtn')){
        console.log('test')
        store.dispatch({type: 'UPDATE_TODO', payload: id})
    }
    if(e.target.closest('.saveBtn')){
        const newTitle = li.querySelector('.editInput')
        store.dispatch({type: 'SAVE_TODO', payload: {id, title: newTitle.value}})
    }
    if(e.target.closest('.cancelBtn')){
        store.dispatch({type: 'CANCEL_EDIT'})
    }
})

addTodoBtn.addEventListener('click', addTodo)

render();
store.subscribe(render);
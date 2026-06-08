import { dispatch, initialState, subscriber } from "./redux/reducer.js";
import { defaultTodo, updateTodoElement } from "./ui/elemnt.js";

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

    if(initialState.editTodoId === todo.id) {
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

    dispatch({type: 'ADD_TODO', payload: newTodo})
    todoInput.value = '';
}

app.addEventListener('click', (e) => {
    const li = e.target.closest('[data-id]');
    if (!li) return;
    const id = li.dataset.id;

    if(e.target.closest('.deleteBtn')){
        dispatch({type: 'DELETE_TODO', payload: id})
    }
    if(e.target.closest('.updateBtn')){
        dispatch({type: 'UPDATE_TODO', payload: id})
    }
    if(e.target.closest('.saveBtn')){
        const newTitle = document.querySelector('.editInput')
        dispatch({type: 'SAVE_TODO', payload: {id, title: newTitle.value}})
    }
    if(e.target.closest('.cancelBtn')){
        dispatch({type: 'CANCEL_EDIT'})
    }
})

addTodoBtn.addEventListener('click', addTodo)

subscriber(render);
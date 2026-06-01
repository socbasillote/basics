import { createTodoDefault, updateTodoElement } from "./elemnt.js";
import { dispatch, state, subscribe } from "./redux/reducer.js";

const app = document.getElementById('app');
const lists = document.getElementById('lists');

const todoInput = document.querySelector('.todoInput');
const addTodoBtn = document.querySelector('.addTodoBtn');

function render(){
    lists.innerHTML = '';
    
    state.todos.forEach(todo => {
        createTodo(todo);
    })

}

function createTodo(todo){
    const li = document.createElement('li');
    li.dataset.id = todo.id;
    li.className = 'list';

    if(state.editIdTodo === todo.id){
        updateTodoElement(li, todo);
        lists.appendChild(li);
        const editInput = document.querySelector('.editInput');
        editInput.focus();
        editInput.setSelectionRange(editInput.value.length, editInput.value.length);
        return;
    }
    createTodoDefault(li, todo);

    lists.appendChild(li);
}


function addTodo(){
    const title = todoInput.value.trim();
    if(!title) return;
    
    const newTodo = {
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        title,
        status: false
    }

    dispatch({type: 'ADD_TODO', payload: newTodo})
    todoInput.value = '';
}



addTodoBtn.addEventListener('click', addTodo);

app.addEventListener('click', (e) => {
    const li = e.target.closest('[data-id]');
    if(!li) return;

    const id = li.dataset.id;

    if(e.target.closest('.deleteBtn')){
        dispatch({type: 'DELETE_TODO', payload: id})
    }

    if(e.target.closest('.updateBtn')){
        dispatch({type: 'UPDATE_TODO', payload: id})
    }
    if(e.target.closest('.saveBtn')){
        const newTitle = document.querySelector('.editInput');
        dispatch({type: 'SAVE_TODO', payload: {id: id, title: newTitle.value}})
    }
    if(e.target.closest('.cancelBtn')){
        dispatch({type: 'CANCEL_UPDATE'})
    }

})

subscribe(render);

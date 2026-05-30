import { saveTodo } from "../part5/handler.js";
import { defaultCreateTodo, updateTodoElement } from "./elemnt.js";
import { dispatch, state, subscribe } from "./reducer.js";

const app = document.getElementById('app');
const lists = document.getElementById('lists');

const todoInput = document.querySelector('.todoInput');
const addTodoBtn = document.querySelector('.addTodoBtn');



function render(){
    lists.innerHTML = '';

    state.todos.forEach(todo => {
        createTodo(todo);
    });
}

function createTodo(todo){
    const li = document.createElement('li');
    li.dataset.id = todo.id;
    li.className = 'list';
    
    if(state.editTodoId === todo.id){
        updateTodoElement(li, todo);
        lists.appendChild(li);
        const editInput = document.querySelector('.editInput');
        editInput.focus();
        editInput.setSelectionRange(editInput.value.lenght, editInput.value.lengt);
        return;
    }

    defaultCreateTodo(li, todo);

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

    dispatch({ type: "ADD_TODO", payload: newTodo});
    todoInput.value = '';
}

app.addEventListener('click', (e) => {
    let li = e.target.closest('[data-id]');
    if (!li) return;
    const id = li.dataset.id;


    if (e.target.closest('.deleteBtn')){
        dispatch({type: 'DELETE_TODO', payload: id})
       // console.log('test')
    }

    if(e.target.closest('.updateBtn')){
        dispatch({type: "UPDATE_TODO", payload: id});
        console.log('test')
    }

    if(e.target.closest('.saveBtn')){
        const editInput = document.querySelector('.editInput');
        dispatch({type: 'SAVE_TODO', payload: {id, title: editInput.value}})
    }
    if(e.target.closest('.cancelBtn')){
        dispatch({type: 'CANCEL_EDIT', payload: null})
    }

});

subscribe(render);

addTodoBtn.addEventListener('click', addTodo);
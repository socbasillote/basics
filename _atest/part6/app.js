import { saveTodo } from "../part5/handler.js";
import { defaultCreateTodo, updateTodoElement } from "./elemnt.js";
import { reducer, state, subscribe } from "./reducer.js";
import { getFilteredTodos } from "./redux/selectors.js";
import { createStore } from "./redux/store.js";

const store = createStore(reducer, state);
const app = document.getElementById('app');
const lists = document.getElementById('lists');

const todoInput = document.querySelector('.todoInput');
const addTodoBtn = document.querySelector('.addTodoBtn');



function render(){
    lists.innerHTML = '';

    const state = store.getState();
    const filteredTodos = getFilteredTodos(state);

    filteredTodos
    .sort((a,b) => b.createdAt - a.createdAt)
    .forEach(todo => {
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
    console.log('test')
    const title = todoInput.value.trim();
    if(!title) return;

    const newTodo = {
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        title,
        status: false
    }

    store.dispatch({ type: "ADD_TODO", payload: newTodo});
    todoInput.value = '';
}

app.addEventListener('click', (e) => {
    let li = e.target.closest('[data-id]');
    if (!li) return;
    const id = li.dataset.id;

    if(e.target.closest('.checkBox')){
        store.dispatch({type: 'TOGGLE_TODO', payload: id})
    }


    if (e.target.closest('.deleteBtn')){
        store.dispatch({type: 'DELETE_TODO', payload: id})
       // console.log('test')
    }
    if(e.target.closest('.updateBtn')){
        store.dispatch({type: "UPDATE_TODO", payload: id});
        console.log('test')
    }


    if(e.target.closest('.saveBtn')){
        const editInput = document.querySelector('.editInput');
        store.dispatch({type: 'SAVE_TODO', payload: {id, title: editInput.value}})
    }
    if(e.target.closest('.cancelBtn')){
        store.dispatch({type: 'CANCEL_EDIT', payload: null})
    }
});

app.addEventListener('click', (e) => {
        //filter
    if (e.target.closest('.activeBtn')){
        console.log('test')
       store.dispatch({type: 'TODO_ACTIVE'})
    }
    if (e.target.closest('.completeBtn')){
        console.log('test')
       store.dispatch({type: 'TODO_COMPLETE'})
    }
    if (e.target.closest('.allBtn')){
        console.log('test')
       store.dispatch({type: 'TODO_ALL'})
    }
})

store.subscribe(render);

addTodoBtn.addEventListener('click', addTodo);
import { dispatch, getState, subscribe } from "./reducer.js";
import { getTodoFilter } from "./redux/selectors.js";
import { todoElement, updateTodoElement } from "./ui/elemnt.js";

const app = document.getElementById('app');
const lists = document.getElementById('lists');

const todoInput = document.querySelector('.todoInput');
const prioSelect = document.querySelector('.prioSelect');
const prioSort = document.querySelector('.prioSort');
const addTodoBtn = document.querySelector('.addTodoBtn');

let startUp = 1;
function render(){
    lists.innerHTML = '';
    let initialState = getState();
    let state = getTodoFilter(initialState);

    state.forEach(todo => {
        createTodo(todo);
    })
}

function createTodo(todo){
    const li = document.createElement('li');
    li.dataset.id = todo.id;
    li.className = 'list';

    if(getState().edidTodoId === todo.id){
        updateTodoElement(li, todo);
        lists.appendChild(li);
        const editInput = document.querySelector('.editInput');
        editInput.focus();
        editInput.setSelectionRange(editInput.value.length, editInput.value.length)

        return;
    }
    todoElement(todo, li);

    lists.appendChild(li);
}

function addTodo(){
    if(!todoInput.value)return;
    const newTodo = {
        title: todoInput.value,
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        status: false,
        priority: Number(prioSelect.value)
    }

    dispatch({type: 'ADD_TODO', payload: newTodo})
    todoInput.value = '';
    prioSelect.value = '1';

    console.log(getState());
}

app.addEventListener('click', (e) => {
    const list = e.target.closest('[data-id]');
    if (!list) return;

    const id = list.dataset.id;

    if(e.target.closest('.deleteBtn')){
        console.log(id)
        dispatch({type: 'DELETE_TODO', payload: id});
    }
    if(e.target.closest('.updateBtn')){
        dispatch({type: 'UPDATE_TODO', payload: id})
    }
    if(e.target.closest('.saveBtn')){
        const editInput = document.querySelector('.editInput').value;
        if(!editInput) return;
        dispatch({type: 'SAVE_TODO', payload: {id: id, title: editInput, }})
    }
    if(e.target.closest('.checkBox')){
        console.log('check')
        dispatch({type: 'TOGGLE_TODO', payload: id})
    }
})

app.addEventListener('click', (e) => {
    if(e.target.closest('.allBtn')){
        dispatch({type: 'ALL_TODO', payload: 'ALL'})
        console.log('active')
    }

    if(e.target.closest('.activeBtn')){
        dispatch({type: 'ACTIVE_TODO', payload: 'ACTIVE'})
    }
    if(e.target.closest('.completeBtn')){
        dispatch({type: 'COMPLETE_TODO', payload: 'COMPLETE'})
    }
})

addTodoBtn.addEventListener('click', addTodo);

prioSort.addEventListener('change', (e) => {
    const value = Number(e.target.value);
    console.log(value);
    if(value === 3){
        dispatch({type: 'SORT_HIGH'})
    }
    if(value === 1){
        dispatch({type: 'SORT_LOW'})
    }
})

dispatch({type: 'START_UP'})
console.log('START_UP')

subscribe(render);

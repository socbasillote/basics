import { defaultCreateTodo, updateTodoElement } from "./elements/element.js";

const app = document.getElementById('app');
const lists = document.getElementById('lists');

const todoInput = app.querySelector('.todoInput');
const todoAddBtn = app.querySelector('.todoAddBtn');

const filterButtons = document.querySelector('.filterButtons');

let state = [];
let filterTodo = 'all';
let editTodoId = null;

function render(){
    lists.innerHTML = '';

    let filterState = state;

    if(filterTodo === 'active'){
        filterState = filterState.filter(todo => todo.status === false);
    }

    if(filterTodo === 'completed'){
        filterState = filterState.filter(todo => todo.status === true);
    }

    filterState.forEach(todo => {
        createTodo(todo);
    })
}

function createTodo(todo){
    const li = document.createElement('li');
    li.dataset.id = todo.id;
    li.classList.add('list');

    if (editTodoId === todo.id){
        updateTodoElement(li, todo);
        lists.appendChild(li);
        const editInput = document.querySelector('.editInput');
        editInput.focus();
        editInput.setSelectionRange(editInput.value.length, editInput.value.length);
        return;
    }
    defaultCreateTodo(li, todo);

   lists.appendChild(li);
}

function addTodo(){
    const title = todoInput.value;
    const id = crypto.randomUUID();
    const createdAt = Date.now();

    const newTodo = {
        id,
        createdAt,
        title,
        status: false
    };

    state.push(newTodo);
    render();
    todoInput.value = '';
}

function deleteTodo(id){
    state = state.filter(todo => todo.id !== id);
}

function updateTodo(id){
    editTodoId = id;
}

function saveTodo(id, newTitle){

    state = state.map(todo => {
        if(todo.id === id){
            return {
                ...todo,
                title: newTitle
            }
        };

        return todo;
    })

    editTodoId = null;
}

function cancelTodo(){
    editTodoId = null;
}

function completeTodo(id){
    state = state.map(todo => {
        if(todo.id === id){
            return {
                ...todo,
                status: !todo.status
            }
        }
        return todo
    })
}

app.addEventListener('click', (e) => {
    const list = e.target.closest('[data-id]');
    if(!list) return;
    const id = list.dataset.id;
    
    let shouldRender = false;
    if(e.target.closest('.deleteBtn')){
        deleteTodo(id);
        shouldRender = true;
    }

    if(e.target.closest('.saveBtn')){
        const newTitle = document.querySelector('.editInput');
        saveTodo(id, newTitle.value);
        shouldRender = true;
    }
    if(e.target.closest('.cancelBtn')){
        cancelTodo();
        shouldRender = true;
    }
    if(e.target.closest('.checkBox')){
        completeTodo(id);
        console.log(state);
        shouldRender = true;
    }
    if(shouldRender){
        render();
    }
    
})

app.addEventListener('dblclick', (e) => {
    const list = e.target.closest('[data-id]');
    if(!list) return;
    const id = list.dataset.id;
    
    updateTodo(id);
    render();
})


app.addEventListener('keydown', (e) => {
    if(e.key === 'Escape'){
        cancelTodo();
        render();
    }
})


todoAddBtn.addEventListener('click', addTodo);

filterButtons.addEventListener('click', (e) => {
    if(e.target.closest('.allBtn')){
        filterTodo = 'all';
    }

    if(e.target.closest('.activeBtn')){
        filterTodo = 'active';
    }

    if(e.target.closest('.completedBtn')){
        filterTodo = 'completed';
        console.log(filterTodo);
    }
    render();
})
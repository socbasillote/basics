import { defaultCreateTodo, updateTodoElement } from "./elements/element.js";

const app = document.getElementById('app');
const lists = document.getElementById('lists');

const todoInput = app.querySelector('.todoInput');
const todoAddBtn = app.querySelector('.todoAddBtn');

let state = [];
let editTodoId = null;
function render(){
    lists.innerHTML = '';

    state.forEach(todo => {
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
        status: 'active'
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

app.addEventListener('click', (e) => {
    const list = e.target.closest('[data-id]');
    if(!list) return;
    const id = list.dataset.id;
    
    if(e.target.closest('.deleteBtn')){
        deleteTodo(id);
    }

    if(e.target.closest('.updateBtn')){
        updateTodo(id);
    }

    if(e.target.closest('.saveBtn')){
        const newTitle = document.querySelector('.editInput');
        saveTodo(id, newTitle.value);
    }
    if(e.target.closest('.cancelBtn')){
        cancelTodo();
    }
    render();
})


todoAddBtn.addEventListener('click', addTodo);
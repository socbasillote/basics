import { defaultListCreator, updateList } from "./elemnts.js";

const app = document.getElementById('app');
const lists = document.getElementById('lists')

const todoInput = document.querySelector('.todoInput');
const addTodoBtn = document.querySelector('.addTodoBtn');

let state = [];
let editListId = null;

function render(){
    lists.innerHTML = '';

    state.forEach(todo => {
        createTodo(todo);
    });
}

function createTodo(todo){
    const li = document.createElement('li');

    li.dataset.id = todo.id;
    li.classList.add('list');
    if (editListId === todo.id){
        updateList(li, todo);
        lists.appendChild(li);
        const editInputTodo = document.querySelector('.editInputTodo');

        editInputTodo.focus();
        editInputTodo.setSelectionRange(todo.title.length, todo.title.length);
        return;
    }
    defaultListCreator(li, todo);

    lists.appendChild(li);

}

function addTodo(){
    const title = todoInput.value.trim();
    if(!title) return;
    
    const id = crypto.randomUUID();
    const createdAt = Date.now();

    const newTodo = {
        title,
        id,
        createdAt,
        status: false
    }

    state.push(newTodo);
    render();
    todoInput.value = '';
}

function deleteTodo(id){
    state = state.filter(todo => todo.id != id);
}

function updateTodo(id){
    editListId = id;
}

function saveTodo(id, newTitle){
    state = state.map(todo => {
        if (todo.id === id){
            return {
                ...todo,
                title: newTitle
            };
        }
        return todo;
    })
    editListId = null;
}

app.addEventListener('click', (e) => {
    const li = e.target.closest('[data-id]');
    if(!li)return;
    const id = li.dataset.id;

    if(e.target.closest('.deleteBtn')){
        deleteTodo(id);
    }

    if(e.target.closest('.updateBtn')){
        updateTodo(id);
    }

    if(e.target.closest('.saveBtn')){
        const editInputTodo = document.querySelector('.editInputTodo');
        saveTodo(id, editInputTodo.value);
    }

    if(e.target.closest('.cancelBtn')){
        editListId = null;
    }

    render();
})
addTodoBtn.addEventListener('click', addTodo);


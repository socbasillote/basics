import { render } from "../app.js";
import { defaultCreateTodo, updateTodoElement } from "../create/create.js";

const lists = document.getElementById('lists');
const todoInput = document.querySelector('.todoInput');


let storage = localStorage.getItem('state');
export let state = storage  ? JSON.parse(storage) : [];

let filterText = 'all';
let editId = null;

export function filterTextChange(text){
    filterText = text;
}

console.log(filterText)


export function renderTodos(){
    lists.innerHTML = '';
    let filteredTodos = state;

     if(filterText === 'completed'){
        filteredTodos = filteredTodos.filter(todo => todo.status == 'completed');
        console.log(filteredTodos)
    }

    if(filterText === 'active'){
        filteredTodos = filteredTodos.filter(todo => todo.status == 'active');
    }

    filteredTodos
        .sort((a, b) => b.createdAt - a.createdAt)
        .forEach(todo => {createTodo(todo); });
}

function createTodo(todo){
    const li = document.createElement('li');
    
    li.dataset.id = todo.id;
    li.classList.add('list');
    
    if (editId === todo.id){
        updateTodoElement(li, todo)

        lists.appendChild(li);
        const editTodo = document.querySelector('.editTodoInput');
        editTodo.focus();
        editTodo.setSelectionRange(editTodo.value.length, editTodo.value.length);
        return;
    }
    defaultCreateTodo(li, todo);

    lists.appendChild(li);
}


export function addTodo(){
    const inputValue = todoInput.value.trim();
    if(!inputValue) return;

    const id = crypto.randomUUID();
    const createdAt = Date.now();

    const newTodo = {
        id,
        createdAt,
        title: inputValue,
        status: 'active',
    }

    state.push(newTodo);

    render();
    todoInput.value = '';
}

export function deleteTodo(id){
    state = state.filter(todo => todo.id != id);
}

export function updateTodo(id){
    editId = id;
}

export function saveTodo(id, newTitle){
    state = state.map(todo => {

        if(todo.id === id) {
            return {
                ...todo,
                title: newTitle,
            }
        }
        return todo;
    })

    editId = null;
}

export function cancelTodo(){
    editId = null;
}

export function completedTodo(id){
    state = state.map(todo => {

        if(todo.id === id){
            if(todo.status != 'completed') {
                return {
                    ...todo,
                    status: 'completed'
                }
            }
            return {
                ...todo,
                status: 'active'
            }
        }
        return todo;
    })
}
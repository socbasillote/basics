import { defaultListCreator, updateList } from "./elemnts.js";
import { addTodo, cancelEdit, completeTodo, deleteTodo, saveTodo, updateTodo } from "./handler.js";
import { dispatch, state, subscribe } from "./redux/reducer.js";

const app = document.getElementById('app');
const lists = document.getElementById('lists')

const addTodoBtn = document.querySelector('.addTodoBtn');


function render(){
    lists.innerHTML = '';

    state.todos.forEach(todo => {
        createTodo(todo);
    });
    console.log('render')
}


function createTodo(todo){
    const li = document.createElement('li');

    li.dataset.id = todo.id;
    li.classList.add('list');
    if (state.editListId === todo.id){
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
        cancelEdit();
    }

    if(e.target.closest('.completeBtn')){
        completeTodo(id);
    }
})

addTodoBtn.addEventListener('click', addTodo);

subscribe(render);


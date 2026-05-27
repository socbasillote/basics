import { render } from "../app.js";
import { addTodo, cancelTodo, completedTodo, deleteTodo, filterTextChange, saveTodo, updateTodo } from "../todos/todos.js";


const filterBtns = document.querySelector('.filterBtns');
const app = document.getElementById('app');
const addTodoBtn = document.querySelector('.addTodoBtn');


export function handlers(){

addTodoBtn.addEventListener('click', addTodo);

app.addEventListener('click', (e) => {
    const list = e.target.closest('[data-id]');
    if (!list) return;
    const id = list.dataset.id;
    
    if (e.target.closest('.deleteBtn')){
        deleteTodo(id);
    }

    if(e.target.closest('.updateBtn')){
        updateTodo(id);
    }

    if (e.target.closest('.saveBtn')){
        const newTitle = document.querySelector('.editTodoInput');
        saveTodo(id, newTitle.value);
    }

    if(e.target.closest('.cancelBtn')) {
        cancelTodo();
    }

    if(e.target.closest('.listTitle')){
        completedTodo(id);
    }

    render();
})


filterBtns.addEventListener('click', (e) => {
    if (e.target.closest('.allTodo')) {
        filterTextChange('all');
        console.log('tset')
    }

    if (e.target.closest('.activeTodo')){
        filterTextChange('active');
    }

    if (e.target.closest(".completedTodo")) {
        filterTextChange('completed');
    }
    render();
})
}
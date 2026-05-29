import { defaultListCreator, updateList } from "./elemnts.js";
import { dispatch, state, subscribe } from "./redux/reducer.js";

const app = document.getElementById('app');
const lists = document.getElementById('lists')

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

function addTodo(){
    const title = todoInput.value.trim();
    if(!title) return;

    const newTodo = {
        title,
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        status: false
    }

    dispatch({ type: "ADD_TODO", payload: newTodo});
 
    todoInput.value = '';
}

function deleteTodo(id){
    dispatch({ type: "DELETE_TODO", payload: id });
}

function updateTodo(id){
    dispatch({ type: "SET_EDIT", payload: id });
}

function saveTodo(id, newTitle){
    dispatch({
        type: "SAVE_TODO",
        payload: {id, title: newTitle}
    });
}

function completeTodo(id){
    dispatch({ type: "TOGGLE_TODO", payload: id });
}

function cancelEdit(){
    dispatch({ type: "CANCEL_EDIT"})
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
//    render();
})

addTodoBtn.addEventListener('click', addTodo);

subscribe(render);


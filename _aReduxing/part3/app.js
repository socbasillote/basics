import { btnEvents } from "./events/evnts.js";
import { createStore } from "./redux/store.js";
import { defaultTodo, editTodo } from "./ui/listElement.js";

const app = document.getElementById('app');
const lists = document.getElementById('lists');

const store = createStore();


function render(){
    lists.textContent = '';
    let state = store.getState().todos;
    
    state.forEach(todo => {
        createTodo(todo);
    })
}


function createTodo(todo){
    const li = document.createElement('li');
    li.dataset.id = todo.id;
    li.className = 'list';

    if(store.getState().editIdTodo === todo.id){
        editTodo(li, todo);
        lists.appendChild(li);

        const editInputFocus = document.querySelector('.editInput');
        editInputFocus.focus();
        editInputFocus.setSelectionRange(editInputFocus.value.length, editInputFocus.value.length);
        return;
    }
    defaultTodo(li, todo);

    lists.appendChild(li);
}


btnEvents(store);

store.subscriber(render);

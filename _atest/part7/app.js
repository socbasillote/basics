import { createTodoDefault, updateTodoElement } from "./elemnt.js";
import { dispatch, state, subscribe } from "./redux/reducer.js";
import { getFilterTodo } from "./redux/selectors.js";

const app = document.getElementById('app');
const lists = document.getElementById('lists');

const priorities = document.getElementById('priority');
const filterPriority = document.getElementById('filterPriority');

const todoInput = document.querySelector('.todoInput');
const addTodoBtn = document.querySelector('.addTodoBtn');

function render(){
    lists.innerHTML = '';

    const filterTodo = getFilterTodo(state);

    filterTodo.forEach(todo => {
        createTodo(todo);
    })

}

function createTodo(todo){
    const li = document.createElement('li');
    li.dataset.id = todo.id;
    li.draggable = true;

  

    li.className = `list ${todo.priority === 1 ? 'priolow' : todo.priority === 2 ? 'priomid' : 'priohigh'}`;

    if(state.editIdTodo === todo.id){
        updateTodoElement(li, todo);
        lists.appendChild(li);
        const editInput = document.querySelector('.editInput');
        editInput.focus();
        editInput.setSelectionRange(editInput.value.length, editInput.value.length);
        return;
    }
    createTodoDefault(li, todo);

    lists.appendChild(li);
}


function addTodo(){
    const title = todoInput.value.trim();
    const prop = Number(priorities.value); 
    if(!title) return;
    
    const newTodo = {
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        title,
        status: false,
        priority: prop
    }

    dispatch({type: 'ADD_TODO', payload: newTodo})
    todoInput.value = '';
    console.log(state);
}



addTodoBtn.addEventListener('click', addTodo);

app.addEventListener('click', (e) => {
    const li = e.target.closest('[data-id]');
    if(!li) return;

    const id = li.dataset.id;

    if(e.target.closest('.deleteBtn')){
        dispatch({type: 'DELETE_TODO', payload: id})
    }

    if(e.target.closest('.updateBtn')){
        dispatch({type: 'UPDATE_TODO', payload: id})
    }
    if(e.target.closest('.saveBtn')){
        const newTitle = document.querySelector('.editInput');
        const editPriority = document.getElementById('editPriority');
        
        dispatch({type: 'SAVE_TODO', payload: {id: id, title: newTitle.value, priority: Number(editPriority.value)}})
        console.log(state);
    }
    if(e.target.closest('.cancelBtn')){
        dispatch({type: 'CANCEL_UPDATE'})
    }

    if(e.target.closest('.checkBox')){
        dispatch({type: 'TOGGLE_TODO', payload: id})
        console.log(state)
    }

})

app.addEventListener('click', (e) => {
    if(e.target.closest('.completeBtn')){
        console.log(state)
        dispatch({type: 'ACTIVE_TODO', payload: 'COMPLETE'})
    }
    if(e.target.closest('.activeBtn')){
        console.log(state)
        dispatch({type: 'ACTIVE_TODO', payload: 'ACTIVE'})
    }
    if(e.target.closest('.allBtn')){
        console.log(state)
        dispatch({type: 'ACTIVE_TODO', payload: 'ALL'})
    }
})

filterPriority.addEventListener('change', (e) => {
    const num = Number(e.target.value);

    if(num === 3){
        dispatch({type: 'SORT_HIGH'})
    }
    if(num === 1){
        dispatch({type: 'SORT_LOW'})
    }
})

let draggedItem = null;
lists.addEventListener('dragstart', (e) => {
    const li = e.target.closest('.list');
    if (!li) return;

    draggedItem = li;
    li.classList.add('dragging');
})

lists.addEventListener('dragend', (e) => {
    const li = e.target.closest('.list');
    if (!li) return;

    li.classList.remove('dragging');
    draggedItem = null;
    
    // saveOrder();
})

lists.addEventListener('dragover', (e) => {
    e.preventDefault();

    const afterElement = getDragAfterElement(
        lists,
        e.clienty
    );

    if (!draggedItem) return;

    if (afterElement == null){
        lists.appendChild(draggedItem)
    } else {
        lists.insertBefore(draggedItem, afterElement);
    }
});

function getDragAfterElement(container, y) {
    const elements = [
        ...container.querySelectorAll('.list:not(.dragging)')
    ];

    return elements.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;

            if (offset < 0 && offset > closest.offset) {
                return {
                    offset,
                    element: child
                };
            }

            return closest;
        },
        {
            offset: Number.NEGATIVE_INFINITY
        }
    ).element;
}

function saveOrder(){
    const orderedIds = [
        ...lists.querySelectorAll('.list')
    ].map(li => li.dataset.id);

    dispatch({
        type: 'REORDER_TODOS',
        payload: orderedIds
    });
}

subscribe(render);

import { state, editItemId, 
        addTodo, deleteTodo, updateTodo, saveBtn, cancelUpdate 
} from "./todoHandler.js";

const app = document.getElementById('app');
const lists = document.getElementById('lists');

const todoInput = document.querySelector('.todoInput');
const addBtn = document.getElementById('addTodoButton');




function render(){
    lists.innerHTML = '';

    state.forEach(todo => {
        createTodo(todo);
    })
}

function createTodo(data){
    let li = document.createElement('li');
    li.dataset.id = data.id;
    li.classList.add('list');

    console.log(`${editItemId} | ${data.id}`)
    if (editItemId == data.id) {
        li.innerHTML = `
            <input type="text" value="${data.title}" class="editTodoInput" />
            <button class="saveBtn">Save</button>
            <button class="cancelBtn">Cancel</button>
        `;
        lists.appendChild(li);
        const inputfield = li.querySelector('.editTodoInput');

        inputfield.focus();
        inputfield.setSelectionRange(
            inputfield.value.length,
            inputfield.value.length
        );
        return
    }

    li.innerHTML = `
        <span>${data.title}</span>
        <button class="updateBtn">Update</button>
        <button class="deleteBtn">Delete</button>
    `;

    
    lists.appendChild(li);

}


app.addEventListener('click', (e) => {
    const li = e.target.closest('[data-id]');
    if(!li) return;
    const id = Number(li.dataset.id);

    if(e.target.closest('.deleteBtn')){
        deleteTodo(id);
    }

    if(e.target.closest('.updateBtn')){
        updateTodo(id);
    }

    if(e.target.closest('.saveBtn')){
        let editTodoInput = document.querySelector('.editTodoInput');
        saveBtn(id, editTodoInput.value);
    }

    if(e.target.closest('.cancelBtn')){
        cancelUpdate();
    }
    render();
})

addBtn.addEventListener('click', () => {
    addTodo(todoInput);
    render();
});

render();

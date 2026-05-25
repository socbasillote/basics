const app = document.getElementById('app');
const lists = document.getElementById('lists');

const todoInput = document.querySelector('.todoInput');
const addTodoBtn = document.querySelector('.addTodoBtn');


let state = []; // source of truth
let editId = null; // if its true, createtodo will render again and change the element with editing input
function render(){
    lists.innerHTML = "";

    state.forEach((todo) => {
        createTodo(todo);
    })
}

function createTodo(todo){
    const li = document.createElement('li');

    li.dataset.id = todo.id;
    li.classList.add('list');

    if (editId == todo.id){
        li.innerHTML = `
            <input type='text' value="${todo.title}" class="editingInput">
            <div>
                <button class="saveBtn">Save</button>
                <button class="cancelBtn">Cancel</button>
            </div>
        `
        lists.appendChild(li);
        const editInput = document.querySelector('.editingInput');
        editInput.focus();
        editInput.setSelectionRange(editInput.value.length, editInput.value.length);
        return;
    }

    li.innerHTML = `
        <span class='todoText ${todo.status == 'complete' ? "complete" : ''}'>${todo.title}</span>
        <div>
            <button class="updateBtn">Update</button>
            <button class="deleteBtn">Delete</button>
        </div>
    `;

    lists.appendChild(li);
}

function addTodo(){
    const todoInputValue = todoInput.value;
    const newId = crypto.randomUUID();

    const newTodo ={
        id: newId,
        title: todoInputValue,
        status: 'active'
    }

    state.push(newTodo);

    todoInput.value = '';
    render();
}

function deleteTodo(id){
    state = state.filter(todo => todo.id != id);
}

function updateTodo(id){
    editId = id;
}

function saveTodo(id, newTitle){

    state = state.map(todo => {
        if(todo.id == id){
            return {
                ...todo,
                title: newTitle
            }
        };

        return todo
    })

    editId = null;
}

function cancelTodo(){
    editId = null;
}

function completeStatus(id){
    state = state.map(todo => {
        if(todo.id == id){
            if(todo.status != 'complete'){
                return {
                    ...todo,
                    status: 'complete'
                }
            }
            
            return {
                ...todo,
                status: 'active'
            }
        }

        return todo
    })
    console.log(state);
}

app.addEventListener('click', (e) => {
    const li = e.target.closest('[data-id]');
    if(!li) return;

    const id = li.dataset.id;

    if (e.target.closest('.todoText')){
        completeStatus(id);
    }

    if (e.target.closest('.deleteBtn')) {
        deleteTodo(id);
        console.log(id);
    }

    if (e.target.closest('.updateBtn')) {
        updateTodo(id);
    }

    if (e.target.closest('.saveBtn')) {
        const newTitle = document.querySelector('.editingInput');
        saveTodo(id, newTitle.value)
    }

    if (e.target.closest('.cancelBtn')) {
        cancelTodo();
    }

    render();
})

addTodoBtn.addEventListener('click', addTodo);

render();
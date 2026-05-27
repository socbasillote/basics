const app = document.getElementById('app');
const lists = document.getElementById('lists');

const todoInput = document.querySelector('.todoInput');
const addTodoBtn = document.querySelector('.addTodoBtn');

const filterBtns = document.querySelector('.filterBtns');

let storage = localStorage.getItem('state');
let state = storage  ? JSON.parse(storage) : [];


let editId = null;
let filterText = 'all';

function render(){
    lists.innerHTML = '';
    localStorage.setItem('state', JSON.stringify(state));

    let filteredTodo = state;

    if(filterText == 'completed'){
        filteredTodo = filteredTodo.filter(todo => todo.status == 'completed');
        console.log(filteredTodo)
    }

    if(filterText == 'active'){
        filteredTodo = filteredTodo.filter(todo => todo.status == 'active');
    }

    filteredTodo
        .sort((a, b) => b.id - a.id)
        .forEach(todo => {createTodo(todo); });
}

function createTodo(todo){
    const li = document.createElement('li');
    
    li.dataset.id = todo.id;
    li.classList.add('list');
    
    if (editId === todo.id){
        li.innerHTML = `
            <div class='todolistEdit'>
                <input type='text' value="${todo.title}" class='editTodoInput' />
                <div>
                    <button class="saveBtn">Save</button>
                    <button class="cancelBtn">Cancel</button>
                </div>
            </div>
        `;

        lists.appendChild(li);
        const editTodo = document.querySelector('.editTodoInput');
        editTodo.focus();
        editTodo.setSelectionRange(editTodo.value.length, editTodo.value.length);
        return;
    }
    li.innerHTML = `
        <div class='todolist'>
            <span class="listTitle ${todo.status == 'completed' ? 'completeTodo' : ''}">${todo.title}</span>
            <div>
                <button class="updateBtn">Update</button>
                <button class="deleteBtn">Delete</button>
            </div>
        </div>
    `;

    lists.appendChild(li);
}

function addTodo(){
    const inputValue = todoInput.value;
    const id = Date.now();

    const newTodo = {
        id,
        title: inputValue,
        status: 'active'
    }

    state.push(newTodo);

    render();
    todoInput.value = '';
}

function deleteTodo(id){
    state = state.filter(todo => todo.id != id);
}

function updateTodo(id){
    editId = id;
}

function saveTodo(id, newTitle){
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

function cancelTodo(){
    editId = null;
}

function completedTodo(id){
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

app.addEventListener('click', (e) => {
    const list = e.target.closest('[data-id]');
    if (!list) return;
    const id = Number(list.dataset.id);
    
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
        console.log(state);
    }

    render();
})

addTodoBtn.addEventListener('click', addTodo)

filterBtns.addEventListener('click', (e) => {
    if (e.target.closest('.allTodo')) {
        filterText = 'all'
        console.log('test')
    }

    if (e.target.closest('.activeTodo')){
        filterText = 'active'
        console.log('active')
    }

    if (e.target.closest(".completedTodo")) {
        filterText = 'completed'
    }
    render();
})

render();
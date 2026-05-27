const app = document.getElementById('app');
const lists = document.getElementById('lists');

const todoInput = document.querySelector('.todoInput');
const addTodoBtn = document.querySelector('.addTodoBtn');

let state = [];
let editId = null;

function render(){
    lists.innerHTML = '';

    state.forEach(todo => {
        createTodo(todo);
    })
}

function createTodo(todo){
    const li = document.createElement('li');
    
    li.dataset.id = todo.id;
    li.classList.add('list');
    
    if (editId === todo.id){
        li.innerHTML = `
            <div>
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
        <div>
            <span class="listTitle ${todo.status == 'complete' ? 'completeTodo' : ''}">${todo.title}</span>
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
    const id = crypto.randomUUID();

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
            if(todo.status != 'complete') {
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
        return todo;
    })
}

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
        console.log(state);
    }

    render();
})

addTodoBtn.addEventListener('click', addTodo)

render();
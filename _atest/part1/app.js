const app = document.getElementById('app');
const lists = document.getElementById('lists');

const todoInput = document.querySelector('.todoInput');
const addTodoBtn = document.querySelector('.addTodoBtn');

const todoCount = document.querySelector('.todoCount');

let state = [];
let editId = null;

function render(){
    lists.innerHTML = '';

    state.forEach(todo => {
        createTodo(todo);
    })

    todoCount.textContent = `${state.length}`;
}

function createTodo(todo){
    const li = document.createElement('li');
    li.dataset.id = todo.id;
    li.classList.add('list');

    if (editId === todo.id) {
        li.innerHTML = `
            <div class="listStyle">
                <input type='text' value="${todo.title}" class="editInput" />
                <div>
                    <button class="saveBtn">Save</button>
                    <button class="cancelBtn">Cancel</button>
                </div>
            </div>
        `;
        lists.appendChild(li);
        const editInput = document.querySelector('.editInput');
        editInput.focus();
        editInput.setSelectionRange(editInput.value.length, editInput.value.length);
        return;
    }

    li.innerHTML = `
        <div class="listStyle">
            <span class="todoText ${todo.status === 'complete' ? 'complete' : ''}">${todo.title}</span>
            <div>
                <button class="updateBtn">Update</button>
                <button class="deleteBtn">Delete</button>
            </div>
            
        </div>
    `;
    

    lists.appendChild(li);
}

function addTodo() {
    const inputValue = todoInput.value;
    const newId = crypto.randomUUID();

    const newTodo = {
        id: newId,
        title: inputValue,
        status: 'active'
    };

    state.push(newTodo);
    render();
    todoInput.value = '';
}

function deleteTodo(id) {
    state = state.filter(todo => todo.id != id);
}

function updateTodo(id){
    editId = id;
}

function saveTodo(id, newTitle){
    state = state.map(todo => {
        if(todo.id === id){
            return {
                ...todo,
                title: newTitle
            };
        }

        return todo
    })

    editId = null;
}

function cancelBtn(){
    editId = null;
}

function todoComplete(id){
    state = state.map(todo => {
        if (todo.id === id){
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
        return todo
    })
}

app.addEventListener('click', (e) => {
    const li = e.target.closest('[data-id]');
    if (!li) return;
    const listId = li.dataset.id;
    
    if (e.target.closest('.deleteBtn')) {
        deleteTodo(listId);
    }

    if (e.target.closest('.updateBtn')) {
        updateTodo(listId);
    }

    if(e.target.closest('.saveBtn')){
        const editInput = document.querySelector('.editInput');
        saveTodo(listId, editInput.value);
    }

    if (e.target.closest('.cancelBtn')) {
        cancelBtn();
    }

    if(e.target.closest('.todoText')){
        todoComplete(listId);
        console.log(state)
    }

    render();
})

addTodoBtn.addEventListener('click', addTodo);

render();
const app = document.getElementById('app');
const lists = document.getElementById('lists');

const todoInput = document.querySelector('.todoInput');
const todoAddBtn = document.querySelector('.todoAddBtn');

let state = [];
let editId = null;

function render(){
    lists.innerHTML = '';

    state.forEach(todo => {
        createTodo(todo);
    });
}

function createTodo(todo){
    const li = document.createElement('li');
    li.dataset.id = todo.id;
    li.classList.add('list');

    if (editId === todo.id) {
        li.innerHTML = `
            <div class="listContent">
                <input type='text' value="${todo.title}" class='editTodoInput' />
                <div>
                    <button class="saveBtn">save</button>
                    <button class='cancelBtn'>cancel</button>
                </div>
            </div>
        `;
        lists.appendChild(li);
        const editInput = document.querySelector('.editTodoInput');
        editInput.focus();
        editInput.setSelectionRange(editInput.value.length, editInput.value.length);

        return
    }
    li.innerHTML = `
        <div class="listContent">
            <span>${todo.title}</span>
            <div>
                <button class="updateBtn">Update</button>
                <button class='deleteBtn'>Delete</button>
            </div>
        </div>
    `;

    lists.appendChild(li);
}

function addTodo(){
    const newTitle = todoInput.value;
    const newId = crypto.randomUUID();

    if(!newTitle) return;
    
    const newTodo = {
        id: newId,
        title: newTitle,
        state: 'active'
    };

    state.push(newTodo);
    render();
    todoInput.value = ''
}

function deleteTodo(id){
    state = state.filter(todo => todo.id == id);
}

function updateTodo(id){
    editId = id;
}

function saveTodo(id, newTitle){

    state = state.map(todo => {
        if (todo.id === id){
            return {
                ...todo,
                title: newTitle
            }
        }

        return todo
    })
    editId = null;
}

function cancelTodo(){
    editId = null;
}
app.addEventListener('click', (e) => {
    const li = e.target.closest('[data-id]');
    if(!li) return;
    
    const listId = li.dataset.id;

    if (e.target.closest('.deleteBtn')) {
        deleteTodo(listId);
    }
    if(e.target.closest('.updateBtn')){
        updateTodo(listId);
    }

    if(e.target.closest('.saveBtn')){
        const editInput = document.querySelector('.editTodoInput');
        saveTodo(listId, editInput.value);
    }
    if(e.target.closest('.cancelBtn')){
        cancelTodo();
    }
    render();
})


todoAddBtn.addEventListener('click', addTodo);
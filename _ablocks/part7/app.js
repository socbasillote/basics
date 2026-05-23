const app = document.getElementById('app');
const lists = document.getElementById('lists');

const inputTodo = document.querySelector('.inputTodo');
const addTodoBtn = document.querySelector('.addTodoBtn');

let state = [];
let editId = null;

function render(){
    lists.innerHTML = "";

    state.forEach(todo => {
        createTodo(todo);
    })
};

function createTodo(todo){
    const li = document.createElement('li');

    li.dataset.id = todo.id;
    li.classList.add('list');

    if (editId == todo.id){
        li.innerHTML = `
            <input type="text" value="${todo.title}" class="editInput" />
            <div>
                <button class="saveBtn">Save</button>
                <button class="cancelBtn">Cancel</button>
            </div>
        `;
        lists.appendChild(li);
        const editInput = document.querySelector('.editInput');
        editInput.focus();
        editInput.setSelectionRange(editInput.value.length, editInput.value.length);
        return;
    }
    li.innerHTML = `
        <span>${todo.title}</span>
        <div>
            <button class="updateBtn">Update</button>
            <button class="deleteBtn">Delete</button>
        </div>
    `;

    lists.appendChild(li);
}

function addTodo(){
    const newTitle = inputTodo.value;
    const newId = crypto.randomUUID();

    const newTodo = {
        id: newId,
        title: newTitle,
        status: 'active'
    };

    state.push(newTodo);
    render();
    inputTodo.value = "";
}


function deleteTodo(id) {
    state = state.filter(todo => todo.id != id);
}

function updateTodo(id) {
    editId = id;
    console.log(editId)
}

function saveTodo(id, newTitle){

    state = state.map(todo => {
        if(todo.id == id) {
            return {
                ...todo,
                title: newTitle
            };
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
    if (!li) return;
    const id = li.dataset.id;

    if (e.target.closest('.deleteBtn')){
        deleteTodo(id);
    }

    if (e.target.closest('.updateBtn')){
        updateTodo(id);
    }

    if (e.target.closest('.saveBtn')){
        const editInput = document.querySelector('.editInput');
        saveTodo(id, editInput.value);
    }
    
    if (e.target.closest('.cancelBtn')){
        cancelTodo();
    }
    render();
})
addTodoBtn.addEventListener('click', addTodo);
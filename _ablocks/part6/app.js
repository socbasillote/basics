const app = document.getElementById("app");

const lists = document.getElementById('lists');

const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');


let state = []
let editId = null;

function render(){
    lists.innerHTML = "";

    state.forEach(todo => {
        createTodo(todo);
    })

}

function createTodo(todo){
    const li = document.createElement('li');

    li.dataset.id = todo.id;
    li.classList.add('list');

    if(editId == todo.id){
        li.innerHTML = `
            <input type="text" value="${todo.title}" class="editInput" />
            <button class="saveBtn">Save</button>
            <button class="cancelBtn">Cancel</button>
        `;
        lists.appendChild(li);
        const inputField = document.querySelector('.editInput');
        inputField.focus();
        inputField.setSelectionRange(inputField.value.length, inputField.value.length);

        return;
    }
    li.innerHTML = `
        <span>${todo.title}</span>
        <button class='updateBtn'>Update</button>
        <button class='deleteBtn'>Delete</button>
    `

    lists.appendChild(li);
}

function addTodo(){
    const input = todoInput.value;
    const newId = crypto.randomUUID();

    const newTodo = {
        id: newId,
        title: input,
        status: 'active'
    };

    state.push(newTodo);
    render();
    todoInput.value = "";
}

function deleteTodo(id){
    state = state.filter(todo => todo.id != id);
}

function updateTodo(id){
    editId = id
    console.log(editId);
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
    });

    editId = null;
}

function cancelTodo(){
    editId = null;
}

app.addEventListener('click', (e) => {
    const li = e.target.closest('[data-id]');
    if(!li) return;
    const id = li.dataset.id;

    if(e.target.closest('.deleteBtn')){
        deleteTodo(li.dataset.id);
    }
    if(e.target.closest('.updateBtn')) {
        updateTodo(id);
    }

    if(e.target.closest('.saveBtn')) {
        const newTitle = document.querySelector('.editInput')
        saveTodo(id, newTitle.value);
    }

    if(e.target.closest('.cancelBtn')) {
        cancelTodo();
    }

    render();
});

addTodoBtn.addEventListener('click', addTodo);

render();
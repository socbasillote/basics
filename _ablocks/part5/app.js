const app = document.getElementById('app');
const lists = document.getElementById('lists');

const todoInput = document.querySelector('.todoInput');
const addBtn = document.getElementById('addTodoButton');


let state = [];
let editItemId = null;

function render(){
    lists.innerHTML = '';

    state.forEach(todo => {
        createTodo(todo);
    })
}

function addTodo(){
    const todoId = Date.now();
    const todoTitle = todoInput.value;

    if(!todoTitle) return;

    const newTodo = {
        id: todoId,
        title: todoTitle,
        status: 'active'
    };

    state.push(newTodo);

    render();
    todoInput.value = '';
}

function createTodo(data){
    const li = document.createElement('li');
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

function deleteTodo(id){
    state = state.filter(todo => todo.id != id)
}

function updateTodo(id){
    editItemId = id
   console.log(editItemId);
}

function saveBtn(id, newTitle){

    state = state.map(todo => {
        if(todo.id == id){
            return {
                ...todo,
                title: newTitle
            };
        }
        return todo
    })

    editItemId = null;
}

function cancelUpdate(){
    editItemId = null;
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

addBtn.addEventListener('click', addTodo);

render();

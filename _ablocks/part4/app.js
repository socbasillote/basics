const app = document.getElementById('app');
const lists = document.getElementById('lists');

const addBtn = document.querySelector('.addBtn');
const inputTodo = document.getElementById('inputTodo');


let state = [
    {id: 1, title: 'test', status: 'active'}
];

let editId = null;

function render(){
    lists.innerHTML = "";
    
    state.forEach(todo => {
        createTodo(todo);
    });
}

function addTodo(){
    const inputValue = inputTodo.value;
    const newId = Date.now();

    const newTodo ={
        id: newId,
        title: inputValue,
        status: 'active'
    }

    state.push(newTodo);

    render();
    inputTodo.value = '';
}

function createTodo(todo){
    const li = document.createElement('li');

    li.dataset.id = todo.id;
    li.classList.add('list');

    if (editId == todo.id) {
        li.innerHTML = `
            <input type="text" value=${todo.title} class="editInput" />
            <button class='saveBtn'>Save</button>
            <button class='cancelBtn'>Cancel</button>
        `;

        lists.appendChild(li);
        li.querySelector('.editInput').focus();
        
        return;
    }

    li.innerHTML = `

        <span>- ${todo.title}</span>
        <button class='updateBtn'>Update</button>
        <button class='deleteBtn'>Delete</button>
    `

    lists.appendChild(li);
}

function deleteTodo(id){
    state = state.filter(todo => todo.id != id);
}

function updateTodo(id){
    editId = id;
    console.log(editId);
}

function saveTodo(id, newTitle){

    state = state.map(todo => {
        if(todo.id == id) {
            return {
                ...todo,
                title: newTitle
            }
        }

        return todo
    });

    editId = null;
}

app.addEventListener('click', (e) => {
    const li = e.target.closest('[data-id]');
    if(!li) return;
    const id = Number(li.dataset.id);
    
    if (e.target.closest('.deleteBtn')){
        deleteTodo(id);
    }

    if (e.target.closest('.updateBtn')){
        updateTodo(id);
    }

    if (e.target.closest('.saveBtn')){
        const li = document.querySelector('.editInput');
        saveTodo(id, li.value);
    }
    render();
})

addBtn.addEventListener('click', addTodo);

render();
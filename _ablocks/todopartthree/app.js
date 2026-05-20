const app = document.getElementById('app');
const lists = document.getElementById('lists');
const addInput = document.getElementById('addInput');
const addBtn = document.getElementById('addBtn');

let state = [
    {id: 1, title: 'test', status: 'active'}

]

let editId = null;

function render(){
    lists.innerHTML = ''

    state.forEach(todo => {
        createTodo(todo);
    })
}

function addTodo(){
    const newTodoTitle = addInput.value;
    const newId = Date.now();

    const newTodo = {
        id: newId,
        title: newTodoTitle,
        status: 'active'
    };

    state.push(newTodo);

    render();
    addInput.value = '';
}


function createTodo(state){
    const li = document.createElement('li');

    li.dataset.id = state.id;
    li.classList.add('list');

    //console.log(`${state.id} | ${editId}`)

    if (editId == state.id) {
        li.innerHTML = `
        <input type='text' value="${state.title}" class="editInput"/>
        <button class="saveBtn">Save</button>
        <button class="cancelBtn">Cancel</button>
    `;
        lists.appendChild(li);
        li.querySelector('.editInput').focus();

        return
    }

    li.innerHTML = `
        <span>${state.title}</span>
        <button class="updateBtn">Update</button>
        <button class="deleteBtn">Delete</button>
    `;

    

    lists.appendChild(li);
}


function deleteBtn(id){
    state = state.filter(todo => todo.id != id);
}

function updateTodo(id){
    editId = id;
}

function saveUpdate(id, newTitle){

   state = state.map(todo => {
        if(todo.id == id){
            return {
                ...todo,
                title: newTitle
            }
        }

        return todo
    })

    editId = null;
}

function cancelButton(){
    editId = null;
}

app.addEventListener('click', (e) => {

    const li = e.target.closest('[data-id]');
    if (!li) return;

    const id = Number(li.dataset.id);


    if(e.target.closest('.deleteBtn')) {
        deleteBtn(id)
    }

    if(e.target.closest('.updateBtn')){
        updateTodo(id);
    }

    if(e.target.closest('.saveBtn')){
        const input = li.querySelector('.editInput');
        console.log(input);
        saveUpdate(id, input.value);
    }

    if(e.target.closest('.cancelBtn')){
        cancelButton();
    }
    render();
})

addBtn.addEventListener('click', addTodo);
render();


const state = {
    todos: []
}

const list = document.getElementById('list');
const inputs = document.getElementById('add-todo')

function render(){
    list.innerHTML = "";

    state.todos.forEach(t => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span>${t.text}</span>
            <button data-id="${t.id}" class="updateBtn">Update</button>

            <button data-id="${t.id}" class="deleteBtn">Delete</button>
           
        `;

        list.appendChild(li);
    });
    console.log('render')
}

function addTodo(text){

    const addList = {
        id: state.todos.length + 1,
        text
    };


    state.todos.push(addList)
    render();
}

function updateTodo(ids, newText) {

    state.todos = state.todos.map((t) => {
        if (t.id == ids) {
            return {
                ...t,
                text: newText,
            }
        }

        return t;
    })

    render();
}

function deleteTodo(ids) {

    state.todos = state.todos.filter((t) => t.id != ids);
    console.log(state.todos);
    render();
}

const addBtn = document.getElementById('addBtn');


addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const text = inputs.value.trim();
    addTodo(text);
    
    console.log(text)
    inputs.value = '';
})



list.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    
    if (e.target.classList.contains('deleteBtn')){
        deleteTodo(id);
    }

    // update
    if (e.target.classList.contains('updateBtn')) {
        const newText = prompt("Edit todo:");

        if (newText) {
            updateTodo(id, newText);
        }
    }
    
})
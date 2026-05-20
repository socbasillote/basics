const app = document.getElementById('app');
const lists = document.getElementById('lists')
const inputTitle = document.getElementById('addTodo');

const addBtn = document.getElementById('addBtn');

let state = []
let editingId = null;
// {id: 1, title: titless, status: active/completed }


function render(){
    lists.innerHTML = "";
    console.log(state);
    if (state.length != 0){
        state.forEach(t => createTodo(t));
        document.querySelector('.placeholderTodo').hidden = true;

    } else {
        document.querySelector('.placeholderTodo').hidden = false;
    }
    
}

function createTodo(data){
    const li = document.createElement("li");
    li.dataset.id = data.id;
    li.classList.add('list')

    if (editingId == data.id) {
        li.innerHTML = `
            <input class="editInput" type='text' value="${data.title}" />
            <button class="saveBtn">Save</button>
            <button class="cancelBtn">Cancel</button>
        `
        lists.appendChild(li);

        li.querySelector('.editInput').focus();

        return
    } 

    li.innerHTML = `
        <span>${data.title}</span> 
        <button class="updateBtn">Update</button> 
        <button class="deleteBtn">Delete</button>
    `;
        
    
    lists.appendChild(li);
}

function addTodo(){
    const newTitle = inputTitle.value;
    const newId = Date.now();
    console.log(newId);
    const newTodo = {
        id: newId,
        title: newTitle,
        status: 'active'
    };

    state.push(newTodo);
    inputTitle.value = "";
    render();
}

function deleteTodo(id){

    state = state.filter(l => l.id != id);
}

function updateTodo(id) {
    editingId = id;

}

function saveTodo(id, newTitle){
    state = state.map(todo => {
        if (todo.id == id) {
            return {
                ...todo,
                title: newTitle
            }
        }

        return todo;
    })

    editingId = null;
}


/* function saveTodo(id, newTitle){
    state = state.map(todo => {
        if (todo.id === id){
            return {
                ...todo,
                title: newTitle
            }
        }

        return;
    })
}
 */

function cancelEdit(){
    editingId = null;
}
app.addEventListener('click', (e) => {
    const li = e.target.closest('[data-id]');
    if (!li) return;

    const deleteBtn = e.target.closest('.deleteBtn');
    const updateBtn = e.target.closest('.updateBtn');
   
    const id = Number(li.dataset.id);
    console.log(id);
    if(deleteBtn) {
        deleteTodo(li.dataset.id);
    }

    if(updateBtn){
        updateTodo(li.dataset.id);
    }
    if(e.target.closest('.saveBtn')){
        const input = li.querySelector('.editInput');
        saveTodo(id, input.value);
    }
    if(e.target.closest('.cancelBtn')){
        cancelEdit();
    }
    render();
})
addBtn.addEventListener("click", addTodo);
render();
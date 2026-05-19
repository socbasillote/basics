const app = document.getElementById("app");
const lists = document.getElementById('lists');
const input = document.getElementById('inputTodo');
const addBtn = document.getElementById('addBtn');
const counts = document.getElementById('countActive');

const activeBtn = document.getElementById('activeBtn');
const completeBtn = document.getElementById('completeBtn');

let countActive = 0;
let todos = [
    {id: 1, title: "test", status: 'active'},
    {id: 2, title: "I am number 2", status: 'active'},
    {id: 3, title: "The third", status: 'completed'}
]


function countActiveTodo(){
     countActive = 0
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].status == 'active'){
            countActive++;
        }
    }
    counts.textContent = countActive;
}



function render() {
    lists.innerHTML = '';
    todos.sort((a, b) => b.id - a.id);
    todos.map(t => renderTodo(t));
    countActiveTodo();
}



function renderTodo(data){
    const li = document.createElement("li");
    
    li.innerHTML = `
        <span>${data.title}</span> 
        <button class="updateBtn">Update</button> 
        <button class="delBtn">Delete</button>
    `;
    li.classList.add('list')
    li.dataset.id = data.id;

    if(data.status == 'completed') {
        li.classList.add('complete');
    }

    lists.appendChild(li);
}

function addTodo(){
    const addTitle = input.value;

    const newTodo = {
        id: todos.length + 1,
        title: addTitle,
        status: 'active',
    };

    todos.push(newTodo);
    input.value = '';
    render();
}

function deleteTodo(id){
    todos = todos.filter(t => (t.id != id));
    render();
}

function updateTodo(id){
    const promp = prompt('Edit title',);
    todos.map(t => t.id == id ? t.title = promp : todos);
   render();
}

function completeTodo(id) {

    todos.map(t => {
        t.id == id ? t.status == 'completed' ? t.status = 'active' : t.status = 'completed' : todos
        
        
    })

   render();
}

function activeTodo(){
    
    todos = todos.filter(t => t.status == 'active');
    render();
}

function completeTodos(){
    
    todos.forEach(t => t.status == 'completed');
   // render();
}





app.addEventListener('click', (e) => {
    const idTarget = e.target.closest('[data-id]');
    const delBtn = e.target.closest('.delBtn')
    const updateBtn = e.target.closest('.updateBtn');

    if(idTarget){
        completeTodo(idTarget.dataset.id);
        console.log('test2')
       idTarget.classList.toggle('complete');
        
    }

    if (delBtn){
        console.log(idTarget.dataset.id)
        deleteTodo(idTarget.dataset.id);
    }

    if (updateBtn) {
        console.log('update')
        updateTodo(idTarget.dataset.id);
    }

    
});

addBtn.addEventListener('click', addTodo);
activeBtn.addEventListener('click', activeTodo)
completeBtn.addEventListener('click', completeTodos);

render();

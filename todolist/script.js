let data = [
    {id: 1, title: "Title 1", completed: false},
    {id: 2, title: "Title 2", completed: false}
]


const list = document.getElementById("list");
const title = document.getElementById("title");
const btn = document.getElementById("addTodo");
const todos = document.getElementById("todos");
// filter button
const completeBtn = document.getElementById("completeBtn");
const allBtn = document.getElementById("allBtn");
const activeBtn = document.getElementById("activeBtn");

let currentFilter = () => true;

function render(){
    list.innerHTML = "";
    //todos.innerHTML = ""; 
    
   const filtered = data.filter(currentFilter);

    if (filtered.length === 0) {
        placeHolder();
        return;
    }

    filtered.forEach(appendTodo);
}

function placeHolder(){
    const placeHolder = document.createElement("p");
    placeHolder.textContent = "Create Todo";
    todos.appendChild(placeHolder);

}


function appendTodo(newTodo) {
    const li = document.createElement("li");

    li.dataset.id = newTodo.id;

    const span = document.createElement("span");
    span.textContent = newTodo.title;

    li.classList.toggle("completed", newTodo.completed);

    const delBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    
    delBtn.textContent = "Delete";
    delBtn.classList.add("deleteBtn");

    editBtn.textContent = "Edit";
    editBtn.classList.add("editBtn")

    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(editBtn);

    list.appendChild(li);
}

function addTodo(d){
    const titleValue = title.value.trim();
    if(!titleValue) return;

    const newTodo ={
        id: Date.now,
        title: titleValue,
        completed: false
    };

    data.push(newTodo);
    render();
    title.value = "";
}


function deleteTodo(id){
    data = data.filter(d => d.id !== id);
    render();
}

function toggleTodo(id){
    data.forEach(d => {
        if (d.id === id) {
            d.completed = !d.completed;
        }
    });
    render();
}

let currentlyEditingId = null;

function editTodo(id){
    // aif another item is being edited, save it first

    const li = document.querySelector(`li[data-id="${id}"]`);
    const todo = data.find(d => d.id === id);
    if (!li || !todo) return;

    currentlyEditingId = id;

    li.innerHTML = `
        <input type="text" class="editInput" value="${todo.title}" />
        <button class="saveBtn">Save</button>
    `;

    const input = li.querySelector(".editInput");
    const saveBtn = li.querySelector(".saveBtn");

    input.focus();

    function handleSave(){
        saveEdit(id, input.value);
        currentlyEditingId = null;
    }
    // Save on enter
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter"){
            handleSave();
        }
    });

    saveBtn.addEventListener("click", handleSave);
    
}


function saveEdit(id, newText) {
    const todo = data.find(d => d.id === id);
    if (!todo) return;

    if (newText.trim() !== "") {
        todo.title = newText.trim();
    }

    render(); // re-rendering after save
}

list.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    const id = Number(li.dataset.id);

    if (e.target.classList.contains("deleteBtn")) {
        deleteTodo(id);
        return;
    }
    if(e.target.classList.contains('editBtn')){
        editTodo(id);
        return;
    }
    
    if(!e.target.classList.contains("saveBtn") && !e.target.classList.contains("editInput")) {
        toggleTodo(id);
    }
    
})

btn.addEventListener("click", addTodo);

function allList(){
    currentFilter = () => true;
    render();
}

function completedList(){
    currentFilter = d => d.completed === true;
    render();
}

function activeList(){
    currentFilter = d => d.completed === false;
    render();
    
}

completeBtn.addEventListener("click", completedList)
allBtn.addEventListener("click", allList);
activeBtn.addEventListener("click", activeList);

render();
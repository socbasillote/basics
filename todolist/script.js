
let data = [
    {id: 1, title: "Title 1", completed: false},
    {id: 2, title: "Title 2", completed: false}
]

const list = document.getElementById("list");

const btn = document.getElementById("addTodo");

// filter button
const completeBtn = document.getElementById("completeBtn");
const allBtn = document.getElementById("allBtn");
const activeBtn = document.getElementById("activeBtn");

let currentFilter = () => true;

function render(){
    list.innerHTML = "";
  data
    .filter(currentFilter)
    .forEach((d) => {
        appendTodo(d)
    })
}

function appendTodo(newTodo) {
    const li = document.createElement("li");

    li.textContent = newTodo.title;
    li.dataset.id = newTodo.id;

    li.classList.toggle("completed", newTodo.completed);

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.classList.add("deleteBtn");

    li.appendChild(delBtn);
    list.appendChild(li);
}

function addTodo(d){
    const titleValue = title.value.trim();
    if(!titleValue) return;

    const newTodo ={
        id: data.length + 1,
        title: titleValue,
        completed: false
    };

    data.push(newTodo);
    render();
    title.value = "";
}


function deleteTodo(id){
    
    // remove from array
    data = data.filter(d => d.id !== id);
    render();
}

function toggleTodo(id){
    data.forEach(d => {
        if (d.id === id) {
            d.completed = !d.completed;
        }
    })
    render();
}

list.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    const id = Number(li.dataset.id);

    if (e.target.classList.contains("deleteBtn")) {
        deleteTodo(id);
        return;
    }
    toggleTodo(id);
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
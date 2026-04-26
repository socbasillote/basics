let tasks = [];

function displayTasks() {
    let html = "";
    for (let i = 0; i < tasks.length; i++){
        html += "<li class='task'>" + tasks[i].title + " <button onclick='removeTask(" + i + ")'>x</button></li>";
    }
    document.getElementById("list").innerHTML = html;

}

function addTask() {
    let taskInput = document.getElementById("task");
    let text = taskInput.value;
    if(text === "") {
        return;
    }

    let newTask = {
        id: Date.now(),
        title: text,
    };
    tasks.push(newTask);
    taskInput.value = "";
    saveTasks();
    displayTasks();
}

function removeTask(i){
    tasks.splice(i, 1);
    saveTasks();
    displayTasks();
}

function clearAll(){
    tasks = [];
    saveTasks();
    displayTasks();
}
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let saved = localStorage.getItem("tasks");
    if (saved !== null) {
        tasks = JSON.parse(saved);
    }
}

let list = document.getElementById("list");
list.addEventListener('click', (e) => {
console.log(e.target.id)
})

loadTasks();
displayTasks();

document.getElementById("click", (e) => {
    console.log(e.target.value)
})
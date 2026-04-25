const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");
const placeholder = document.getElementById("placeholder");
const countEl = document.getElementById("count");
const filterButtons = document.querySelectorAll(".filters button");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";
let editingId = null;

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function render() {
  list.innerHTML = "";

  let filtered = todos.filter(todo => {
    if (currentFilter === "active") return !todo.completed;
    if (currentFilter === "completed") return todo.completed;
    return true;
  });

  filtered.forEach(todo => {

    
    const li = document.createElement("li");
    if (todo.completed) li.classList.add("completed");

    // TEXT or INPUT (edit mode)
    let content;
    if (editingId === todo.id) {
      content = document.createElement("input");
      content.type = "text";
      content.value = todo.text;
      content.className = "edit-input";

      content.addEventListener("keypress", e => {
        if (e.key === "Enter") finishEdit(todo.id, content.value);
      });

      content.addEventListener("blur", () => {
        finishEdit(todo.id, content.value);
      });

      setTimeout(() => content.focus(), 0);
    } else {
      content = document.createElement("span");
      content.textContent = todo.text;
      content.onclick = () => toggleTodo(todo.id);
    }

    const actions = document.createElement("div");
    actions.className = "actions";

    const editBtn = document.createElement("button");
    editBtn.textContent = editingId === todo.id ? "Save" : "Edit";
    editBtn.onclick = () => {
      if (editingId === todo.id) {
        const inputField = li.querySelector(".edit-input");
        finishEdit(todo.id, inputField.value);
      } else {
        startEdit(todo.id);
      }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteTodo(todo.id);

    actions.append(editBtn, deleteBtn);

    li.append(content, actions);
    list.appendChild(li);
  });

  // Placeholder
  placeholder.style.display = filtered.length === 0 ? "block" : "none";

  // Count (active items)
  const activeCount = todos.filter(t => !t.completed).length;
  countEl.textContent = `${activeCount} item${activeCount !== 1 ? "s" : ""}`;
}

function addTodo() {
  const text = input.value.trim();
  if (!text) return;

  todos.push({
    id: Date.now(),
    text,
    completed: false
  });

  input.value = "";
  saveTodos();
  render();
}

function toggleTodo(id) {
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  saveTodos();
  render();
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveTodos();
  render();
}

function startEdit(id) {
  editingId = id;
  render();
}

function finishEdit(id, newText) {
  const text = newText.trim();
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, text: text || todo.text } : todo
  );

  editingId = null;
  saveTodos();
  render();
}

// Events
addBtn.addEventListener("click", addTodo);
input.addEventListener("keypress", e => {
  if (e.key === "Enter") addTodo();
});

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filters .active").classList.remove("active");
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    render();
  });
});

// Init
render();
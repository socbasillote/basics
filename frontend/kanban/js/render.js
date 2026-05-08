import { handleDrop } from "./dragdrop.js";
import { getDragAfterElement } from "./utils.js";

export function renderBoard(state) {
    const board = document.getElementById("board");
    board.innerHTML = "";

    state.columns.forEach(column => {
        const columnEl = createColumn(column, state.tasks);
        board.appendChild(columnEl);
    });
}

function createColumn(column, tasks) {
  const col = document.createElement("div");
  col.className = "column";
  col.dataset.id = column.id;

  const title = document.createElement("h2");
  title.textContent = column.title;

  const taskList = document.createElement("div");
  taskList.className = "task-list";

  // allow drop
  taskList.addEventListener("dragover", (e) => {
    e.preventDefault();

    const afterElement = getDragAfterElement(taskList, e.clientY);
    const draggingEl = document.querySelector(".dragging");

    if (!draggingEl) return;

    if (afterElement == null) {
        taskList.appendChild(draggingEl);
    } else {
        taskList.insertBefore(draggingEl, afterElement);
    }
  });


  taskList.addEventListener('drop', (e) => {
    e.preventDefault();

    const taskId = e.dataTransfer.getData("taskId");
    const sourceColId = e.dataTransfer.getData("sourceColId");
    const targetColId = column.id;

    // new order from DOM
    const newTaskIds = [
        ...taskList.querySelectorAll(".task")
    ].map(el => el.dataset.id);

    handleDrop(taskId, sourceColId, targetColId, newTaskIds);
  });

  column.taskIds.forEach(taskId => {
    const task = tasks[taskId];
    const taskEl = createTask(task);
    taskList.appendChild(taskEl);
  });

  // 👇 Add Task UI
  const input = document.createElement("input");
  input.placeholder = "Add a task...";
  input.className = "task-input";

  const button = document.createElement("button");
  button.textContent = "Add";
  button.className = "add-task-btn";
  button.dataset.columnId = column.id;

  col.appendChild(title);
  col.appendChild(taskList);
  col.appendChild(input);
  col.appendChild(button);

  return col;
}

function createTask(task) {
    const el = document.createElement("div");
    el.className = "task";
    el.draggable = true;
    el.dataset.id = task.id;

    el.textContent = task.content;

    el.addEventListener("dragstart", (e) => {
  el.classList.add("dragging");

  e.dataTransfer.setData("taskId", task.id);

  const columnEl = el.closest(".column");
  e.dataTransfer.setData("sourceColId", columnEl.dataset.id);
});

el.addEventListener("dragend", () => {
  el.classList.remove("dragging");
});

    return el;
}


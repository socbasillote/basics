const ITEM_HEIGHT = 40;
const BUFFER = 5;

const data = Array.from({ length: 10000 }, (_, i) => ({
  id: i + 1,
  title: `Item ${i + 1}`,
  completed: false
}));

const container = document.getElementById("container");
const list = document.getElementById("list");
const spacer = document.getElementById("spacer");
const input = document.getElementById("title");

// --- SET TOTAL HEIGHT ---
spacer.style.height = `${data.length * ITEM_HEIGHT}px`;

// --- RENDER VISIBLE ITEMS ONLY ---
function renderVisible() {
  const scrollTop = container.scrollTop;
  const containerHeight = container.clientHeight;

  const start = Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER;
  const end = Math.ceil((scrollTop + containerHeight) / ITEM_HEIGHT) + BUFFER;

  const safeStart = Math.max(0, start);
  const safeEnd = Math.min(data.length, end);

  list.innerHTML = "";

  for (let i = safeStart; i < safeEnd; i++) {
    const item = data[i];

    const li = document.createElement("li");
    li.style.position = "absolute";
    li.style.top = `${i * ITEM_HEIGHT}px`;
    li.style.left = "0";
    li.style.right = "0";

    li.dataset.id = item.id;

    if (item.completed) li.classList.add("completed");

    li.innerHTML = `
      <span>${item.title}</span>
      <button class="delete">X</button>
    `;

    list.appendChild(li);
  }
}

// --- SCROLL HANDLER ---
container.addEventListener("scroll", renderVisible);

// --- EVENT DELEGATION ---
list.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  const id = Number(li.dataset.id);
  const item = data.find(d => d.id === id);
  if (!item) return;

  if (e.target.classList.contains("delete")) {
    deleteItem(id);
    return;
  }

  item.completed = !item.completed;
  renderVisible();
});

// --- ADD ITEM ---
function addList() {
  const value = input.value.trim();
  if (!value) return;

  data.push({
    id: Date.now(),
    title: value,
    completed: false
  });

  spacer.style.height = `${data.length * ITEM_HEIGHT}px`;
  renderVisible();

  input.value = "";
}

// --- DELETE ---
function deleteItem(id) {
  const index = data.findIndex(d => d.id === id);
  if (index !== -1) data.splice(index, 1);

  spacer.style.height = `${data.length * ITEM_HEIGHT}px`;
  renderVisible();
}

// --- INITIAL ---
renderVisible();
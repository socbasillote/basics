// ===== STATE =====
  let state = {
    todos: []
  };

  // ===== HELPERS =====
  const $ = (selector, scope = document) => scope.querySelector(selector);

  const createTodo = (text) => ({
    id: crypto.randomUUID(),
    text,
    completed: false,
    editing: false
  });

  // ===== STATE MUTATIONS =====
  const actions = {
    add(text) {
      state.todos.push(createTodo(text));
      render();
    },

    delete(id) {
      state.todos = state.todos.filter(t => t.id !== id);
      render();
    },

    toggle(id) {
      state.todos = state.todos.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );
      render();
    },

    startEdit(id) {
      state.todos = state.todos.map(t =>
        t.id === id ? { ...t, editing: true } : t
      );
      render();
    },

    cancelEdit(id) {
      state.todos = state.todos.map(t =>
        t.id === id ? { ...t, editing: false } : t
      );
      render();
    },

    save(id, newText) {
      if (!newText.trim()) return;

      state.todos = state.todos.map(t =>
        t.id === id ? { ...t, text: newText, editing: false } : t
      );
      render();
    }
  };

  // ===== VIEW =====
  function TodoItem(todo) {
    if (todo.editing) {
      return `
        <li class="todo-item" data-id="${todo.id}">
          <input class="edit-input" value="${todo.text}" />
          <div class="actions">
            <button data-action="save">💾</button>
            <button data-action="cancel">❌</button>
          </div>
        </li>
      `;
    }

    return `
      <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
        <span class="text">${todo.text}</span>
        <div class="actions">
          <button data-action="toggle">✔</button>
          <button data-action="edit">✏️</button>
          <button data-action="delete">🗑</button>
        </div>
      </li>
    `;
  }

  function render() {
    const list = $('#todo-list');
    list.innerHTML = state.todos.map(TodoItem).join('');
  }

  // ===== CONTROLLER =====
  function setupEvents() {
    const input = $('#todo-input');
    const addBtn = $('#add-btn');
    const list = $('#todo-list');

    // Add
    addBtn.addEventListener('click', () => {
      if (!input.value.trim()) return;
      actions.add(input.value);
      input.value = '';
    });

    // Enter key support
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') addBtn.click();
    });

    // Delegation
    list.addEventListener('click', (e) => {
      const action = e.target.dataset.action;
      if (!action) return;

      const li = e.target.closest('.todo-item');
      const id = li.dataset.id;

      if (action === 'delete') actions.delete(id);
      if (action === 'toggle') actions.toggle(id);
      if (action === 'edit') actions.startEdit(id);
      if (action === 'cancel') actions.cancelEdit(id);

      if (action === 'save') {
        const value = $('.edit-input', li).value;
        actions.save(id, value);
      }
    });
  }

  // ===== INIT =====
  setupEvents();
  render();
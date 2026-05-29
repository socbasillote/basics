export function defaultListCreator(li, todo){
    const wrapper = document.createElement('div');
    wrapper.className = 'todoList';

    const todoTitle = document.createElement('span');
    todoTitle.className = 'todoTitle';
    todoTitle.textContent = todo.title;

    const actions = document.createElement('div');
    actions.className = 'actionBtns';

    const updateBtn = document.createElement('button');
    updateBtn.className = 'updateBtn';
    updateBtn.textContent = 'Update';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'deleteBtn';
    deleteBtn.textContent = 'Delete';

    actions.append(updateBtn, deleteBtn);

    wrapper.append(todoTitle, actions);

    li.appendChild(wrapper);
}

export function updateList(li, todo){
    const wrapper = document.createElement('div');
    wrapper.className = 'todoList';

    const editInputTodo = document.createElement('input')
    editInputTodo.type = 'text';
    editInputTodo.value = todo.title;
    editInputTodo.className = 'editInputTodo';

    const actions = document.createElement('div');
    actions.className = 'actionBtns';

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.className = 'saveBtn';

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.className = 'cancelBtn';

    actions.append(saveBtn, cancelBtn);

    wrapper.append(editInputTodo, actions);

    li.appendChild(wrapper);
}

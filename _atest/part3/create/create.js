
export function updateTodoElement(li, todo){
    const input = document.createElement('input');
    input.type = 'text';
    input.value = todo.title;
    input.className = 'editTodoInput';

    const actions = document.createElement('div');

    const saveBtn = document.createElement('button');
    saveBtn.className = 'saveBtn';
    saveBtn.textContent = 'Save';

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'cancelBtn';
    cancelBtn.textContent = 'Cancel';

    actions.append(saveBtn, cancelBtn);

    const wrapper = document.createElement('div');
    wrapper.className = 'todolistEdit';

    wrapper.append(input, actions);

    li.replaceChildren(wrapper);
}

export function defaultCreateTodo(li, todo){
    const wrapper = document.createElement('div');
    wrapper.className = 'todolist';

    const title = document.createElement('span');
    title.className = `listTitle ${
        todo.status === 'completed' ? 'completeTodo' : ''
    }`;
    title.textContent = todo.title;

    const actions = document.createElement('div');

    const updateBtn = document.createElement('button');
    updateBtn.className = 'updateBtn';
    updateBtn.textContent = 'Update';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'deleteBtn';
    deleteBtn.textContent = 'Delete';

    actions.append(updateBtn, deleteBtn);

    wrapper.append(title, actions);

    li.replaceChildren(wrapper);
}
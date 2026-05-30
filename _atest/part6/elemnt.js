export function defaultCreateTodo(li, todo){
    const wrapper = document.createElement('div');
    wrapper.classList = 'todoList';

    const leftListContent = document.createElement('div')
    leftListContent.className = 'leftListContent';

    const checkBox = document.createElement('img');
    checkBox.src = `./images/${todo.status ? 'complete' : 'incomplete'}.png`;
    checkBox.alt = 'Complete Todo';
    checkBox.className = 'checkBox';

    const title = document.createElement('span');
    title.textContent = todo.title;
    title.className = 'todoTitle';

    leftListContent.append(checkBox, title);

    const actions = document.createElement('div');
    actions.className = 'btnActions';

    const updateBtn = document.createElement('button');
    updateBtn.className = 'updateBtn';
    updateBtn.textContent = 'Update';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'deleteBtn';
    deleteBtn.textContent = 'Delete';

    actions.append(updateBtn, deleteBtn);

    li.append(leftListContent, actions);
}

export function updateTodoElement(li, todo){
    const wrapper = document.createElement('div');
    wrapper.className = 'todoList';

    const editInput = document.createElement('input');
    editInput.type = 'text'
    editInput.value = todo.title;
    editInput.className = 'editInput';

    const actions = document.createElement('div');
    actions.className = 'btnActions';

    const saveBtn = document.createElement('button');
    saveBtn.className = 'saveBtn';
    saveBtn.textContent = 'Save';

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'cancelBtn';
    cancelBtn.textContent = 'Cancel';

    actions.append(saveBtn, cancelBtn);

    wrapper.append(editInput, actions);

    li.replaceChildren(wrapper);
}
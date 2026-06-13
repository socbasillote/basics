

export function defaultTodo(li, todo){
    
    const leftContent = document.createElement('div');
    leftContent.className = 'leftContent';

    const checkComplete = document.createElement('img');
    checkComplete.src = `./images/${todo.status ? 'complete' : 'incomplete'}.png`;
    checkComplete.alt = 'Check Complete';
    checkComplete.className = 'checkComplete';

    const title = document.createElement('span');
    title.textContent = todo.title;
    title.className = 'titleText';

    const rightContent = document.createElement('div');
    rightContent.className = 'rightContent';

    const updateBtn = document.createElement('button');
    updateBtn.textContent = 'Update';
    updateBtn.className = 'updateBtn';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'deleteBtn';

    leftContent.append(checkComplete, title);
    rightContent.append(updateBtn, deleteBtn);

    li.append(leftContent, rightContent);
    console.log(li)
}

export function editTodo(li, todo){
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = todo.title;
    editInput.className = 'editInput';

    const actions = document.createElement('div');
    actions.className = 'actions';

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.className = 'saveBtn';

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.className = 'cancelBtn';

    actions.append(saveBtn, cancelBtn);

    li.append(editInput, actions);
}
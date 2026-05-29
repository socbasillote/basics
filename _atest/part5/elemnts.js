export function defaultListCreator(li, todo){
    const wrapper = document.createElement('div');
    wrapper.className = 'todoList';

    const leftContent = document.createElement('div');
    leftContent.className = 'leftContent'

    const completeIcon = document.createElement('img');
    completeIcon.src = `./image/${todo.status ? 'complete' : "incomplete"}.png`;
    completeIcon.alt = 'complete';
    completeIcon.className = 'iconLocal completeIcon completeBtn';

    const todoTitle = document.createElement('span');
    todoTitle.className = 'todoTitle';
    todoTitle.textContent = todo.title;

    leftContent.append(completeIcon, todoTitle);

    const actions = document.createElement('div');
    actions.className = 'actionBtns';

    const updateBtn = document.createElement('button');
    updateBtn.className = 'updateBtn';
    const imgUpdate = document.createElement('img');
    imgUpdate.src = './image/edit.png';
    imgUpdate.alt = 'Update';
    imgUpdate.className = 'iconLocal';

    updateBtn.appendChild(imgUpdate);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'deleteBtn';
    const imgDelete = document.createElement('img');
    imgDelete.src = './image/delete.png';
    imgDelete.alt = 'delete';
    imgDelete.className = 'iconLocal';

    deleteBtn.appendChild(imgDelete);

    actions.append(updateBtn, deleteBtn);

    wrapper.append(leftContent, actions);

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
    saveBtn.className = 'saveBtn';
    const imgSave = document.createElement('img');
    imgSave.src = './image/save.png';
    imgSave.alt = 'save';
    imgSave.className = 'iconLocal';

    saveBtn.appendChild(imgSave)

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'cancelBtn';
    const imgCancel = document.createElement('img');
    imgCancel.src = './image/cancel.png';
    imgCancel.alt = 'cancel';
    imgCancel.className = 'iconLocal';
    cancelBtn.appendChild(imgCancel);

    actions.append(saveBtn, cancelBtn);

    wrapper.append(editInputTodo, actions);

    li.appendChild(wrapper);
}

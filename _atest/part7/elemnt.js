export function createTodoDefault(li, todo){
    const wrapper = document.createElement('div');
    wrapper.className = 'todoList';

    const leftContent = document.createElement('div');
    leftContent.className = 'leftContent';

    const checkBox = document.createElement('img');
    checkBox.src = `./images/${todo.status ? 'complete' : 'incomplete'}.png`;
    checkBox.alt = 'complete';
    checkBox.className = 'checkBox';

    const todoTitle = document.createElement('span');
    todoTitle.textContent = todo.title;
    todoTitle.className = 'todoTitle';

    const actions = document.createElement('div');
    actions.className = 'btnActions';

    const updateBtn = document.createElement('button');
    updateBtn.textContent = 'Update';
    updateBtn.className = 'updateBtn';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'deleteBtn';

    leftContent.append(checkBox, todoTitle);
    actions.append(updateBtn, deleteBtn);

    wrapper.append(leftContent, actions)

    li.append(wrapper);
}


export function updateTodoElement(li, todo){
    const wrapper = document.createElement('div');
    wrapper.className = 'todoList';

    const editInput = document.createElement('input');
    editInput.type = 'text'
    editInput.value = todo.title;
    editInput.className = 'editInput';

    const priorities = document.createElement('select');
    priorities.className ='editPriority';
    priorities.id = 'editPriority';

    const option1 = document.createElement('option');
    option1.value = 1;
    option1.textContent = 'Low';

    const option2 = document.createElement('option');
    option2.value = 2;
    option2.textContent = 'Mid';

    const option3 = document.createElement('option');
    option3.value = 3;
    option3.textContent = 'High';

    priorities.append(option1, option2, option3);

    const actions = document.createElement('div');
    actions.className = 'btnActions';

    const saveBtn = document.createElement('button');
    saveBtn.className = 'saveBtn';
    saveBtn.textContent = 'Save';

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'cancelBtn';
    cancelBtn.textContent = 'Cancel';

    actions.append(saveBtn, cancelBtn);

    wrapper.append(editInput,priorities, actions);

    li.replaceChildren(wrapper);
}
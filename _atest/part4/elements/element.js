

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

// keywods
/* 
    createElemtn - creating element
    textContent - content inside the element
    className - adding class to an element
    append - adding children to an element 
    replaceChildren - replace all the children element in the list

*/

export function defaultCreateTodo(li, todo){
    const wrapper = document.createElement('div');
    wrapper.className = 'todoList';

    const title =  document.createElement('span');
    title.className = 'todoTitle';
    title.textContent = todo.title;

    const actions = document.createElement('div');
    actions.className = 'btnActions';

    const updateBtn = document.createElement('button');
    updateBtn.className = 'updateBtn';
    updateBtn.textContent = 'Update';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'deleteBtn';
    
    const delIcon = document.createElement('i');
    delIcon.className = 'bi bi-trash';
    deleteBtn.append(delIcon)

    actions.append(updateBtn, deleteBtn);

    wrapper.append(title, actions);

    li.replaceChildren(wrapper);

}


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



    const saveIcon = document.createElement('i');
    saveIcon.className = 'bi bi-save';
    saveBtn.append(saveIcon);

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'cancelBtn';
    
    const cancelIcon = document.createElement('i');
    cancelIcon.className = 'bi bi-x-circle';

    cancelBtn.append(cancelIcon);

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

    const leftContent = document.createElement('div');
    leftContent.className = 'inputContent';

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.checked = todo.status;
    checkBox.className = 'checkBox';

    const title =  document.createElement('span');
    title.className = `todoTitle ${todo.status ? 'completeTodo' : ''}`;
    title.textContent = todo.title;

    leftContent.append(checkBox, title);

    const actions = document.createElement('div');
    actions.className = 'btnActions';


    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'deleteBtn';
    
    const delIcon = document.createElement('i');
    delIcon.className = 'bi bi-trash';
    deleteBtn.append(delIcon)

    actions.append(deleteBtn);

    wrapper.append(leftContent, actions);

    li.replaceChildren(wrapper);

}
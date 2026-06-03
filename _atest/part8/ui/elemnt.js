export function todoElement(todo, li){
    const wrapper = document.createElement('div');
    wrapper.className = 'todoList';

    const leftContent = document.createElement('div');
    leftContent.className = 'leftContentTodo';

    const checkBox = document.createElement('img');
    checkBox.src = './images/incomplete.png';
    checkBox.alt = 'Complete';
    checkBox.className = 'checkBox';

    const todoTitle = document.createElement('span');
    todoTitle.textContent = todo.title;
    todoTitle.className = 'todoTitle';

    
    const actions = document.createElement('div');
    actions.className = 'actions';

    const updateBtn = document.createElement('button');
    updateBtn.textContent = 'Update';
    updateBtn.className = 'updateBtn';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'deleteBtn';

    leftContent.append(checkBox, todoTitle);
    actions.append(updateBtn, deleteBtn);

    wrapper.append(leftContent, actions);

    li.appendChild(wrapper);
    
}
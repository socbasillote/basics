export function defaultTodo(li, todo){
    const wrapper = document.createElement('div');
    wrapper.className = 'todo-list';

    const leftContent = document.createElement('div');
    leftContent.className = 'leftContent';

    const checkBox = document.createElement('img');
    checkBox.src = './images/incomplete.png';
    checkBox.alt = 'Check box';
    checkBox.className = 'checkBox';

    const title = document.createElement('span');
    title.textContent = todo.title;
    title.className = 'todoTitle';

    
    const actions = document.createElement('div');
    actions.className = 'actions';

    const updateBtn = document.createElement('button');
    updateBtn.textContent = 'Update';
    updateBtn.className = 'updateBtn';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'deleteBtn';

    leftContent.append(checkBox, title);
    actions.append(updateBtn, deleteBtn);

    wrapper.append(leftContent, actions);
    li.append(wrapper);
}
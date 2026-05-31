const app = document.getElementById('app');
const lists = document.getElementById('lists');


function render(){
    lists.innerHTML = '';

}

function createTodo(todo){
    const li = document.createElement('li');
    li.dataset.id = todo.id;
    li.className = 'list';


}

function createTodoDefaul(li, todo){
    const wrapper = document.createElement('div');
    wrapper.className = 'todoList';

    const leftContent = document.createElement('div');
    leftContent.className = 'leftContent';

    const checkBox = document.createElement('img');
    checkBox.src = './images/incomplete.png';
    checkBox.alt = 'complete';
    checkBox.className = 'checkBox';

    const todoTitle = document.createElement('span');
    
}
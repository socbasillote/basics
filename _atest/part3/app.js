import { handlers } from "./events/handlers.js";
import { addTodo, renderTodos, state } from "./todos/todos.js";



export function render(){
    localStorage.setItem('state', JSON.stringify(state));
    renderTodos();
}


handlers();
render();
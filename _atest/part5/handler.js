import { dispatch } from "./redux/reducer.js";

const todoInput = document.querySelector('.todoInput');

export function addTodo(){
    const title = todoInput.value.trim();
    if(!title) return;

    const newTodo = {
        title,
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        status: false
    }

    dispatch({ type: "ADD_TODO", payload: newTodo});
 
    todoInput.value = '';
}

export function deleteTodo(id){
    dispatch({ type: "DELETE_TODO", payload: id });
}

export function updateTodo(id){
    dispatch({ type: "SET_EDIT", payload: id });
}

export function saveTodo(id, newTitle){
    dispatch({
        type: "SAVE_TODO",
        payload: {id, title: newTitle}
    });
}

export function completeTodo(id){
    dispatch({ type: "TOGGLE_TODO", payload: id });
}

export function cancelEdit(){
    dispatch({ type: "CANCEL_EDIT"})
}
import { addTodo } from "../TodoMethods/todoMethods.js";



export function btnEvents(store){
    const addTodoBtn = document.querySelector('.addTodoBtn');
    const app = document.getElementById('app');

    app.addEventListener('click', (e) => {
        const li = e.target.closest('[data-id]');
        if(!li) return;
        const id = li.dataset.id;

        if(e.target.closest('.deleteBtn')){
            store.dispatch({type: "DELETE_TODO", payload: id});

        }
        if(e.target.closest('.updateBtn')){
            store.dispatch({type: 'UPDATE_TODO', payload: id})
            console.log(id);
        }
        if(e.target.closest('.saveBtn')){
            console.log('save')
        }
        if(e.target.closest('cancelBtn')){
            store.dispatch({type: 'CANCEL_UPDATE'})
        }
    })


    addTodoBtn.addEventListener('click', () => {
        addTodo(store);
    })

}


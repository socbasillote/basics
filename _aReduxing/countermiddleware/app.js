import { logger } from "./redux/logger.js";
import { authentication } from "./redux/middleware/authentication.js";
import { persisting } from "./redux/persisting.js";
import { reducer } from "./redux/reducer.js"
import { createStore } from "./redux/store.js"

const counting = document.querySelector('.counting')
const increment = document.querySelector('.incrementBtn');
const decrement = document.querySelector('.decrementBtn');

localStorage.setItem('user', `{ "user": true}`);
const store = createStore(reducer, [logger, persisting, authentication])

function render(){

    const state = store.getState();
    counting.textContent = state.count;
}

increment.addEventListener("click", () => {
    
    store.dispatch({type: 'INCREMENT'})
})


decrement.addEventListener('click', () => {
    store.dispatch({type: 'DECREMENT'})
})

render();

store.subscribe(render);
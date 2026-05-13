import { store } from "./js/state.js";
import { subComponent } from "./js/subscribingComponent.js";

const count = document.getElementById("count");
const addBtn = document.getElementById("addBtn");
const decrementBtn = document.getElementById('decrementBtn');




//count.textContent = store.getState().count;

addBtn.addEventListener('click', () => {

  store.setState({count: store.getState().count + 1})
  
})

decrementBtn.addEventListener('click', () => {
  store.setState(
    {count: store.getState().count - 1}
  )
})

store.subscribe(() => {
  const state = store.getState();
  count.textContent = state.count;
  subComponent(state.count);
});


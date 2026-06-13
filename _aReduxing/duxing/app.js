import eventsButton from "./evnts.js";
import { applyMiddleware } from "./redux/applyMiddleware.js";
import { loggerMiddleware } from "./redux/logger.js";
import { counterReducer } from "./redux/reducer.js";
import { createStore } from "./redux/store.js";

const store = createStore(
        counterReducer,
        applyMiddleware(loggerMiddleware)
);


function render() {
     document.getElementById("count").textContent =
        store.getState().count;
    }

render();

eventsButton(store);
store.subscribe(render);

console.log(store.getState());
import { state } from "./state.js";
import { renderBoard } from "./render.js";
import { setupEvents } from "./events.js";

function init() {
    renderBoard(state);
    setupEvents();
}

init();
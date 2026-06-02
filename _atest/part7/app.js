import { subscribe } from "./redux/reducer.js";
import { render } from "./ui/render.js";
import { setupEvents } from "./ui/events.js";
import { setupDragDrop } from "./ui/dragDrop.js";


subscribe(render);

setupEvents();
setupDragDrop();
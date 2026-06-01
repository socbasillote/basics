import { subscribe } from './store/store.js';
import { render } from './ui/render.js';
import { bindEvents } from './ui/events.js';

subscribe(render);

render();

bindEvents();
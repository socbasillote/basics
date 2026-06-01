import { getState } from '../store/store.js';

export function render() {
    document.getElementById('count').textContent =
        getState().count;
}
import { dispatch } from "../redux/reducer.js";

export function addTodo(title, priority) {
    if (!title.trim()) return;

    dispatch({
        type: "ADD_TODO",
        payload: {
            id: crypto.randomUUID(),
            createdAt: Date.now(),
            title,
            status: false,
            priority
        }
    });
}

export function saveOrder(orderedIds) {
    dispatch({
        type: "REORDER_TODOS",
        payload: orderedIds
    });
}
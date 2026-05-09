import { moveTask, reorderTasks, state } from "./state.js";
import { renderBoard } from "./render.js";


export function handleDrop(taskId, sourceColId, targetColId, newTaskIds) {
    if (sourceColId !== targetColId) {
        moveTask(taskId, sourceColId, targetColId);
    }

    reorderTasks(targetColId, newTaskIds);

    renderBoard(state);
}  
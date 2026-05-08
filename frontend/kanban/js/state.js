export const state = {
    columns: [
        {id: "col-1", title: "To Do", taskIds: ["task-1", "task-2"] },
        {id: "col-2", title: "In Progress", taskIds: [] },
        {id: "col-3", title: "Done", taskIds: [] }
    ],
    tasks: {
        "task-1": {id: "task-1", content: "Learn JavaScript" },
        "task-2": {id: "task-2", content: "Build Kanban App"}
    }
};


// Simple Id generator
function generateId() {
    return "task-" + Date.now();
}

export function addTask(columnId, content) {
    const newId = generateId();

    state.tasks[newId] = {
        id: newId,
        content
    };

    const column = state.columns.find(col => col.id === columnId);
    column.taskIds.push(newId);
}

export function moveTask(taskId, sourceColId, targetColdId) {
    if (sourceColId === targetColdId) return;

    const sourceCol = state.columns.find(c => c.id === sourceColId);
    const targetCol = state.columns.find(c => c.id === targetColdId);

    // remove from source
    sourceCol.taskIds = sourceCol.taskIds.filter(id => id !== taskId);

    // add to target
    targetCol.taskIds.push(taskId);
}

export function reorderTasks(columnId, newTaskIds) {
    const column = state.columns.find(c => c.id === columnId);
    column.taskIds = newTaskIds;
}
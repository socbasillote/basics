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
import { generateId } from "./utils.js";

export function createHistoryEntry(message) {
    return {
        id: generateId(),
        message,
        timestamp: new Date().toLocaleDateString()
    };
}

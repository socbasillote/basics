import { generateId } from "./utils.js";

export function createHistoryEntry(message) {
    return {
        id: generateId(),
        message,
        timestamp: new Date().toLocaleDateString()
    };
}

export function createSnapshot(state) {
    return {
        counters: structuredClone(state.counters)
    };
}
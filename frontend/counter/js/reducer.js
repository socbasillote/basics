import { generateId } from "./utils.js";
import { createHistoryEntry } from "./history.js";
import { createSnapshot } from "./app.js";

export function reducer(currentState, action, ACTIONS) {
    
    switch (action.type) {
        
        case ACTIONS.ADD_COUNTER: {
            const newCounter = {
                id: generateId(),
                value: 0
            };

            return {

                ...currentState,

                counters: [
                    ...currentState.counters,
                    newCounter
                ],

                past: [
                    ...currentState.past,
                    createSnapshot()
                ],

                history: [
                    createHistoryEntry("Added counter"),
                    ...currentState.history
                ]
            };
        }

        case ACTIONS.INCREMENT: {

            return {

                ...currentState,

                counters: currentState.counters.map(counter => {

                    if (counter.id !== action.payload.id) {
                        return counter;
                    }

                    return {
                        ...counter,
                        value: counter.value + 1
                    };
                }),

                past: [
                    ...currentState.past,
                    createSnapshot()
                ],

                history: [
                    createHistoryEntry(
                        `Incremented counter ${action.payload.id}`
                    ),
                    ...currentState.history
                ]
            };
        }

        case ACTIONS.DECREMENT: {

            return {
                
                ...currentState,

                counters: currentState.counters.map(counter => {

                    if (counter.id !== action.payload.id) {
                        return counter;
                    }

                    return {
                        ...counter,
                        value: counter.value - 1
                    };

                }),

                past: [
                    ...currentState.past,
                    createSnapshot()
                ],

                history: [
                    createHistoryEntry(
                        `Decremented counter ${action.payload.id}`
                    ),
                    ...currentState.history
                ]
            };
        }

        case ACTIONS.RESET: {

            return {

                ...currentState,

                counters: currentState.counters.map(counter => {

                    if (counter.id !== action.payload.id) {
                        return counter;
                    }

                    return {
                        ...counter,
                        value: 0
                    };
                }),

                past: [
                    ...currentState.past,
                    createSnapshot()
                ],

                history: [
                    createHistoryEntry(
                        `Reset counter ${action.payload.id}`
                    ),
                    ...currentState.history
                ]
            };
        }

        case ACTIONS.UNDO: {

            if (currentState.past.length === 0) {
                return currentState;
            }

            const previous = currentState.past[currentState.past.length - 1];

            return {

                ...currentState,

                counters: previous.counters,

                past: currentState.past.slice(0, -1),

                history: [
                    createHistoryEntry("Undo action"),
                    ...currentState.history
                ]
            };
            
        }

        default:
            return currentState;
    }
}
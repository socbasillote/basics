import { reducer } from "./reducers.js";
const initialState = {
    columns: {
        byId: {},
        allIds: []
    },

    cards: {
        byId: {},
        allIds: []
    },

    comments: {
        byId: {},
        allIds: []
    },

    activity: [],

    ui: {
        draggedCardIds: [],
        draggedColumnId: null,
        modalCardId: null,
        search: '',
        filters: {
            labels: [],
            overdue: false
        }
    }
};

function createStore(initialState) {
    let state = initialState;
    let listeners = [];

    function getState(){
        return state;
    }

    function setState(newState) {
        
        state = {
            ...state,
            ...newState
        }

        listeners.forEach(listener => listener(state))

    }

    function subscribe(listener){
        listeners.push(listener);

        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    }

    return {
        getState,
        setState,
        subscribe
    }
}

export const store = createStore(initialState);

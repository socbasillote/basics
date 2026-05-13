
const initialState = {
    count: 0,
    bg: 'black'
}


function createStore(initialState){
    let state = initialState;
    let listeners = [];

    function getState(){
        return state;
    }

    function setState(newState){
        state = {
            ...state,
            ...newState
        }
        listeners.forEach(listener => listener(state));
    }

    function subscribe(listener){
        listeners.push(listener);
        console.log(listener)
        return () => {
            listeners = listeners.filter(l => l !== listener);
        }

        
    }

    return {
        getState,
        setState,
        subscribe
    }
}

export const store = createStore(initialState);
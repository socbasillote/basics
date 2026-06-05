

export function createStore(reducer, initialState){

    let state = initialState;

    let listeners = []; // is simply a callback that gets notifeid whenever dispatch() changes the state

    function getState(){
        return state;
    }
    
    function dispatch(action) {
        state = reducer(state, action);

        listeners.forEach(listener => listener());
    }

    function subscribe(listener){
        listeners.push(listener);

        return function unsubscribe() {
            listener = listeners.filter(i => i !== listener);
        };
    }

    dispatch({ type: '@@INIT' });

    return {
        getState,
        dispatch,
        subscribe
    }
}
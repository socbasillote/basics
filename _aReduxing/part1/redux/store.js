

export function createStore(reducer, initialState, middlewares = []){

    let state = initialState;

    let listeners = [];

    function getState(){
        return state;
    }

    function subscribe(listener){
        listeners.push(listener);

        return function unsubscribe(){
            listeners = listeners.filter(l => l !== listener);
        }
    }

    function baseDisptach(action){
        state = reducer(state, action);

        listeners.forEach(fn => fn());

        return action;
    }

    const store = {
        getState,
        subscribe,
        dispatch: baseDisptach
    };

    const middlewareAPI = {
        getState,
        dispatch: (action) => store.dispatch(action)
    }

    const chain = middlewares.map(
        middleware => middleware(middlewareAPI)
    );

    store.dispatch = compose(...chain)(baseDisptach);

    store.dispatch({ type: '@@INIT' });

    return store;
}
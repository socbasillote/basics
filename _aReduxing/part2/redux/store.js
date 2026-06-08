
let listeners = [];

export function createStore(reducer, initialState, middlewares = []){

    let state = initialState

    function getState(){
        return state;
    }

    function subscribe(listener){
        listeners.push(listener);

        return function unsubscribe(){
            listeners = listeners.filter(l => l !== listener);
        }
    }

    function baseDispatch(action){
        state = reducer(state, action);

        listeners.forEach(fn => fn());

        return action
    }

    const store = {
        getState,
        subscribe,
        dispatch: baseDispatch
    };

    const middlewareAPI = {
        getState,
        dispatch: (action) => store.dispatch(action)
    }

    const chain = middlewares.map(middleware => middleware(middlewareAPI));

    const composedDispatch = compose(...chain)(baseDispatch);

    store.dispatch = composedDispatch;

    store.dispatch({ type: '@@INIT'});

    return store

}



function compose(...functions){
    return function (dispatch){
        return functions.reduceRight((acc, fn) => fn(acc), dispatch);
    }
}
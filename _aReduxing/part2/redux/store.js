


export function createStore(reducer, middlewares = []){

    let state = reducer(undefined, { type: '@@INIT'});
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

    
    store.dispatch = compose(...chain)(baseDispatch);


    return store

}



function compose(...functions){
    return function (dispatch){
        return functions.reduceRight((acc, fn) => fn(acc), dispatch);
    }
}
export function createStore(
    reducer,
    initialState,
    middlewares = []
){

    let state = initialState;

    let listeners = [];

    function getState(){
        return state;
    }

    function subscribe(listener){

        listeners.push(listener);

        return function unsubscribe() {
            listeners = listeners.filter(l => l !== listener);
        };
    }

    function baseDispatch(action) {

        state = reducer(state, action);

        listeners.forEach(listener => listener());

        return action;
    }

    const store = {
        getState,
        subscribe,
        dispatch: baseDispatch
    };

    const middlewareAPI = {
        getState,
        dispatch: (action) => store.dispatch(action)
    };

    const chain = middlewares.map(
        middleware => middleware(middlewareAPI)
    );

    store.dispatch = compose(...chain)(baseDispatch);

    store.dispatch({ type: '@@INIT' });

    return store;
}

function compose(...functions) {
    
    return function (dispatch) {

        return functions.reduceRight(
            (acc, fn) => fn(acct),
            dispatch
        );
    }
}
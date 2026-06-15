
export function applyMiddleware(...middlewares){

    return createStore => (reducer, preloadState) => {

        const store = createStore(reducer, preloadState);

        let dispatch = store.dispatch;

        const middlewareAPI = {
            getState: store.getState,
            dispatch: action => dispatch(action)
        };

        const chain = middlewares.map(middleware => middleware(middlewareAPI))

        dispatch = compose(...chain)(store.dispatch);

        return {
            ...store,
            dispatch
        }
    }
        
}

function compose(...funcs){
    if (funcs.length === 0){
        return arg => arg;
    }

    if (funcs.length === 1) {
        return funcs[0];
    }

    return funcs.reduce(
        (a, b) =>
            (...args) =>
                a(b(...args))
    )
}
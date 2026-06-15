


const data = JSON.parse(localStorage.getItem('count') || '{"count": 0}');

const userAuth = JSON.parse(localStorage.getItem('user'));


let initialState = {
    count: data.count,
    users: userAuth
}

export function createStore(reducer, middlewares = []){
    
    let state = initialState;
    let listeners = [];
    
    function getState(){
        return state;
    }

    function dispatch(action){
        state = reducer(state, action);

        listeners.forEach(fn => fn());
    }

    function subscribe(fn){
        listeners.push(fn);

        return () => {
            listeners = listeners.filter(listener => listener !== fn);
        }
    }

    const store = {
        getState,
        dispatch,
        subscribe,
    }

    let enhancedDispatch = dispatch;

    middlewares.slice().reverse().forEach(middleware => {
        enhancedDispatch = middleware(store)(enhancedDispatch);
    });

    store.dispatch = enhancedDispatch;
    dispatch({ type: "@@INIT"})

    return store;
}

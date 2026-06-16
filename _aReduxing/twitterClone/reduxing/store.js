import { postReducer } from "./postReducer.js";


export default function createStore(middlewares = []){


    const postsState = JSON.parse(localStorage.getItem('posts')) || {
        byId: {},
        allIds: []
    };
    
    let state = {
        posts: postsState,
    };

    let listeners = [];

    function getState(){
        return state;
    }

    function subscriber(listener){
        listeners.push(listener);

        return () => (
            listeners = listeners.filter(func => func !== listener)
        )
    }

    function dispatch(action){
        state = postReducer(state, action);
        
        listeners.forEach(fn => fn());
    }

    const store =  {
        getState,
        subscriber,
        dispatch
    }

    let enhancedDispatch = dispatch;

    middlewares.slice().reverse().forEach(middleware => {
        enhancedDispatch = middleware(store)(enhancedDispatch);
    });

    store.dispatch = enhancedDispatch;
    dispatch({ type: "@@INIT"})

    return store
}
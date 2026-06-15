import { postReducer } from "./postReducer.js";


export default function createStore(middlewares = []){

    let data = JSON.parse(localStorage.getItem('posts') || '[]');
    


    let state = {
        posts: data
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
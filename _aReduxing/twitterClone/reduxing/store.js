import { postReducer } from "./postReducer.js";

export default function createStore(){

    let state = {
        posts: []
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

    return {
        getState,
        subscriber,
        dispatch
    }
}
import { getPosts } from "../api/posts.js";
import { postsReducer } from "./reducers/postReducer.js";

export default function createStore(middlewares = []){


    
    let state = {
        posts: [],
        loading: true
    }

    let listeners = [];

    async function init(){
        const postsState = await getPosts();

        state = {
            ...state,
            posts: postsState.data,
            loading: false
        };
        listeners.forEach(fn => fn());
    }
    init();

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
        state = postsReducer(state, action);
        
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
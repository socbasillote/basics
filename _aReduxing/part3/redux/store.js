


export function createStore(reducer){

    let state = {
        todos: [],
        editIdTodo: null,
    };
    let listeners = [];

    function getState(){
        return state;
    }

    function dispatch(action){
        state = reducer(state, action);

        listeners.forEach(listen => listen());
    }

    function subscriber(listener){
        listeners.push(listener);

        return () => {
            listeners = listeners.filter(listen => listen !== listener);
        }
    }

    return {
        getState,
        subscriber,
        dispatch
    }
}

export function createStore(reducer){

    let state = reducer(undefined,{});
    const listeners = [];

    function getState(){
        return state;
    }

    function dispatch(action){

        state = reducer(state, action);

        listeners.forEach(listener => listener());
    }

    function subscribe(listener){

        listeners.push(listener);

        return () => {

            const index =
                listeners.indexOf(listener);

            listeners.splice(index,1);
        };
    }

    return {
        getState,
        dispatch,
        subscribe
    };
}
/****************************
         * CREATE STORE
         ****************************/
        export function createStore(reducer, enhancer) {

            if (enhancer) {
                return enhancer(createStore)(reducer);
            }

            let state;
            let listeners = [];

            function getState() {
                return state;
            }

            function dispatch(action) {
                state = reducer(state, action);

                listeners.forEach(listener => listener());

                return action;
            }

            function subscribe(listener) {
                listeners.push(listener);

                return function unsubscribe() {
                    listeners = listeners.filter(
                        item => item !== listener
                    );
                };
            }

            // initialize state
            dispatch({ type: "@@INIT" });

            return {
                getState,
                dispatch,
                subscribe
            };
        }
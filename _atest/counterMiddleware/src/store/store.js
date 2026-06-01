import { reducer, state as initialState } from './reducer.js';
import { logger, thunk } from './middleware.js';

let state = initialState;
let listeners = [];

function getState() {
    return state;
}

function subscribe(listener) {
    listeners.push(listener);
}

function baseDispatch(action) {
    state = reducer(state, action);

    listeners.forEach(listener => listener());
}

function applyMiddleware(...middlewares) {

    let dispatch = baseDispatch;

    const middlewareAPI = {
        getState,
        dispatch: action => dispatch(action)
    };

    const chain = middlewares.map(
        middleware => middleware(middlewareAPI)
    );

    dispatch = chain.reduceRight(
        (next, middleware) => middleware(next),
        baseDispatch
    );

    return dispatch;
}

const dispatch = applyMiddleware(
    thunk,
    logger
);

export {
    dispatch,
    subscribe,
    getState
};
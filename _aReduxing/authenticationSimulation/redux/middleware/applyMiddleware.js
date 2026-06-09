

export function applyMiddleware( store,...middlewares){

    let dispatch = store.dispatch;

    const middlewareAPI = {
        getState:store.getState,
        dispatch:(action)=>dispatch(action)
    };

    const chain =
        middlewares.map(
            middleware =>
            middleware(middlewareAPI)
        );

    dispatch = chain.reduceRight(
        (next,middleware)=>
            middleware(next),
        dispatch
    );

    return {
        ...store,
        dispatch
    };
}
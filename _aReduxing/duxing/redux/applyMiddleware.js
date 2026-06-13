/****************************
         * APPLY MIDDLEWARE
         ****************************/
        export function applyMiddleware(...middlewares) {
            return function(createStore) {
                return function(reducer) {

                    const store = createStore(reducer);

                    let dispatch = store.dispatch;

                    const middlewareAPI = {
                        getState: store.getState,
                        dispatch: (action) => dispatch(action)
                    };

                    const chain = middlewares.map(
                        middleware => middleware(middlewareAPI)
                    );

                    dispatch = chain.reduceRight(
                        (next, middleware) => middleware(next),
                        store.dispatch
                    );

                    return {
                        ...store,
                        dispatch
                    };
                };
            };
        }
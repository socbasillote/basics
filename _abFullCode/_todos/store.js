export function createStore(
    reducer,
    middleware = []
) {
    let state = reducer(undefined, {
        type: "@@INIT"
    });

    const listeners = [];

    const store = {
        getState() {
            return state;
        },

        subscribe(listener) {
            listeners.push(listener);

            return () => {
                const index =
                    listeners.indexOf(listener);

                if (index > -1) {
                    listeners.splice(index, 1);
                }
            };
        },

        dispatch(action) {
            state = reducer(state, action);

            listeners.forEach(listener =>
                listener()
            );
        }
    };

    let dispatch = store.dispatch.bind(store);

    middleware
        .slice()
        .reverse()
        .forEach(mw => {
            dispatch = mw(store)(dispatch);
        });

    store.dispatch = dispatch;

    return store;
}
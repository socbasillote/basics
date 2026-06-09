export const loggerMiddleware =
    store =>
    next =>
    action => {

        console.log(
            "ACTION:",
            action
        );

        next(action);

        console.log(
            "STATE:",
            store.getState()
        );
    };

export const persistenceMiddleware =
    store =>
    next =>
    action => {

        next(action);

        const state = store.getState();

        if(state.isAuthenticated){

            localStorage.setItem(
                "authUser",
                JSON.stringify(state.user)
            );

        }else{

            localStorage.removeItem(
                "authUser"
            );
        }
    };
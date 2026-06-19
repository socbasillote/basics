export const loggerMiddleware =
    (store) =>
    (next) =>
    (action) => {

        console.log("ACTION:", action);

        next(action);

        console.log(
            "STATE:",
            store.getState()
        );
    };
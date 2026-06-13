        /****************************
         * LOGGER MIDDLEWARE
         ****************************/
       export const loggerMiddleware =
            ({ getState }) =>
            next =>
            action => {

                console.log(
                    "Previous State:",
                    getState()
                );

                console.log(
                    "Action:",
                    action
                );

                const result = next(action);

                console.log(
                    "Next State:",
                    getState()
                );

                console.log("----------------");

                return result;
            };

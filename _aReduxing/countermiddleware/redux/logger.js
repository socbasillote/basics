
export const logger = 
    store =>
        next =>
            action => {
                
                console.group(action.type);

                console.log("prev", store.getState());

                console.log("Action", action);

                const result = next(action);

                console.log('next', store.getState());

                console.groupEnd();

                return result;
            }
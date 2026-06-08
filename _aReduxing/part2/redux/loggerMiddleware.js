

export function loggerMiddleware({ getState}){

    return next => action => {

        console.group(action.type);

        console.log("Previous State");
        console.log(getState());

        console.log('Action');
        console.log(action);

        const result = next(action);

        console.log('Next State');
        console.log(getState());

        console.groupEnd();

        return result;
    }
}

export function timerMiddleware(){
    return next => action => {

        const start = performance.now();

        const result = next(action);

        const end = performance.now();

        console.log(
            `${action.type} took ${
                end - start
            }ms`
        );

        return result;
    }
}

export function persistMiddleware({getState}) {

    return next => action => {
        
        const result = next(action);

        localStorage.setItem(
            'todos',
            JSON.stringify(
                getState().todos
            )
        );

        return result;
    }
}
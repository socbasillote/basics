export function logger({ getState }) {
    return next => action => {
        console.log('ACTION:', action);
        console.log('BEFORE:', getState());

        const result = next(action);

        console.log('AFTER:', getState());

        return result;
    };
}

export function thunk({ dispatch, getState }) {
    return next => action => {

        if (typeof action === 'function') {
            return action(dispatch, getState);
        }

        return next(action);
    };
}
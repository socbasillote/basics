export function thunkMiddleware({ dispatch, getState}) {
    return next => action => {

        // if action is a function -> call it
        if (typeof action === 'function') {
            console.log('thunksss')
            return action(dispatch, getState);
        }
        console.log('direct')
        return next(action);
    }
}
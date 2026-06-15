export function thunk({ dispatch, getState}) {
    return next => action => {

        // if action is a function -> call it
        if (typeof action === 'function') {
            return action(dispatch, getState);
        }

        return next(action);
    }
}
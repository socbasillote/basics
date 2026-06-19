

export function combineReducers(reducers){
    return function rootReducer(state = {}, action){
        let hasChange = false;
        const nextState = {};

        for (const key in reducers) {
            const previousSlice = state[key];
            const nextSlice = reducers[key](previousSlice, action);

            nextState[key] = reducers[key](state[key], action);

            if (nextSlice !== previousSlice){
                hasChange = true;
            }
        }

        return hasChange
            ? nextState
            : state;
    };
}
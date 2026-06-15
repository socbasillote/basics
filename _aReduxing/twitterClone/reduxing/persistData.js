

export const persistData = 
    store =>
        next =>
            action => {
                const result = next(action);

                localStorage.setItem('posts', JSON.stringify(store.getState().posts));

                return result;
            }
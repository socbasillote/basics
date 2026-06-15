

export const persisting =
    store =>
        next =>
            action => {
                const result = next(action)
                localStorage.setItem('count', JSON.stringify(store.getState()));
                
                return result
            }
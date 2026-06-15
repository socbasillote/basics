export function persistEnhance(createStore){

    return (reducer, preloadState) => {
        const saved = JSON.parse(localStorage.getItem('counting'));

        const store = createStore(reducer, saved || preloadState);

        store.subscribe(() => {
            localStorage.setItem('counting', JSON.stringify(store.getState));
        });

        return store;
    }
}
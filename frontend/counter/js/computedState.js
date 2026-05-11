export function getTotal(state) {
    return state.counters.reduce((sum, counter) => {
        return sum + counter.value;
    }, 0);
}

export function getHighest(state) {
    if (state.counters.length === 0) return 0;

    return Math.max(
        ...state.counters.map(counter => counter.value)
    );
}

export function getLowest(state) {
    if (state.counters.length === 0) return 0;

    return Math.min(
        ...state.counters.map(counter => counter.value)
    );
}


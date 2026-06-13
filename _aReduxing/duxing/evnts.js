

export default function eventsButton(store){
    const incrementBtn =  document.querySelector('.incrementBtn');
    const decrementBtn = document.querySelector('.decrementBtn');
    const resetBtn = document.querySelector('.resetBtn');

    incrementBtn.addEventListener('click', () => {
        store.dispatch({type: 'INCREMENT'})
    })

    decrementBtn.addEventListener('click', () => {
        store.dispatch({type: 'DECREMENT'})
    })
    resetBtn.addEventListener('click', () => {
        store.dispatch({type: 'RESET'})
    })
}
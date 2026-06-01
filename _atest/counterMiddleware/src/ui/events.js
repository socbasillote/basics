import { dispatch } from '../store/store.js';

export function bindEvents() {

    document
        .getElementById('incrementBtn')
        .addEventListener('click', () => {

            dispatch({
                type: 'INCREMENT'
            });

        });

    document
        .getElementById('decrementBtn')
        .addEventListener('click', () => {

            dispatch({
                type: 'DECREMENT'
            });

        });

    document
        .getElementById('asyncBtn')
        .addEventListener('click', () => {

            dispatch((dispatch) => {

                setTimeout(() => {

                    dispatch({
                        type: 'INCREMENT'
                    });

                }, 2000);

            });

        });
}
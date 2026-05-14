


export function reducer(state, action) {
    switch(action.type) {
        
        case 'ADD_CARD':
            return addCard(state, action.payload);

        case 'MOVE_CARD':
            return moveCard(state, action.payload);

        case 'DELETE_CARD':
            return deleteCard(state, action.payload);

        default:
            return state;
    }
}
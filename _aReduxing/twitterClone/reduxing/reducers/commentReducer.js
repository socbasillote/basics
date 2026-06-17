export function commentsReducer(state, action) {
    switch (action.type) {
        case 'ADD_COMMENT': {
            const comment = action.payload;
            return {
                ...state,
                    byId: {
                        ...state.byId,
                        [comment.id]: comment
                    },
                    allIds: [...state.allIds, comment.id]
            }
        }

        default:
            return state;
    }
}
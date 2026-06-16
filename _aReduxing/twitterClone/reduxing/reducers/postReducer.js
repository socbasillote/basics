


export function postReducer(state, action){
    console.log(state);

    switch(action.type){
        case 'ADD_POST':
            const id  = action.payload.id;

            return {
                ...state,
                byId: {
                    ...state.byId, 
                    [id]: action.payload
                },
                allIds: state.byId[id] 
                        ? state.allIds 
                        : [...state.allIds, id]
                    
            }

        case 'LIKE_POST':
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload]: {
                        ...state.byId[action.payload],
                        likeCount: (state.byId[action.payload]?.likeCount || 0) + 1
                    }
                        
                }
            }

        default:
            return state;
    }
}
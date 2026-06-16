


export function postReducer(state, action){

    switch(action.type){
        case 'ADD_POST':
            const id  = action.payload.id;
            const exists = state.posts.byId[id];

            return {
                ...state,
                posts: {
                    ...state.posts,
                    byId: {...state.posts.byId, [id]: action.payload},
                    allIds: exists ? state.posts.allIds : [...state.posts.allIds, id]
                    
                }

            }

        case 'LIKE_POST':
            return {
                ...state,
                posts: {
                    ...state.posts,
                    byId: {
                        ...state.posts.byId,
                        [action.payload]: {
                            ...state.posts.byId[action.payload],
                            count: (state.posts.byId[action.payload]?.count || 0) + 4
                        }
                        
                    }
                }
            }

        default:
            return state;
    }
}
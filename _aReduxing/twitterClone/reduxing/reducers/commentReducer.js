

export function commentReducer(state, action){

    switch(action.type){
        case 'ADD_COMMENT': {
            const comment = action.payload;

            return {
                ...state,
                comments: {
                    byId: {
                        ...state.comments.byId,
                        [comment.id]: comment
                    },
                    
                    allIds: [...state.comments.allIds, comment.id]
                },

                post: {
                    ...state.posts,

                    byId: {
                        ...state.posts.byId,

                        [comment.postId]: {
                            ...state.posts.byId[comment.postId],

                            commentIds: [
                                ...state.posts.byId[comment.postId].commentIds,
                                comment.id
                            ]
                        }
                    }
                }
            }
        }
    }
}
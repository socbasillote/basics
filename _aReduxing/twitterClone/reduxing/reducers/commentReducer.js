

export function commentReducer(state, action){

    switch(action.type){
        case 'ADD_COMMENT': {
            const comment = action.payload;
            
            return {
                ...state,
                comments: {
                    ...state.comments, 
                    byId: {
                        ...state.comments.byId, [comment.id]: action.payload // id, postId, content, createdAt
                    },
                    allids: [...state.comments.allids, commentId]

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
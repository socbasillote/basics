export function postsReducer(state, action) {
    switch (action.type) {
        case 'ADD_POST': {
            const post = action.payload;
            const id = post.id;

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [id]: {
                        ...post,
                        commentIds: post.commentIds || []
                    }
                },
                allIds: state.allIds.includes(id)
                    ? state.allIds
                    : [...state.allIds, id]
            };
        }

        case 'LIKE_POST': {
            const postId = action.payload;

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [postId]: {
                        ...state.byId[postId],
                        likeCount: (state.byId[postId]?.likeCount || 0) + 1
                    }
                }
            };
        }

        case 'ADD_COMMENT': {
            const comment = action.payload;
            const post = state.byId[comment.postId];

            if (!post) return state;

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [comment.postId]: {
                        ...state.byId[comment.postId],
                        commentIds: [
                            ...state.byId[comment.postId].commentIds,
                            comment.id
                        ]
                    }
                }
            };
        }

        default:
            return state;
    }
}
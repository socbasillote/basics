
export function addPost(text, store){

    const newPost = { 
        id: crypto.randomUUID(),
        authorId: 'user2',
        content: text,
        media: '',
        createdAt: Date.now(),
        
        likeCount: 0,

        commentIds: [],
    }

    store.dispatch(postthunk())
    function postthunk(){
        return function(dispatch, getState){
            dispatch({type: 'ADD_POST', payload: newPost})
        }
    }

}
export function addComment(text, store, activePostId){
    const newComment = { 
            id: crypto.randomUUID(),
            authorId: 'user1',
            postId: activePostId,
            content: text,
            createdAt: Date.now()
        }
        store.dispatch({type: 'ADD_COMMENT', payload: newComment})
}
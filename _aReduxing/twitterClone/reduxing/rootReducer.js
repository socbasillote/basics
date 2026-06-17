import { commentsReducer } from "./reducers/commentReducer.js";
import { postsReducer } from "./reducers/postReducer.js";




export function rootReducer(state, action){
    return {
        posts: postsReducer(state.posts, action),
        comments: commentsReducer(state.comments, action)
    }
}
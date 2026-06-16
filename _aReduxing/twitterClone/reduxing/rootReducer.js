import { commentReducer } from "./reducers/commentReducer.js";
import { postReducer } from "./reducers/postReducer.js";




export function rootReducer(state, action){
    return {
        posts: postReducer(state.posts, action),
        comments: commentReducer(state.comments, action)
    }
}
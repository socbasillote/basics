import { createPostApi, getPosts } from "../api/posts.js";
import { normalizePosts } from "./helperFunctions.js";

export function fetchPosts(){
    return async function(dispatch){

        dispatch({
            type: "POSTS_LOADING"
        });

        try {
            const posts = await getPosts();

            dispatch({
                type: 'POSTS_SUCCESS',
                payload: normalizePosts(posts)
            });

        } catch (error) {
            dispatch({
                type: 'POSTS_ERROR',
                payload: error.message
            })
        }
    }
}

export function addPost(text){
    return async (dispatch) => {
        dispatch({ type: "POST_CREATE_START"});

        try {
            const newPost = await createPostApi({
                content: text,
                media: [],
            });

            dispatch({ type: 'POST_CREATE_SUCCESS', payload: newPost});
        } catch (err) {
            dispatch({ type: "POST_CREATE_ERROR", error: err.message})
        }
    }
}
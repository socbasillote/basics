import { postEvents } from "./events/postEvents.js";
import { persistData } from "./reduxing/middlewares/persistData.js";
import createStore from "./reduxing/store.js";
import { thunkMiddleware } from "./reduxing/thunk.js";
import { createComment, createPost } from "./ui/contentElement.js";

const feed = document.getElementById('feed');

const commentList = document.querySelector('.commentList')

const store = createStore([thunkMiddleware,persistData]);


function render() {
    feed.textContent = '';
    const state = store.getState();
    console.log(store.getState())
    state.posts.allIds.forEach(postId => {
        const post = state.posts.byId[postId];

        const commentsList = createPost(post, feed);

        post.commentIds.forEach(commentId => {
            const comment = state.comments.byId[commentId];
            createComment(comment, commentsList);
        });
    });

}



store.subscriber(render);
postEvents(store, feed);

render();



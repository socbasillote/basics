import { postEvents } from "./events/postEvents.js";
import { persistData } from "./reduxing/middlewares/persistData.js";
import createStore from "./reduxing/store.js";
import { createComment, createPost } from "./ui/contentElement.js";

const form = document.getElementById('postForm');



const input = document.getElementById('postInput');
const feed = document.getElementById('feed');

const commentList = document.querySelector('.commentList')

const store = createStore([persistData]);


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


function addPost(text){

    const newPost = { 
        id: crypto.randomUUID(),
        authorId: 'user1',
        content: text,
        media: '',
        createdAt: Date.now(),
        
        likeCount: 0,

        commentIds: [],
    }

    store.dispatch({type: 'ADD_POST', payload: newPost})
}


form.addEventListener('submit', (e) => {
    e.preventDefault(); // stop page reload

    const text = input.value.trim();
    if (text === "") return;
    addPost(text);

    input.value = "";
})


/*     commentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        console.log('click');
            const newComment = {
                id: crypto.randomUUID(),
                content: commentInput.value
            }

            store.dispatch({type: 'ADD_COMMENT', payload: newComment})
            commentInput.value = ''
    }) */


store.subscriber(render);
postEvents(store, feed);

render();

const modal = document.querySelector('.modal')

document.querySelector('.closeModal').addEventListener('click', () => {
    modal.classList.remove('open')
})


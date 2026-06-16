import { postEvents } from "./events/postEvents.js";
import { persistData } from "./reduxing/middlewares/persistData.js";
import createStore from "./reduxing/store.js";
import { createComment, createPost } from "./ui/contentElement.js";

const form = document.getElementById('postForm');
const commentForm = document.getElementById('commentForm')


const input = document.getElementById('postInput');
const feed = document.getElementById('feed');

const commentList = document.querySelector('.commentList')
const commentInput = document.querySelector('.commentInput')

const store = createStore([persistData]);

function render(){
    feed.textContent = '';
    const state = store.getState();

    state.posts.allIds
        .forEach(id => {
            const post = state.posts.byId[id];
            createPost(post, feed);
        })

    console.log(state.comments)
        
}

function addPost(text){

    const newPost = { 
        id: crypto.randomUUID(),
        authorId: 'user',
        content: text,
        media: '',
        createdAt: Date.now(),
        
        likeCount: 0,

        commentIds: [],
    }

    store.dispatch({type: 'ADD_POST', payload: newPost})
}

function addComment(text){
    
    const newComment = {
        id: crypto.randomUUID(),
        post: null,
        content: commentInput.value
    }

    store.dispatch({type: 'ADD_COMMENT', payload: newComment})
    commentInput.value = ''
    console.log(store.getState());
}


form.addEventListener('submit', (e) => {
    e.preventDefault(); // stop page reload

    const text = input.value.trim();
    if (text === "") return;
    addPost(text);

    input.value = "";
})

commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const text = input.value.trim();
    if(!text) return;
    console.log('heelo')
    addComment(text);

    console.log(store.getState().comments);

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
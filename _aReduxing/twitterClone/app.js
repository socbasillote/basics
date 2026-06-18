import { addPost } from "./actions/postsActions.js";
import { getPosts } from "./api/posts.js";
import { postEvents } from "./events/postEvents.js";
import { persistData } from "./reduxing/middlewares/persistData.js";
import createStore from "./reduxing/store.js";
import { thunkMiddleware } from "./reduxing/thunk.js";
import { createComment, createPost } from "./ui/contentElement.js";

const feed = document.getElementById('feed');

const commentList = document.querySelector('.commentList')

const store = createStore([thunkMiddleware,persistData]);

const loginBtn = document.querySelector('.loginBtn')

function render() {
    feed.textContent = '';
    const state = store.getState()
    console.log(state)
    state.posts.forEach(post => {
        createPost(post, feed);

    });

}



store.subscriber(render);
//postEvents(store, feed);

render();



loginBtn.addEventListener("click", async () => {
    const dats = await getPosts();
    console.log(dats.data)
    console.log('test')
});



const input = document.getElementById('postInput');
const postForm = document.getElementById('postForm');


postForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const text = input.value.trim();
    if (text === "") return;
    
    store.dispatch(addPost(text))
    
    input.value = "";

})
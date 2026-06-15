import { persistData } from "./reduxing/persistData.js";
import createStore from "./reduxing/store.js";

const form = document.getElementById('postForm');
const input = document.getElementById('postInput');
const feed = document.getElementById('feed');


const store = createStore([persistData]);

function render(){
    feed.textContent = '';
    const state = store.getState();

    state.posts.forEach(post => (
        createPost(post)
    ))
}

function addPost(text){
    
    const newPost = {
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        text,
    }

    store.dispatch({type: 'ADD_POST', payload: newPost})

}

function createPost(post){
    const div = document.createElement('div');
    div.className = 'post';

    const postContent = document.createElement('span');
    postContent.className = 'postContent'
    postContent.textContent = post.text;


    const editBtn = document.createElement('button');
    editBtn.className = 'editBtn';
    editBtn.textContent = 'Edit';

    div.append(postContent, editBtn);
    // add to feed (top first like social media)
    feed.prepend(div);

    // clear input 
    
}

form.addEventListener('submit', (e) => {
    e.preventDefault(); // stop page reload

    const text = input.value.trim();
    if (text === "") return;
    addPost(text);

    input.value = "";
})

store.subscriber(render);

render();
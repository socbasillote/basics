import { postEvents } from "./events/postEvents.js";
import { persistData } from "./reduxing/persistData.js";
import createStore from "./reduxing/store.js";
import { createPost } from "./ui/contentElement.js";

const form = document.getElementById('postForm');
const input = document.getElementById('postInput');
const feed = document.getElementById('feed');


const store = createStore([persistData]);

function render(){
    feed.textContent = '';
    const {posts} = store.getState();

    posts.allIds
        .map(id => posts.byId[id])
        .forEach(post => createPost(post, feed));
    
}

function addPost(text){

    const newPost = { 
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        text,
        count: 0

    }

    store.dispatch({type: 'ADD_POST', payload: newPost})
    console.log(store.getState());
}



form.addEventListener('submit', (e) => {
    e.preventDefault(); // stop page reload

    const text = input.value.trim();
    if (text === "") return;
    addPost(text);

    input.value = "";
})

store.subscriber(render);
postEvents(store, feed);

render();

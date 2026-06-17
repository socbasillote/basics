import { addComment, addPost } from "./Handler.js";

export function postEvents(store, feed) {

    const postForm = document.getElementById('postForm');
    const input = document.getElementById('postInput');

    const modal = document.querySelector('.modal')

    const commentForm = document.getElementById('commentForm')
    const commentInput = document.querySelector('.commentInput')

    let activePostId = null;


    feed.addEventListener('click', (e) => {
        const post = e.target.closest('[data-id]');
        if (!post) return;

        const id = post.dataset.id;

        if (e.target.closest('.likePost')) {
            store.dispatch({
                type: 'LIKE_POST',
                payload: id
            });
        }

        if (e.target.closest('.commentPost')) {
            modal.classList.add('open');

            
            activePostId = id;
        }

    });

    postForm.addEventListener('submit', (e) => {
        e.preventDefault(); // stop page reload

        const text = input.value.trim();
        if (text === "") return;
        addPost(text, store);

        input.value = "";
    })


    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
                
        const text = commentInput.value.trim();
        if(!text) return;

        addComment(text, store, activePostId)
    
        modal.classList.remove('open');
    });


    document.querySelector('.closeModal').addEventListener('click', () => {
        modal.classList.remove('open')
    })
    
}


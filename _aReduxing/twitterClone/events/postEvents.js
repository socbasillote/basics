

export function postEvents(store, feed) {
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

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
                
        const text = commentInput.value.trim();
        if(!text) return;

        const newComment = { 
            id: crypto.randomUUID(),
            postId: activePostId,
            content: text,
            createdAt: Date.now()
        }

        store.dispatch({type: 'ADD_COMMENT', payload: newComment})
        modal.classList.remove('open');
    });
    
}
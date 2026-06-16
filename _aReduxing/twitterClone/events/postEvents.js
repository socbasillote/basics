export function postEvents(store, feed) {
    const modal = document.querySelector('.modal')
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

        }

    });
    
}
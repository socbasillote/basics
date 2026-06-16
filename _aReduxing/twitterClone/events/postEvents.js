export function postEvents(store, feed) {
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
            const commentsContainer =
                post.querySelector('.commentsContainer');

            console.log(commentsContainer);

            if (!commentsContainer) return;

            commentsContainer.style.display =
                commentsContainer.style.display === 'none'
                    ? 'block'
                    : 'none';
        }
    });
}
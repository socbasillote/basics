

export function postEvents(store,feed){
    const post = document.querySelector('.post');

    feed.addEventListener('click', (e) => {
        const post = e.target.closest('[data-id]');
        const id = post.dataset.id;
        console.log(id)
        if(e.target.closest('.likePost')){
            store.dispatch({type: 'LIKE_POST', payload: id})
            console.log(store.getState());
        }
    })


}
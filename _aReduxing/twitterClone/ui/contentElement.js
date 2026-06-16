

export function createPost(post, feed){
    const div = document.createElement('div');
    div.dataset.id = post.id
    div.className = 'post';

    const topContent = document.createElement('div');
    topContent.className = 'topContentPost'

    const postContent = document.createElement('span');
    postContent.className = 'postContent'
    postContent.textContent = post.text;


    const editBtn = document.createElement('a');
    editBtn.className = 'editBtn';
    editBtn.innerHTML = `<i class="fa-solid fa-ellipsis"></i>`

    // bottom content ( like, share, comment, save)
    const reactPost = document.createElement('div');
    reactPost.className = 'reactPost';

    const leftReactPost = document.createElement('div');
    leftReactPost.className = 'leftReactPost';

    // Like
    const likePostWrapper = document.createElement('div');
    likePostWrapper.className = 'likePostWrapper';

    const likePost = document.createElement('a');
    likePost.innerHTML = `<i class="fa-regular fa-heart"></i>`
    likePost.className = 'likePost';

    const countLikePost = document.createElement('span');
    countLikePost.textContent = post.count

    likePostWrapper.append(likePost, countLikePost);

    // Share
    const sharePostWrapper = document.createElement('div');
    sharePostWrapper.className = 'sharePostWrapper';

    const sharePost = document.createElement('a');
    sharePost.innerHTML = `<i class="fa-solid fa-share"></i>`
    sharePost.className = 'sharePost';

    const countSharePost = document.createElement('span');
    countSharePost.textContent = '1'

    sharePostWrapper.append(sharePost, countSharePost);


    //Comment
    const commentPostWrapper = document.createElement('div');
    commentPostWrapper.className = 'commentPostWrapper';

    const commentPost = document.createElement('a');
    commentPost.innerHTML = `<i class="fa-regular fa-comment"></i>`
    commentPost.className = 'commentPost';

    const countCommentPost = document.createElement('span');
    countCommentPost.textContent = '1'

    commentPostWrapper.append(commentPost, countCommentPost);

    // appending
    const rightReactPost = document.createElement('div');
    rightReactPost.className = 'rightReactPost';

    const savePost = document.createElement('a');
    savePost.innerHTML = `<i class="fa-solid fa-floppy-disk"></i>`
    savePost.className = 'savePost';

    topContent.append(postContent, editBtn);

    leftReactPost.append(likePostWrapper, sharePostWrapper, commentPostWrapper)
    rightReactPost.append(savePost)

    reactPost.append(leftReactPost, rightReactPost)

    div.append(topContent, reactPost)
    // add to feed (top first like social media)
    feed.prepend(div);

    // clear input 
    
}


export function createPost(post, feed){
    const div = document.createElement('div');
    div.dataset.id = post.id
    div.className = 'post';

    const topContent = document.createElement('div');
    topContent.className = 'topContentPost'

    const postContent = document.createElement('span');
    postContent.className = 'postContent'
    postContent.textContent = post.content;


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
    countLikePost.textContent = post.likeCount

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

    // Comment
    const commentsContainer = document.createElement('div');
    commentsContainer.className = 'commentsContainer';
    commentsContainer.style.display = 'none'

    const commentForm = document.createElement('form');
    commentForm.className = 'commentForm';

    const commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentInput.placeholder = 'Write a comment...';
    commentInput.classList = 'commentInput'

    const commentBtn = document.createElement('button');
    commentBtn.type = 'submit';
    commentBtn.textContent = 'Post';
    commentBtn.className = 'commentBtn'

    commentForm.append(commentInput, commentBtn);

    const commentsList = document.createElement('div');
    commentsList.className = 'commentsList';

    commentsContainer.append(commentForm, commentsList);
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


    
    div.append(topContent, reactPost, commentsContainer)
    // add to feed (top first like social media)
    feed.prepend(div);

    // clear input 
    
}



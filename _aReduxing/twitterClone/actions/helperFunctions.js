export function normalizePosts(posts){
    const byId = {};
    const allIds = [];

    posts.forEach(post => {
        byId[post.id] = post;
        allIds.push(post.id);
    });

    return {
        byId,
        allIds
    };
}
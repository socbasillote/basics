const API_URL = "http://localhost:5000";

export async function getPosts() {
    const response = await fetch(`${API_URL}/api/posts`);

    if (!response.ok){
        throw new Error("Failed to fetch posts");
    }

    return response.json();
}

export async function createPostApi(postData){
    const response = await fetch(`${API_URL}/api/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
    });

    if (!response.ok){
        throw new Error("Failed to create post");
    }

    return response.json();
}
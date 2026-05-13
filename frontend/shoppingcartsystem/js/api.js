export async function fetchProducts() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = true;

            if (!success) {
                reject('Failed to load products');
                return;
            }

            resolve([
                {
                    id: 1,
                    title: 'Laptop',
                    price: 1200,
                    category: 'electornics',
                    stock: 5,
                    image: 'https://plus.unsplash.com/premium_photo-1684197414542-a7b3ef29f604?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                },
                {
                    id: 2,
                    title: 'Headphones',
                    price: 200,
                    category: 'electronics',
                    stock: 10,
                    image: 'https://plus.unsplash.com/premium_photo-1684197414542-a7b3ef29f604?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                },
                {
                    id: 3,
                    title: 'Shoes',
                    price: 150,
                    category: 'fashion',
                    stock: 8,
                    image: 'https://plus.unsplash.com/premium_photo-1684197414542-a7b3ef29f604?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                }
            ]);
        }, 1000);
    })
}
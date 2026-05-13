import { store } from "./store.js";

export function openProductModal(productId) {
    const modal = document.getElementById('productModal');

    const product = store
        .getState()
        .products
        .find(product => product.id === productId);

    if (!product) {
        return;
    }

    updateRecentlyViewed(productId);

    modal.classList.remove('hidden');

    modal.innerHTML = `
        <div class="modal-content">
            <button id="closeModalBtn">X</button>

            <img src="${product.image}">
            
            <h2>${product.title}</h2>

            <p>Price: $${product.price}</p>

            <p>Stock: ${product.stock}</p>

            <p>Category: ${product.category}</p>
        </div>
    `;

    document
        .getElementById('closeModalBtn')
        .addEventListener('click', () => {
            modal.classList.add('hidden');
        });
}


function updateRecentlyViewed(productId) {
    const state = store.getState();

    const viewed = [
        productId,
        ...state.recentlyViewed.filter(id => id !== productId)
    ].slice(0, 5);

    store.setState({
        recentlyViewed: viewed
    });
}

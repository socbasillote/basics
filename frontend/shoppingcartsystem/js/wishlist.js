import { store } from "./store.js";

export function toggleWishlist(productId) {
    const state = store.getState();

    const exists = state.wishlist.includes(productId);

    const wishlist = exists 
        ? state.wishlist.filter(id => id !== productId)
        : [...state.wishlist, productId];

    store.setState({ wishlist });
}
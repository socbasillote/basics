import { store } from "./store.js";
import { fetchProducts } from "./api.js";
import {renderProducts } from './products.js';
import { renderCart } from "./cart.js";
import { renderFilters } from "./filters.js";
import { loadCartFromStorage } from "./storage.js";


async function init() {
    try {
        store.setState({ loading: true });

        const products = await fetchProducts();

        store.setState({
            products,
            loading: false,
            cart: loadCartFromStorage()
        });
    } catch (error) {
        store.setState({
            loading: false,
            error
        });
    }
}

store.subscribe(() => {
    renderProducts();
    renderCart();
    renderFilters();
})

init();
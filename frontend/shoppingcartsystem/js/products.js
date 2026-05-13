import { store } from "./store.js";
import { addToCart } from "./cart.js";
import { openProductModal } from "./modal.js";
import { toggleWishlist } from "./wishlist.js";


export function renderProducts() {
    const grid = document.getElementById('productGrid');
    const loadingState = document.getElementById('loadingState');
    const errorState = document.getElementById('errorState');

    const state = store.getState();

    if (state.loading) {
        loadingState.innerHTML = '<p>Loading products...</p>';
        return;
    }

    loadingState.innerHTML = "";

    if (state.error) {
        errorState.innerHTML = `<p>${state.error}</p>`;
        return;
    }

    errorState.innerHTML = '';

    let products = [...state.products];

    if (state.filters.category !== 'all') {
        products = products.filter(product => {
            return product.category === state.filters.category;
        });
    }

    if (state.filters.search) {
        products = products.filter(product => {
            return product.title
                .toLowerCase()
                .includes(state.filters.search.toLowerCase());
        });
    }

    if (state.filters.sort === 'price-asc') {
        products.sort((a, b) => a.price - b.price);
    }

    if (state.filters.sort === 'price-desc') {
        products.sort((a, b) => b.price - a.price);
    }

    if (state.filters.sort === 'name') {
        products.sort((a, b) => a.title.localeCompare(b.title));
    }

    grid.innerHTML = products.map(product => {
        return `
            <div class="product-card">
                <img src="${product.image}" alt="${product.title}" class="product-img">

                <h3>${product.title}</h3>

                <p>$${product.price}</p>

                <p>Stock: ${product.stock}</p>

                <button class="details-btn" data-id=${product.id}">
                    Details
                </button>

                <button class="add-btn" data-id="${product.id}">
                    Add to Cart
                </button>

                <button class="wishlist-btn" data-id="${product.id}">
                    Wishlist
                </button>
            </div>
        `;
    }).join('');

    document.querySelectorAll('.add-btn').forEach(button => {
    button.addEventListener('click', () => {
      addToCart(Number(button.dataset.id));
    });
  });

  document.querySelectorAll('.details-btn').forEach(button => {
    button.addEventListener('click', () => {
      openProductModal(Number(button.dataset.id));
    });
  });

  document.querySelectorAll('.wishlist-btn').forEach(button => {
    button.addEventListener('click', () => {
      toggleWishlist(Number(button.dataset.id));
    });
  });
}
import { store } from "./store.js";

export function renderFilters() {
    const state = store.getState();

    const categories = [
        'all',
        ...new Set(state.products.map(p => p.category))
    ];

    const container = document.getElementById('categoryFilters');

    container.innerHTML = categories.map(category => {
        return `
            <button class="filter-btn" data-category="${category}">
                ${category}
            </button>
        `;
    }).join('');

    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            store.setState({
                filters: {
                    ...state.filters,
                    category: button.dataset.category
                }
            });
        });
    });
}

const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', (event) => {
    const state = store.getState();

    store.setState({
        filters: {
            ...state.filters,
            search: event.target.value
        }
    });
});

const sortSelect = document.getElementById('sortSelect');

sortSelect.addEventListener('change', event => {
    const state = store.getState();

    store.getState({
        filters: {
            ...state.filters,
            sort: event.target.value
        }
    });
});
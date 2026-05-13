export function saveCartToStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function loadCartFromStorage() {
    const cart = localStorage.getItem('cart');

    return cart ? JSON.parse(cart) : [];
}
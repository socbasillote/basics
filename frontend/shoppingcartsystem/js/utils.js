import { store } from "./store.js";

export function getCartTotals() {
    const { cart, coupon } = store.getState();

    const subtotal = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    const tax = subtotal * 0.1;

    let discount = 0;

    if (coupon === 'SAVE10') {
        discount = subtotal * 0.1;
    }
    console.log(coupon);
    const total = subtotal + tax - discount;

    return {
        subtotal,
        tax,
        discount,
        total,
    };
}
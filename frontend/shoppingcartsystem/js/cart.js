import { store } from './store.js';
import { getCartTotals } from './utils.js';
import { saveCartToStorage } from './storage.js'

export function addToCart(productId) {
    const state = store.getState();

    const product = state.products.find(p => p.id === productId);

    if (!product || product.stock <= 0) {
        return;
    }

    const existing = state.cart.find(item => item.id === productId);

    let updatedCart;

    if (existing) {
        updatedCart = state.cart.map(item => {
            if (item.id === productId) {
                if (item.quantity >= product.stock) {
                    return item;
                }

                return {
                    ...item,
                    quantity: item.quantity + 1
                };
            }

            return item;
        });
    } else {
        updatedCart = [
            ...state.cart,
            {
                ...product,
                quantity: 1
            }
        ];
    }

    store.setState({ cart: updatedCart });

    saveCartToStorage(updatedCart);
}

export function removeFromCart(productId) {
    const state = store.getState();

    const updatedCart = state.cart.filter(item => {
        return item.id !== productId;
    });

    store.setState({ cart: updatedCart });

    saveCartToStorage(updatedCart);
}

export function updateQuantity(productId, amount) {
    const state = store.getState();

    const updatedCart = state.cart.map(item => {
        if (item.id === productId) {
            const quantity = item.quantity + amount;

            if (quantity < 1) {
                return item;
            }

            if (quantity > item.stock) {
                return item;
            }

            return {
                ...item,
                quantity
            };
        }

        return item;
    });

    store.setState({ cart: updatedCart });

    saveCartToStorage(updatedCart);
}

export function renderCart() {
  const cartSideBar = document.getElementById('cartSidebar')
  const cartButton = document.getElementById('cartButton')
  const cartItems = document.getElementById('cartItems');
  const badge = document.getElementById('cartBadge');
  const summary = document.getElementById('checkoutSummary');

  const applyCouponBtn = document.getElementById('applyCouponBtn');
  const couponInput = document.getElementById('couponInput')

  const state = store.getState();

  badge.textContent = state.cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  cartItems.innerHTML = state.cart.map(item => {
    return `
      <div class="cart-item">
        <h4>${item.title}</h4>

        <p>$${item.price}</p>

        <div>
          <button class="decrease-btn" data-id="${item.id}">-</button>
          <span>${item.quantity}</span>
          <button class="increase-btn" data-id="${item.id}">+</button>
        </div>

        <button class="remove-btn" data-id="${item.id}">
          Remove
        </button>
      </div>
    `;
  }).join('');

  const totals = getCartTotals();

  summary.innerHTML = `
    <p>Subtotal: $${totals.subtotal.toFixed(2)}</p>
    <p>Tax: $${totals.tax.toFixed(2)}</p>
    <p>Discount: $${totals.discount.toFixed(2)}</p>
    <h3>Total: $${totals.total.toFixed(2)}</h3>
  `;

  document.querySelectorAll('.increase-btn').forEach(button => {
    button.addEventListener('click', () => {
      updateQuantity(Number(button.dataset.id), 1);
    });
  });

  document.querySelectorAll('.decrease-btn').forEach(button => {
    button.addEventListener('click', () => {
      updateQuantity(Number(button.dataset.id), -1);
    });
  });

  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', () => {
      removeFromCart(Number(button.dataset.id));
    });
  });

  document.querySelector('.closeCart').addEventListener('click', () => {
    cartSideBar.classList.add('hidden')
    console.log('remove')
  })

  cartButton.addEventListener('click', () => {
      cartSideBar.classList.remove('hidden');

  })

  applyCouponBtn.addEventListener('click', () => {
    store.setState({coupon: couponInput.value})
    console.log(state.coupon);
  })
}
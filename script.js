const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const cartButton = document.querySelector('.cart-button');
const cartDrawer = document.querySelector('.cart-drawer');
const overlay = document.querySelector('.overlay');
const closeCartButton = document.querySelector('.close-cart');
const cartItems = document.querySelector('.cart-items');
const cartCount = document.querySelector('#cart-count');
const total = document.querySelector('.cart-total strong');
const checkoutButton = document.querySelector('.checkout-button');
const confirmationModal = document.querySelector('.confirmation-modal');
const cancelOrderButton = document.querySelector('.cancel-order');
const placeOrderButton = document.querySelector('.place-order');
let cart = [];

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  menuToggle.classList.toggle('is-open', isOpen);
  menuToggle.setAttribute('aria-expanded', isOpen);
  menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuToggle.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open menu');
}));

function updateCart() {
  const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartCount.textContent = quantity;
  total.textContent = `$${cartTotal.toFixed(2)}`;
  checkoutButton.disabled = cart.length === 0;
  cartItems.innerHTML = cart.length ? cart.map((item) => `<div class="cart-item"><div><h3>${item.name}</h3><p>$${item.price.toFixed(2)} &times; ${item.quantity}</p></div><button type="button" class="remove-item" data-name="${item.name}" aria-label="Remove ${item.name}">&times;</button></div>`).join('') : '<p class="empty-cart">Your cart is empty.</p>';
}

function openCart() { cartDrawer.classList.add('is-open'); overlay.classList.add('is-visible'); cartDrawer.setAttribute('aria-hidden', 'false'); }
function closeCart() { cartDrawer.classList.remove('is-open'); overlay.classList.remove('is-visible'); cartDrawer.setAttribute('aria-hidden', 'true'); }

document.querySelectorAll('.add-cart').forEach((button) => button.addEventListener('click', () => {
  const card = button.closest('.product-card');
  const name = card.querySelector('h3').textContent;
  const price = Number(card.querySelector('p').textContent.replace(/[^0-9.]/g, ''));
  const item = cart.find((entry) => entry.name === name);
  if (item) item.quantity += 1;
  else cart.push({ name, price, quantity: 1 });
  updateCart();
  openCart();
}));

cartButton.addEventListener('click', openCart);
closeCartButton.addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);
cartItems.addEventListener('click', (event) => {
  const button = event.target.closest('.remove-item');
  if (!button) return;
  cart = cart.filter((item) => item.name !== button.dataset.name);
  updateCart();
});
checkoutButton.addEventListener('click', () => { closeCart(); confirmationModal.hidden = false; });
cancelOrderButton.addEventListener('click', () => { confirmationModal.hidden = true; });
placeOrderButton.addEventListener('click', () => {
  confirmationModal.querySelector('h2').textContent = 'Order Confirmed!';
  confirmationModal.querySelector('p').textContent = 'Thank you for shopping with ShopEase. Your order has been placed.';
  placeOrderButton.hidden = true;
  cancelOrderButton.textContent = 'Continue Shopping';
  cart = [];
  updateCart();
});

updateCart();

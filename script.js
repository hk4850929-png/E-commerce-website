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
const toast = document.querySelector('.toast');
const toastMessage = document.querySelector('.toast-message');
let cart = [];
let toastTimer;

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

function showToast(message) {
  toastMessage.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2300);
}

function updateCart() {
  const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartCount.textContent = quantity;
  cartCount.hidden = quantity === 0;
  total.textContent = `$${cartTotal.toFixed(2)}`;
  checkoutButton.disabled = cart.length === 0;
  cartItems.innerHTML = cart.length
    ? cart.map((item) => `<div class="cart-item"><div><h3>${item.name}</h3><p>$${item.price.toFixed(2)}</p></div><div class="cart-item__controls"><div class="quantity-control"><button type="button" data-action="decrease" data-name="${item.name}" aria-label="Decrease ${item.name} quantity">&minus;</button><strong>${item.quantity}</strong><button type="button" data-action="increase" data-name="${item.name}" aria-label="Increase ${item.name} quantity">+</button></div><button type="button" class="remove-item" data-action="remove" data-name="${item.name}" aria-label="Remove ${item.name}">&times;</button></div></div>`).join('')
    : '<p class="empty-cart">Your cart is empty.<br /><small>Find something you love.</small></p>';
}

function openCart() {
  cartDrawer.classList.add('is-open');
  overlay.classList.add('is-visible');
  cartDrawer.setAttribute('aria-hidden', 'false');
}

function closeCart() {
  cartDrawer.classList.remove('is-open');
  overlay.classList.remove('is-visible');
  cartDrawer.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.add-cart').forEach((button) => button.addEventListener('click', () => {
  const card = button.closest('.product-card');
  const name = card.querySelector('h3').textContent;
  const price = Number(card.querySelector('p').textContent.replace(/[^0-9.]/g, ''));
  const item = cart.find((entry) => entry.name === name);
  if (item) item.quantity += 1;
  else cart.push({ name, price, quantity: 1 });
  updateCart();
  showToast(`${name} added to your cart`);
  button.textContent = 'Added!';
  setTimeout(() => { button.textContent = 'Add to Cart'; }, 950);
}));

cartButton.addEventListener('click', openCart);
closeCartButton.addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);
cartItems.addEventListener('click', (event) => {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const item = cart.find((entry) => entry.name === button.dataset.name);
  if (!item) return;
  if (button.dataset.action === 'increase') item.quantity += 1;
  if (button.dataset.action === 'decrease') item.quantity -= 1;
  if (button.dataset.action === 'remove' || item.quantity === 0) cart = cart.filter((entry) => entry.name !== button.dataset.name);
  updateCart();
});

checkoutButton.addEventListener('click', () => { closeCart(); confirmationModal.hidden = false; });
cancelOrderButton.addEventListener('click', () => { confirmationModal.hidden = true; });
placeOrderButton.addEventListener('click', () => {
  confirmationModal.querySelector('h2').textContent = 'Order Confirmed!';
  confirmationModal.querySelector('p').textContent = 'Thank you for shopping with ShopEase. Your order is on its way.';
  placeOrderButton.hidden = true;
  cancelOrderButton.textContent = 'Continue Shopping';
  cart = [];
  updateCart();
});

updateCart();

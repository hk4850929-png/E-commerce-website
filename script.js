// ==========================================
// ShopEase JavaScript
// ==========================================

// Mobile Menu
const menu = document.querySelector(".menu");
const nav = document.querySelector("nav");

if (menu && nav) {
    menu.addEventListener("click", () => {
        nav.classList.toggle("active");

        menu.innerHTML = nav.classList.contains("active")
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
            menu.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });
}

// ==========================================
// LOGIN BUTTON
// ==========================================

const loginBtn = document.querySelector(".login-btn");

if (loginBtn) {
    loginBtn.addEventListener("click", () => {
        window.location.href = "login.html";
    });
}

// ==========================================
// BACK TO TOP
// ==========================================

const topBtn = document.getElementById("topBtn");

if (topBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {
            topBtn.style.display = "flex";
        } else {
            topBtn.style.display = "none";
        }

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

// ==========================================
// PRODUCT SEARCH
// ==========================================

const searchInput = document.querySelector(".search-box input");

const products = document.querySelectorAll(
    ".shoe-card, .electronic-card, .fashion-card, .watch-card, .bag-card, .sports-card"
);

if (searchInput) {

    searchInput.addEventListener("keyup", () => {

        const value = searchInput.value.toLowerCase();

        products.forEach(product => {

            const text = product.innerText.toLowerCase();

            if (text.includes(value)) {

                product.style.display = "";

            } else {

                product.style.display = "none";

            }

        });

    });

}

// ==========================================
// CART SYSTEM
// ==========================================
// ==========================================
// CART SYSTEM
// ==========================================

let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

const cartCount = document.querySelector(".cart-count");
const cartItemsBox = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-footer h3");

function updateCartCount() {
    if (cartCount) {
        cartCount.textContent = cartItems.length;
    }
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    updateCartCount();
}

function loadCart() {

    cartItemsBox.innerHTML = "";

    if (cartItems.length === 0) {
        cartItemsBox.innerHTML = "<p>Your cart is empty</p>";
        cartTotal.textContent = "Total: ₹0";
        return;
    }

    let total = 0;

    cartItems.forEach((item, index) => {

        total += item.price;

        const div = document.createElement("div");
        div.className = "cart-product";

        div.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>₹${item.price}</p>
            </div>

            <button class="remove-item" data-index="${index}">
                Remove
            </button>
        `;

        cartItemsBox.appendChild(div);

    });

    cartTotal.textContent = `Total: ₹${total}`;

    document.querySelectorAll(".remove-item").forEach(btn => {

        btn.onclick = () => {

            cartItems.splice(btn.dataset.index, 1);

            saveCart();
            loadCart();

        };

    });

}

updateCartCount();

document.querySelectorAll(
".buy-btn, .cart-btn, .bag-card button, .sports-card button, .fashion-card button, .watch-card button"
).forEach(button => {

    button.addEventListener("click", () => {

        const card = button.closest(
            ".shoe-card, .electronic-card, .fashion-card, .watch-card, .bag-card, .sports-card"
        );

        if (!card) return;

        const name = card.querySelector("h3").textContent;

        let price = 999;

        const priceText = card.querySelector(".price, .new-price, .fashion-price span, .bag-price span, .watch-price span");

        if (priceText) {
            price = parseInt(priceText.textContent.replace(/[^\d]/g, ""));
        }

        cartItems.push({
            name,
            price
        });

        saveCart();

        button.innerHTML = "Added ✓";

        setTimeout(() => {
            button.innerHTML = "Add to Cart";
        }, 1200);

    });

});
// ==========================================
// MESSAGE POPUP
// ==========================================

const cartIcon = document.querySelector(".cart-icon");
const cartPopup = document.querySelector(".cart-popup");
const closeCart = document.querySelector(".close-cart");

cartIcon.addEventListener("click", () => {
    loadCart();
    cartPopup.classList.add("active");
});

closeCart.addEventListener("click", () => {
    cartPopup.classList.remove("active");
});
// ==========================================
// WISHLIST
// ==========================================

let wishlist = [];

const wishlistButtons = document.querySelectorAll(".wishlist");

wishlistButtons.forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("liked");

        const icon = button.querySelector("i");

        if (button.classList.contains("liked")) {

            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");

            const product = button.closest(
                ".shoe-card, .electronic-card, .fashion-card, .watch-card, .bag-card, .sports-card"
            );

            if (product) {
                wishlist.push(product.querySelector("h3").innerText);
            }

        } else {

            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");

        }

    });

});

// ==========================================
// CART POPUP
// ==========================================

const cartIcon = document.querySelector(".cart-icon");
const cartPopup = document.querySelector(".cart-popup");
const closeCart = document.querySelector(".close-cart");
const cartItemsBox = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-footer h3");

function loadCart() {

    if (!cartItemsBox) return;

    cartItemsBox.innerHTML = "";

    if (cartItems.length === 0) {

        cartItemsBox.innerHTML = "<p>Your cart is empty</p>";
        cartTotal.innerHTML = "Total: ₹0";
        return;

    }

    let total = 0;

    cartItems.forEach(item => {

        const div = document.createElement("div");

        div.className = "cart-product";

        div.innerHTML = `
            <p>${item}</p>
        `;

        cartItemsBox.appendChild(div);

        total += 999;

    });

    cartTotal.innerHTML = `Total: ₹${total}`;

}

if (cartIcon) {

    cartIcon.addEventListener("click", () => {

        loadCart();

        cartPopup.classList.add("active");

    });

}

if (closeCart) {

    closeCart.addEventListener("click", () => {

        cartPopup.classList.remove("active");

    });

}

// ==========================================
// NEWSLETTER
// ==========================================

const newsletter = document.querySelector(".newsletter-form");

if (newsletter) {

    newsletter.addEventListener("submit", e => {

        e.preventDefault();

        alert("🎉 Thank you for subscribing!");

        newsletter.reset();

    });

}

// ==========================================
// IMAGE ZOOM
// ==========================================

document.querySelectorAll(
".shoe-card img, .electronic-card img, .fashion-card img, .watch-card img, .bag-card img, .sports-card img"
).forEach(img => {

    img.addEventListener("mouseenter", () => {

        img.style.transform = "scale(1.08)";
        img.style.transition = ".4s";

    });

    img.addEventListener("mouseleave", () => {

        img.style.transform = "scale(1)";

    });

});

// ==========================================
// PREVENT IMAGE DRAG
// ==========================================

document.querySelectorAll("img").forEach(img => {

    img.draggable = false;

});

// ==========================================
// REVIEW ANIMATION
// ==========================================

document.querySelectorAll(".review-card").forEach(card => {

    card.addEventListener("dblclick", () => {

        card.style.transform = "scale(1.05)";

        setTimeout(() => {

            card.style.transform = "";

        }, 300);

    });

});
// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================

const revealElements = document.querySelectorAll(`
section,
.shoe-card,
.electronic-card,
.fashion-card,
.watch-card,
.bag-card,
.sports-card,
.review-card
`.replace(/\n/g, ""));

function revealOnScroll() {

    revealElements.forEach(element => {

        const top = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (top < windowHeight - 100) {
            element.classList.add("show");
        }

    });

}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// ==========================================
// FLASH SALE TIMER (24 HOURS)
// ==========================================

const timer = document.querySelector(".sale-timer");

if (timer) {

    const endTime = Date.now() + 24 * 60 * 60 * 1000;

    function updateTimer() {

        const distance = endTime - Date.now();

        if (distance <= 0) {
            timer.innerHTML = "Offer Ended";
            return;
        }

        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timer.innerHTML = `${hours}h : ${minutes}m : ${seconds}s`;

    }

    updateTimer();
    setInterval(updateTimer, 1000);

}

// ==========================================
// MOBILE CARD EFFECT
// ==========================================

if (window.innerWidth <= 768) {

    document.querySelectorAll(
        ".shoe-card, .electronic-card, .fashion-card, .watch-card, .bag-card, .sports-card"
    ).forEach(card => {

        card.addEventListener("click", () => {

            card.classList.toggle("mobile-active");

        });

    });

}

// ==========================================
// OPTIONAL DARK MODE
// ==========================================

const darkBtn = document.querySelector(".dark-mode");

if (darkBtn) {

    darkBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        darkBtn.innerHTML = document.body.classList.contains("dark")
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';

    });

}

// ==========================================
// PAGE LOADER
// ==========================================

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    if (loader) {
        loader.style.display = "none";
    }

});

// ==========================================
// CHECKOUT BUTTON
// ==========================================

const checkoutBtn = document.querySelector(".cart-footer button");

if (checkoutBtn) {

    checkoutBtn.addEventListener("click", () => {

        if (cartItems.length === 0) {

            alert("🛒 Your cart is empty!");

            return;

        }

        alert("✅ Thank you for shopping with ShopEase!");

        cartItems = [];

        localStorage.removeItem("cart");

        updateCartCount();

        loadCart();

    });

}

// ==========================================
// WEBSITE READY
// ==========================================

console.log("✅ ShopEase Loaded Successfully");
// ==========================================
// LOGIN BUTTON
// ==========================================

const loginBtn = document.querySelector(".login-btn");

if (loginBtn) {
    loginBtn.addEventListener("click", function () {
        window.location.href = "login.html";
    });
}

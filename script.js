// ==========================================
// ShopEase JavaScript
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // MOBILE MENU
    // ==========================================

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

            topBtn.style.display =
                window.scrollY > 400 ? "flex" : "none";

        });

        topBtn.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }

    // ==========================================
    // SEARCH
    // ==========================================

    const searchInput = document.querySelector(".search-box input");

    const products = document.querySelectorAll(
        ".shoe-card,.electronic-card,.fashion-card,.watch-card,.bag-card,.sports-card"
    );

    if (searchInput) {

        searchInput.addEventListener("keyup", () => {

            const value = searchInput.value.toLowerCase();

            products.forEach(product => {

                const text = product.innerText.toLowerCase();

                product.style.display =
                    text.includes(value) ? "" : "none";

            });

        });

    }

    // ==========================================
    // CART VARIABLES
    // ==========================================

    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    const cartIcon = document.querySelector(".cart-icon");
    const cartPopup = document.querySelector(".cart-popup");
    const closeCart = document.querySelector(".close-cart");
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

    updateCartCount();
        // ==========================================
    // CART FUNCTIONS
    // ==========================================

    function loadCart() {

        if (!cartItemsBox) return;

        cartItemsBox.innerHTML = "";

        if (cartItems.length === 0) {

            cartItemsBox.innerHTML = "<p>Your cart is empty.</p>";

            if (cartTotal) {
                cartTotal.innerHTML = "Total: ₹0";
            }

            return;
        }

        let total = 0;

        cartItems.forEach((item, index) => {

            total += item.price * item.qty;

            const div = document.createElement("div");

            div.className = "cart-product";

            div.innerHTML = `
                <div class="cart-product-info">
                    <h4>${item.name}</h4>
                    <p>₹${item.price}</p>

                    <div class="qty-box">
                        <button class="minus" data-index="${index}">−</button>

                        <span>${item.qty}</span>

                        <button class="plus" data-index="${index}">+</button>
                    </div>
                </div>

                <button class="remove-item" data-index="${index}">
                    Remove
                </button>
            `;

            cartItemsBox.appendChild(div);

        });

        if (cartTotal) {

            cartTotal.innerHTML = `Total: ₹${total}`;

        }

        // Remove Item

        document.querySelectorAll(".remove-item").forEach(btn => {

            btn.onclick = () => {

                cartItems.splice(btn.dataset.index, 1);

                saveCart();

                loadCart();

            };

        });

        // Increase Qty

        document.querySelectorAll(".plus").forEach(btn => {

            btn.onclick = () => {

                cartItems[btn.dataset.index].qty++;

                saveCart();

                loadCart();

            };

        });

        // Decrease Qty

        document.querySelectorAll(".minus").forEach(btn => {

            btn.onclick = () => {

                if (cartItems[btn.dataset.index].qty > 1) {

                    cartItems[btn.dataset.index].qty--;

                } else {

                    cartItems.splice(btn.dataset.index, 1);

                }

                saveCart();

                loadCart();

            };

        });

    }

    // ==========================================
    // ADD TO CART
    // ==========================================

    document.querySelectorAll(
        ".buy-btn,.cart-btn,.fashion-card button,.watch-card button,.bag-card button,.sports-card button"
    ).forEach(button => {

        button.addEventListener("click", () => {

            const card = button.closest(
                ".shoe-card,.electronic-card,.fashion-card,.watch-card,.bag-card,.sports-card"
            );

            if (!card) return;

            const name = card.querySelector("h3").innerText;

            let price = 999;

            const priceElement = card.querySelector(
                ".price,.new-price,.fashion-price,.bag-price,.watch-price"
            );

            if (priceElement) {

                price = parseInt(
                    priceElement.textContent.replace(/[^\d]/g, "")
                );

            }

            const existing = cartItems.find(item => item.name === name);

            if (existing) {

                existing.qty++;

            } else {

                cartItems.push({
                    name,
                    price,
                    qty: 1
                });

            }

            saveCart();

            loadCart();

            button.innerHTML = "Added ✓";

            setTimeout(() => {

                button.innerHTML = "Add to Cart";

            }, 1200);

        });

    });

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
    // WISHLIST
    // ==========================================

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    document.querySelectorAll(".wishlist").forEach(button => {

        const icon = button.querySelector("i");

        button.addEventListener("click", () => {

            const card = button.closest(
                ".shoe-card,.electronic-card,.fashion-card,.watch-card,.bag-card,.sports-card"
            );

            if (!card) return;

            const name = card.querySelector("h3").innerText;

            if (wishlist.includes(name)) {

                wishlist = wishlist.filter(item => item !== name);

                icon.classList.remove("fa-solid");
                icon.classList.add("fa-regular");

            } else {

                wishlist.push(name);

                icon.classList.remove("fa-regular");
                icon.classList.add("fa-solid");

            }

            localStorage.setItem("wishlist", JSON.stringify(wishlist));

        });

    });

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
    // IMAGE ZOOM EFFECT
    // ==========================================

    document.querySelectorAll(
        ".shoe-card img,.electronic-card img,.fashion-card img,.watch-card img,.bag-card img,.sports-card img"
    ).forEach(img => {

        img.draggable = false;

        img.addEventListener("mouseenter", () => {

            img.style.transform = "scale(1.08)";
            img.style.transition = ".4s";

        });

        img.addEventListener("mouseleave", () => {

            img.style.transform = "scale(1)";

        });

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
    // SCROLL REVEAL
    // ==========================================

    const revealItems = document.querySelectorAll(
        "section,.shoe-card,.electronic-card,.fashion-card,.watch-card,.bag-card,.sports-card,.review-card"
    );

    function revealOnScroll() {

        revealItems.forEach(item => {

            if (item.getBoundingClientRect().top < window.innerHeight - 100) {

                item.classList.add("show");

            }

        });

    }

    window.addEventListener("scroll", revealOnScroll);

    revealOnScroll();

    // ==========================================
    // FLASH SALE TIMER
    // ==========================================

    const timer = document.querySelector(".sale-timer");

    if (timer) {

        let endTime = Date.now() + (24 * 60 * 60 * 1000);

        function updateTimer() {

            const distance = endTime - Date.now();

            if (distance <= 0) {

                timer.innerHTML = "Offer Ended";

                return;

            }

            const h = Math.floor(distance / (1000 * 60 * 60));

            const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

            const s = Math.floor((distance % (1000 * 60)) / 1000);

            timer.innerHTML = `${h}h : ${m}m : ${s}s`;

        }

        updateTimer();

        setInterval(updateTimer, 1000);

    }
        // ==========================================
    // MOBILE CARD EFFECT
    // ==========================================

    if (window.innerWidth <= 768) {

        document.querySelectorAll(
            ".shoe-card,.electronic-card,.fashion-card,.watch-card,.bag-card,.sports-card"
        ).forEach(card => {

            card.addEventListener("click", () => {

                card.classList.toggle("mobile-active");

            });

        });

    }

    // ==========================================
    // DARK MODE
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

    const loader = document.querySelector(".loader");

    window.addEventListener("load", () => {

        if (loader) {

            loader.style.display = "none";

        }

    });

    // ==========================================
    // CHECKOUT
    // ==========================================

    const checkoutBtn = document.querySelector(".cart-footer button");

    if (checkoutBtn) {

        checkoutBtn.addEventListener("click", () => {

            if (cartItems.length === 0) {

                alert("🛒 Your cart is empty!");

                return;

            }

            const total = cartItems.reduce((sum, item) => {
                return sum + (item.price * item.qty);
            }, 0);

            alert(
                `✅ Order Placed Successfully!\n\nItems: ${cartItems.length}\nTotal: ₹${total}\n\nThank you for shopping with ShopEase!`
            );

            cartItems = [];

            saveCart();

            loadCart();

            if (cartPopup) {

                cartPopup.classList.remove("active");

            }

        });

    }

    // ==========================================
    // WEBSITE READY
    // ==========================================

    console.log("✅ ShopEase Loaded Successfully");

});

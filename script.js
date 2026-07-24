// ======================================
// MOBILE MENU
// ======================================

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
        menuBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    } else {
        menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
});

// ======================================
// CART
// ======================================

const cartBtn = document.querySelector(".cart-btn");
const cartSidebar = document.querySelector(".cart-sidebar");
const closeCart = document.getElementById("close-cart");
const cartItems = document.querySelector(".cart-items");
const totalPrice = document.getElementById("total-price");
const cartCount = document.getElementById("cart-count");

let total = 0;
let count = 0;

// Open Cart
cartBtn.addEventListener("click", () => {
    cartSidebar.classList.add("active");
});

// Close Cart
closeCart.addEventListener("click", () => {
    cartSidebar.classList.remove("active");
});

// ======================================
// POPUP
// ======================================

const popup = document.getElementById("popup");

function showPopup() {
    popup.classList.add("show");

    setTimeout(() => {
        popup.classList.remove("show");
    }, 2000);
}

// ======================================
// ADD TO CART
// ======================================

const addButtons = document.querySelectorAll(".cart");

addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const card = button.closest(".product-card");

        const name = card.querySelector("h3").innerText;

        const price = parseInt(
            card.querySelector("h4")
            .innerText.replace("₹", "")
            .replace(",", "")
        );

        const image = card.querySelector("img").src;

        total += price;
        count++;

        totalPrice.innerText = "₹" + total.toLocaleString();

        cartCount.innerText = count;

        const item = document.createElement("div");

        item.classList.add("cart-item");

        item.innerHTML = `
            <img src="${image}" width="70">

            <div>

                <h4>${name}</h4>

                <p>₹${price.toLocaleString()}</p>

            </div>

            <button class="remove-item">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;

        cartItems.appendChild(item);

        showPopup();

        cartSidebar.classList.add("active");

        item.querySelector(".remove-item").addEventListener("click", () => {

            item.remove();

            total -= price;
            count--;

            if (total < 0) total = 0;
            if (count < 0) count = 0;

            totalPrice.innerText = "₹" + total.toLocaleString();
            cartCount.innerText = count;

        });

    });

});

// ======================================
// WISHLIST
// ======================================

const wishlistButtons = document.querySelectorAll(".wishlist");

wishlistButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        const icon = btn.querySelector("i");

        if (icon.classList.contains("fa-regular")) {

            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");

            btn.style.background = "#ff4d6d";

        } else {

            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");

            btn.style.background = "#222";

        }

    });

});
// ======================================
// LIVE SEARCH
// ======================================

const searchInput = document.querySelector(".search-box input");
const productCards = document.querySelectorAll(".product-card");

searchInput.addEventListener("keyup", () => {

    const value = searchInput.value.toLowerCase();

    productCards.forEach(card => {

        const productName = card.querySelector("h3").innerText.toLowerCase();

        if (productName.includes(value)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

});

// ======================================
// BUY NOW
// ======================================

const buyButtons = document.querySelectorAll(".buy");

buyButtons.forEach(button => {

    button.addEventListener("click", () => {

        alert("Thank you for shopping with FashionHub!");

    });

});

// ======================================
// ACTIVE NAVIGATION
// ======================================

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (pageYOffset >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

// ======================================
// SCROLL TO TOP BUTTON
// ======================================

const scrollBtn = document.createElement("button");

scrollBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';

scrollBtn.classList.add("scroll-top");

document.body.appendChild(scrollBtn);

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        scrollBtn.classList.add("show");

    } else {

        scrollBtn.classList.remove("show");

    }

});

scrollBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

// ======================================
// HEADER SHADOW
// ======================================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {

        header.style.boxShadow = "0 10px 25px rgba(0,0,0,.35)";

    } else {

        header.style.boxShadow = "none";

    }

});

// ======================================
// CONTACT FORM
// ======================================

const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", (e) => {

    e.preventDefault();

    alert("Your message has been sent successfully!");

    contactForm.reset();

});

// ======================================
// LOADING ANIMATION
// ======================================

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});

console.log("FashionHub Loaded Successfully 🚀");
const checkoutBtn = document.querySelector(".checkout-btn");
const checkoutModal = document.querySelector(".checkout-modal");
const cancelCheckout = document.getElementById("cancelCheckout");
const placeOrder = document.getElementById("placeOrder");
const orderPopup = document.getElementById("orderPopup");
const continueShopping = document.getElementById("continueShopping");

checkoutBtn.addEventListener("click", () => {

    if(cartItems.children.length === 0){
        alert("Your cart is empty!");
        return;
    }

    checkoutModal.classList.add("active");

});

cancelCheckout.addEventListener("click", () => {

    checkoutModal.classList.remove("active");

});

placeOrder.addEventListener("click", () => {

    const name = document.getElementById("customerName").value;
    const phone = document.getElementById("customerPhone").value;
    const address = document.getElementById("customerAddress").value;

    if(name==="" || phone==="" || address===""){
        alert("Please fill all details.");
        return;
    }

    checkoutModal.classList.remove("active");

    orderPopup.classList.add("show");

    cartItems.innerHTML="";
    total=0;
    count=0;

    totalPrice.innerText="₹0";
    cartCount.innerText="0";

});

continueShopping.addEventListener("click",()=>{

    orderPopup.classList.remove("show");

});

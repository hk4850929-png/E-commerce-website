// ==============================
// SMOOTH SCROLL
// ==============================

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", function(e) {
        const target = this.getAttribute("href");

        if (target.startsWith("#")) {
            e.preventDefault();

            document.querySelector(target).scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// ==============================
// ADD TO CART
// ==============================

let cartCount = 0;

const cartIcon = document.querySelector(".fa-cart-shopping");
const cartButtons = document.querySelectorAll(".card button");

cartButtons.forEach(button => {

    button.addEventListener("click", () => {

        cartCount++;

        cartIcon.setAttribute(
            "data-count",
            cartCount
        );

        alert("✅ Product Added to Cart!");
    });

});

// ==============================
// SEARCH ICON
// ==============================

const searchIcon = document.querySelector(".fa-magnifying-glass");

searchIcon.addEventListener("click", () => {

    const product = prompt("Search Product");

    if(product){

        alert("Searching for : " + product);

    }

});

// ==============================
// HERO BUTTON
// ==============================

const shopBtn = document.querySelector(".hero-text button");

shopBtn.addEventListener("click", () => {

    document.querySelector(".products").scrollIntoView({

        behavior:"smooth"

    });

});

// ==============================
// PRODUCT ANIMATION
// ==============================

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mouseenter",()=>{

        card.style.transform="translateY(-10px)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="translateY(0px)";

    });

});

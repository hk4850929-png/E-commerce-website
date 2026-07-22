// Mobile Menu
const menu = document.querySelector(".menu");
const nav = document.querySelector("nav");

menu.addEventListener("click", () => {
    nav.classList.toggle("active");

    menu.innerHTML = nav.classList.contains("active")
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});

// Close menu on link click
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
        menu.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
});

// Add to Cart Demo
let count = 0;
const cartCount = document.querySelector(".cart span");

document.querySelectorAll(".product-card button").forEach(button => {
    button.addEventListener("click", () => {
        count++;
        cartCount.textContent = count;
        alert("✅ Product added to cart!");
    });
});

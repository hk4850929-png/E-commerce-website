// Mobile Menu Toggle
const menu = document.querySelector(".menu");
const nav = document.querySelector("nav");

menu.addEventListener("click", () => {
    nav.classList.toggle("active");

    if (nav.classList.contains("active")) {
        menu.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    } else {
        menu.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
});

// Close menu when a link is clicked
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
        menu.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
});

// Simple Add to Cart Alert
document.querySelectorAll(".product-card button").forEach(button => {
    button.addEventListener("click", () => {
        alert("✅ Product added to cart!");
    });
});
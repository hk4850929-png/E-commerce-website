// ===============================
// ShopEase JavaScript
// ===============================

// Add to Cart

const cartCount = document.querySelector(".cart span");
const buttons = document.querySelectorAll(".card button");

let count = 2;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        count++;
        cartCount.innerText = count;

        button.innerText = "Added ✓";
        button.style.background = "#28a745";

        setTimeout(() => {
            button.innerText = "Add to Cart";
            button.style.background = "#5b2dff";
        }, 1200);
    });
});

// Smooth Scroll

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();

        const id = this.getAttribute("href");

        if(id !== "#"){
            document.querySelector(id).scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// Header Shadow

window.addEventListener("scroll", () => {

    const header = document.querySelector("header");

    if(window.scrollY > 20){
        header.style.boxShadow = "0 10px 20px rgba(0,0,0,.15)";
    }else{
        header.style.boxShadow = "0 5px 15px rgba(0,0,0,.08)";
    }

});

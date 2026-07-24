// ==========================================
// FASHION HUB PREMIUM SCRIPT
// ==========================================

// ===========================
// ELEMENTS
// ===========================

const menu = document.getElementById("menu");
const navbar = document.getElementById("navbar");

const cartIcon = document.getElementById("cart-icon");
const cartBox = document.querySelector(".cart");

const cartItems = document.getElementById("cart-items");
const totalAmount = document.getElementById("total");

const popup = document.getElementById("popup");

const searchInput = document.querySelector(".search-box input");

const shopBtn = document.querySelector(".shop-btn");

let cart = [];
let total = 0;

// ===========================
// MOBILE MENU
// ===========================

menu.addEventListener("click", () => {

    navbar.classList.toggle("active");

    if (navbar.classList.contains("active")) {

        menu.classList.remove("fa-bars");
        menu.classList.add("fa-xmark");

    } else {

        menu.classList.remove("fa-xmark");
        menu.classList.add("fa-bars");

    }

});

// ===========================
// CLOSE MENU AFTER CLICK
// ===========================

document.querySelectorAll("#navbar a").forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

        menu.classList.remove("fa-xmark");
        menu.classList.add("fa-bars");

    });

});

// ===========================
// SHOP NOW BUTTON
// ===========================

if(shopBtn){

    shopBtn.addEventListener("click",function(e){

        e.preventDefault();

        document.getElementById("products").scrollIntoView({

            behavior:"smooth"

        });

    });

}

// ===========================
// CART OPEN
// ===========================

cartIcon.addEventListener("click",()=>{

    cartBox.classList.toggle("active");

});

// ===========================
// CLOSE CART WHEN CLICK OUTSIDE
// ===========================

document.addEventListener("click",(e)=>{

    if(

        !cartBox.contains(e.target)
        &&
        !cartIcon.contains(e.target)

    ){

        cartBox.classList.remove("active");

    }

});

// ===========================
// SEARCH PRODUCTS
// ===========================

if(searchInput){

searchInput.addEventListener("keyup",function(){

let value=this.value.toLowerCase();

let products=document.querySelectorAll(".product");

products.forEach(product=>{

let name=product.querySelector("h3").innerText.toLowerCase();

if(name.includes(value)){

product.style.display="block";

}else{

product.style.display="none";

}

});

});

}
// ===========================
// ADD TO CART
// ===========================

function addCart(productName, price){

    cart.push({
        name: productName,
        price: price
    });

    total += price;

    updateCart();

    showPopup();

    saveCart();

}

// ===========================
// UPDATE CART
// ===========================

function updateCart(){

    cartItems.innerHTML = "";

    cart.forEach((item,index)=>{

        const div = document.createElement("div");

        div.innerHTML = `

            <h4>${item.name}</h4>

            <p>₹${item.price}</p>

            <button onclick="removeCart(${index})">
                Remove
            </button>

        `;

        cartItems.appendChild(div);

    });

    totalAmount.innerText = total;

}

// ===========================
// REMOVE PRODUCT
// ===========================

function removeCart(index){

    total -= cart[index].price;

    cart.splice(index,1);

    updateCart();

    saveCart();

}

// ===========================
// POPUP
// ===========================

function showPopup(){

    popup.style.display = "block";

    popup.style.opacity = "1";

    setTimeout(()=>{

        popup.style.display = "none";

    },1800);

}

// ===========================
// CHECKOUT
// ===========================

function checkout(){

    if(cart.length===0){

        alert("Your cart is empty!");

        return;

    }

    alert("🎉 Thank you for shopping with FashionHub!");

    cart = [];

    total = 0;

    updateCart();

    saveCart();

    cartBox.classList.remove("active");

}

// ===========================
// WISHLIST
// ===========================

document.querySelectorAll(".wishlist").forEach(btn=>{

    btn.addEventListener("click",function(){

        this.classList.toggle("fa-regular");

        this.classList.toggle("fa-solid");

        this.style.color = "#ff4d4d";

    });

});

// ===========================
// LOCAL STORAGE
// ===========================

function saveCart(){

    localStorage.setItem("fashionhub_cart",JSON.stringify(cart));

}

function loadCart(){

    const data = localStorage.getItem("fashionhub_cart");

    if(data){

        cart = JSON.parse(data);

        total = 0;

        cart.forEach(item=>{

            total += item.price;

        });

        updateCart();

    }

}

loadCart();

// ===========================
// ACTIVE NAV ON SCROLL
// ===========================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("#navbar a");

window.addEventListener("scroll",()=>{

    let current = "";

    sections.forEach(section=>{

        const sectionTop = section.offsetTop - 120;

        if(window.scrollY >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#" + current){

            link.classList.add("active");

        }

    });

});

// ===========================
// HEADER SHADOW
// ===========================

window.addEventListener("scroll",()=>{

    const header = document.querySelector("header");

    if(window.scrollY > 50){

        header.style.boxShadow =
        "0 15px 35px rgba(0,0,0,.12)";

    }else{

        header.style.boxShadow =
        "0 10px 30px rgba(0,0,0,.08)";

    }

});

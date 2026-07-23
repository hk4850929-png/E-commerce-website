// ==========================
// MOBILE MENU
// ==========================

const menu = document.getElementById("menu");
const nav = document.getElementById("nav");

menu.addEventListener("click", () => {
    nav.classList.toggle("active");

    if (nav.classList.contains("active")) {
        menu.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    } else {
        menu.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
});

// ==========================
// CART
// ==========================

const cartBtn = document.getElementById("cart-btn");
const cart = document.getElementById("cart");
const closeCart = document.getElementById("close-cart");

cartBtn.addEventListener("click", () => {
    cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
});

// ==========================
// ADD TO CART
// ==========================

const buttons = document.querySelectorAll(".add-cart");
const cartItems = document.getElementById("cart-items");
const total = document.getElementById("total");
const count = document.getElementById("count");
const popup = document.getElementById("popup");

let cartData = [];
let totalPrice = 0;

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        cartData.push({
            name,
            price
        });

        updateCart();

        popup.classList.add("show");

        setTimeout(() => {
            popup.classList.remove("show");
        }, 2000);

    });

});

// ==========================
// UPDATE CART
// ==========================

function updateCart(){

    cartItems.innerHTML="";

    totalPrice=0;

    if(cartData.length===0){

        cartItems.innerHTML="<p>Your cart is empty.</p>";

        total.innerText=0;

        count.innerText=0;

        return;

    }

    cartData.forEach((item,index)=>{

        totalPrice+=item.price;

        let div=document.createElement("div");

        div.classList.add("cart-item");

        div.innerHTML=`

        <div>

        <h4>${item.name}</h4>

        <p>₹${item.price}</p>

        </div>

        <button onclick="removeItem(${index})">

        Remove

        </button>

        `;

        cartItems.appendChild(div);

    });

    total.innerText=totalPrice;

    count.innerText=cartData.length;

}

// ==========================
// REMOVE ITEM
// ==========================

function removeItem(index){

    cartData.splice(index,1);

    updateCart();

}

// ==========================
// CHECKOUT
// ==========================

document.querySelector(".checkout").addEventListener("click",()=>{

    if(cartData.length===0){

        alert("Your cart is empty!");

        return;

    }

    alert("Order Placed Successfully 🎉");

    cartData=[];

    updateCart();

});

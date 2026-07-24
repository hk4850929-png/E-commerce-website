// ===============================
// MOBILE MENU
// ===============================

const menu = document.getElementById("menu");
const navbar = document.getElementById("navbar");

menu.addEventListener("click", () => {

    navbar.classList.toggle("active");

    if(navbar.classList.contains("active")){
        menu.classList.remove("fa-bars");
        menu.classList.add("fa-xmark");
    }
    else{
        menu.classList.remove("fa-xmark");
        menu.classList.add("fa-bars");
    }

});



// ===============================
// CART SYSTEM
// ===============================


let cart = [];

let total = 0;


const cartIcon = document.getElementById("cart-icon");
const cartBox = document.querySelector(".cart");
const cartItems = document.getElementById("cart-items");
const totalAmount = document.getElementById("total");



cartIcon.addEventListener("click",()=>{

    cartBox.classList.toggle("active");

});





// ===============================
// ADD TO CART
// ===============================


function addCart(productName, price){


    cart.push({

        name:productName,
        price:price

    });


    total += price;


    showCart();


    popup();

}




// ===============================
// DISPLAY CART
// ===============================


function showCart(){


    cartItems.innerHTML="";


    cart.forEach((item,index)=>{


        let div=document.createElement("div");


        div.innerHTML=`

        <h4>${item.name}</h4>

        <p>₹${item.price}</p>

        <button onclick="removeCart(${index})">
        Remove
        </button>

        `;


        cartItems.appendChild(div);


    });



    totalAmount.innerText=total;


}




// ===============================
// REMOVE CART ITEM
// ===============================


function removeCart(index){


    total -= cart[index].price;


    cart.splice(index,1);


    showCart();

}




// ===============================
// SUCCESS POPUP
// ===============================


function popup(){


    let box=document.getElementById("popup");


    box.style.display="block";


    setTimeout(()=>{

        box.style.display="none";

    },2000);


}




// ===============================
// CHECKOUT
// ===============================


function checkout(){


    if(cart.length===0){

        alert("Your cart is empty!");

    }

    else{

        alert("Order placed successfully!");

        cart=[];

        total=0;

        showCart();

        cartBox.classList.remove("active");

    }


}



// ===============================
// CLOSE MOBILE MENU AFTER CLICK
// ===============================


document.querySelectorAll("nav a").forEach(link=>{


    link.addEventListener("click",()=>{


        navbar.classList.remove("active");


        menu.classList.remove("fa-xmark");

        menu.classList.add("fa-bars");


    });


});

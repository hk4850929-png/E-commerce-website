// ==========================================
// MOBILE MENU
// ==========================================

const menu = document.querySelector(".menu");
const nav = document.querySelector("nav");


if(menu){

    menu.addEventListener("click",()=>{

        nav.classList.toggle("active");


        menu.innerHTML = nav.classList.contains("active")

        ? '<i class="fa-solid fa-xmark"></i>'

        : '<i class="fa-solid fa-bars"></i>';

    });

}



// Close menu after clicking link

const navLinks = document.querySelectorAll("nav a");


navLinks.forEach(link=>{

    link.addEventListener("click",()=>{

        nav.classList.remove("active");


        if(menu){

            menu.innerHTML='<i class="fa-solid fa-bars"></i>';

        }

    });

});



// ==========================================
// BACK TO TOP BUTTON
// ==========================================


const topBtn = document.getElementById("topBtn");


window.addEventListener("scroll",()=>{


    if(window.scrollY > 400){

        topBtn.style.display="flex";

        topBtn.style.alignItems="center";

        topBtn.style.justifyContent="center";

    }

    else{

        topBtn.style.display="none";

    }


});



if(topBtn){

    topBtn.addEventListener("click",()=>{


        window.scrollTo({

            top:0,

            behavior:"smooth"

        });


    });

}



// ==========================================
// CART COUNTER
// ==========================================


let cartCount = 0;


const cartIcon = document.querySelector(".cart-icon");


const cartButtons = document.querySelectorAll(
    ".cart-btn, .buy-btn, .bag-card button, .sports-card button"
);



cartButtons.forEach(button=>{


    button.addEventListener("click",()=>{


        cartCount++;


        if(cartIcon){

            cartIcon.innerHTML = 
            `<i class="fa-solid fa-cart-shopping"></i>
            <span>${cartCount}</span>`;

        }


        button.innerHTML="Added ✓";


        button.style.background="#16a34a";



        setTimeout(()=>{


            button.innerHTML="Add to Cart";


            button.style.background="";


        },1500);



    });


});



// ==========================================
// WISHLIST HEART ANIMATION
// ==========================================


const wishlistButtons =
document.querySelectorAll(".wishlist");



wishlistButtons.forEach(btn=>{


    btn.addEventListener("click",()=>{


        btn.classList.toggle("liked");


        if(btn.classList.contains("liked")){


            btn.innerHTML=
            '<i class="fa-solid fa-heart"></i>';


        }

        else{


            btn.innerHTML=
            '<i class="fa-regular fa-heart"></i>';


        }


    });


});
// ==========================================
// DARK MODE
// ==========================================


const darkBtn = document.querySelector(".dark-mode");


if(darkBtn){


    darkBtn.addEventListener("click",()=>{


        document.body.classList.toggle("dark");


        darkBtn.innerHTML =
        document.body.classList.contains("dark")

        ?

        '<i class="fa-solid fa-sun"></i>'

        :

        '<i class="fa-solid fa-moon"></i>';


    });


}



// ==========================================
// PRODUCT SEARCH
// ==========================================


const searchInput =
document.querySelector(".search-box input");



const products =
document.querySelectorAll(
".shoe-card, .electronic-card, .fashion-card, .watch-card, .bag-card, .sports-card"
);



if(searchInput){


searchInput.addEventListener("keyup",()=>{


    let value =
    searchInput.value.toLowerCase();



    products.forEach(product=>{


        let text =
        product.innerText.toLowerCase();



        if(text.includes(value)){


            product.style.display="block";


        }

        else{


            product.style.display="none";


        }


    });



});


}



// ==========================================
// FLASH SALE TIMER
// ==========================================


const timer =
document.querySelector(".sale-timer");



if(timer){


    let endTime =
    new Date().getTime()
    +
    (24*60*60*1000);



    setInterval(()=>{


        let now =
        new Date().getTime();



        let distance =
        endTime-now;



        let hours =
        Math.floor(
            distance/(1000*60*60)
        );



        let minutes =
        Math.floor(
            (distance%(1000*60*60))
            /(1000*60)
        );



        let seconds =
        Math.floor(
            (distance%(1000*60))
            /1000
        );



        timer.innerHTML =

        `
        ${hours}h :
        ${minutes}m :
        ${seconds}s
        `;



    },1000);


}



// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================


const revealElements =
document.querySelectorAll(
"section, .shoe-card, .electronic-card, .fashion-card, .watch-card, .bag-card, .sports-card, .review-card"
);



window.addEventListener("scroll",()=>{


    revealElements.forEach(element=>{


        let position =
        element.getBoundingClientRect()
        .top;



        let screen =
        window.innerHeight;



        if(position < screen-100){


            element.classList.add("show");


        }



    });



});



// ==========================================
// NEWSLETTER SUBSCRIBE
// ==========================================


const newsletter =
document.querySelector(".newsletter-form");



if(newsletter){


newsletter.addEventListener("submit",(e)=>{


    e.preventDefault();



    alert(
    "🎉 Thank you for subscribing!"
    );



    newsletter.reset();



});


}



// ==========================================
// REVIEW LIKE BUTTON
// ==========================================


const reviews =
document.querySelectorAll(".review-card");



reviews.forEach(review=>{


    review.addEventListener("dblclick",()=>{


        review.style.transform=
        "scale(1.05)";


        setTimeout(()=>{


            review.style.transform="";


        },300);



    });


});
// ==========================================
// PAGE LOADER
// ==========================================


window.addEventListener("load",()=>{


    const loader =
    document.querySelector(".loader");


    if(loader){


        loader.style.display="none";


    }


});




// ==========================================
// CART SYSTEM WITH LOCAL STORAGE
// ==========================================


let cartItems =
JSON.parse(localStorage.getItem("cart"))
|| [];



const addButtons =
document.querySelectorAll(
".cart-btn, .buy-btn, .bag-card button, .sports-card button"
);



addButtons.forEach(button=>{


    button.addEventListener("click",()=>{


        let card =
        button.closest(
        ".shoe-card, .electronic-card, .fashion-card, .watch-card, .bag-card, .sports-card"
        );



        if(card){


            let productName =
            card.querySelector("h3").innerText;



            cartItems.push(productName);



            localStorage.setItem(
            "cart",
            JSON.stringify(cartItems)
            );



            showCartMessage(productName);



        }


    });


});




// Cart Notification


function showCartMessage(product){


    let message =
    document.createElement("div");



    message.className="cart-message";



    message.innerHTML=

    `

    🛒 ${product}

    added to cart!

    `;



    document.body.appendChild(message);



    setTimeout(()=>{


        message.remove();


    },2500);


}





// ==========================================
// LOAD SAVED CART COUNT
// ==========================================



const savedCart =
document.querySelector(".cart-count");



if(savedCart){


    savedCart.innerText =
    cartItems.length;


}





// ==========================================
// WISHLIST COUNTER
// ==========================================


let wishlistCount=0;



const heartButtons =
document.querySelectorAll(".wishlist");



heartButtons.forEach(button=>{


button.addEventListener("click",()=>{


    if(button.classList.contains("liked")){


        wishlistCount--;


    }

    else{


        wishlistCount++;


    }



    const count =
    document.querySelector(".wishlist-count");



    if(count){


        count.innerText=wishlistCount;


    }



});


});





// ==========================================
// PRODUCT IMAGE ZOOM
// ==========================================


const productImages =
document.querySelectorAll(
".shoe-card img, .fashion-card img, .bag-card img"
);



productImages.forEach(img=>{


    img.addEventListener("mouseenter",()=>{


        img.style.transform="scale(1.15)";


    });



    img.addEventListener("mouseleave",()=>{


        img.style.transform="scale(1)";


    });



});





// ==========================================
// PREVENT IMAGE DRAG
// ==========================================


document.querySelectorAll("img")
.forEach(img=>{


    img.addEventListener(
    "dragstart",
    e=>e.preventDefault()
    );


});





// ==========================================
// MOBILE TOUCH EFFECT
// ==========================================


if(window.innerWidth <= 768){


document.querySelectorAll(
".shoe-card, .fashion-card, .bag-card"
)

.forEach(card=>{


card.addEventListener("click",()=>{


    card.classList.toggle("mobile-active");


});


});


}

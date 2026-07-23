// ===============================
// MOBILE MENU
// ===============================

const menu = document.querySelector(".menu");
const nav = document.querySelector("nav");

menu.addEventListener("click", () => {

    nav.classList.toggle("active");

    if(nav.classList.contains("active")){
        menu.innerHTML='<i class="fa-solid fa-xmark"></i>';
    }else{
        menu.innerHTML='<i class="fa-solid fa-bars"></i>';
    }

});

// ===============================
// STICKY NAVBAR SHADOW
// ===============================

window.addEventListener("scroll",()=>{

const header=document.querySelector("header");

if(window.scrollY>50){

header.style.boxShadow="0 10px 30px rgba(0,0,0,.15)";

}else{

header.style.boxShadow="none";

}

});

// ===============================
// SCROLL ANIMATION
// ===============================

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document.querySelectorAll(".card,.feature,.step,.hero-text,.hero-image")
.forEach(el=>observer.observe(el));

// ===============================
// BUTTON RIPPLE EFFECT
// ===============================

document.querySelectorAll("button").forEach(btn=>{

btn.addEventListener("mouseenter",()=>{

btn.style.transform="scale(1.05)";

});

btn.addEventListener("mouseleave",()=>{

btn.style.transform="scale(1)";

});

});

// ===============================
// PRODUCT HOVER EFFECT
// ===============================

document.querySelectorAll(".card").forEach(card=>{

card.addEventListener("mousemove",()=>{

card.style.transform="translateY(-12px)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0px)";

});

});

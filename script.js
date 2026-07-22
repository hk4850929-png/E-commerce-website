// Add to Cart Button

const buttons = document.querySelectorAll(".card button");

buttons.forEach(button => {

button.addEventListener("click", () => {

alert("Product Added to Cart!");

});

});

let cartCount = 0;

const count = document.querySelector("#cart-count");

document.querySelectorAll(".add-cart").forEach((button) => {
  button.addEventListener("click", () => {
    cartCount += 1;
    count.textContent = cartCount;

    button.textContent = "Added ✓";
    button.disabled = true;
  });
});

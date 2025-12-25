import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

updateCartQuantity();

let checkout = "";

cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let index = 0;
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === productId) {
      index = i;
      break;
    }
  }
  const html = `          <div class="cart-item-container js-cart-item-container-${productId}">
            <div class="delivery-date">
              Delivery date: Wednesday, June 15
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${products[index].image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${products[index].name}
                </div>
                <div class="product-price">
                  $${formatCurrency(products[index].priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${
                      cartItem.productId
                    }">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id = ${
                    cartItem.productId
                  }>
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input-${cartItem.productId}"> <span class="save-quantity-link link-primary" data-product-id = "${cartItem.productId}">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${
                    cartItem.productId
                  }">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>

                <div class="delivery-option">
                  <input type="radio" class="delivery-option-input"
                    name="delivery-option-${cartItem.productId}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio" checked class="delivery-option-input"
                    name="delivery-option-${cartItem.productId}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio" class="delivery-option-input"
                    name="delivery-option-${cartItem.productId}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
`;
  checkout += html;
});

const checkoutItem = document.querySelector(".order-summary");
checkoutItem.innerHTML = checkout;

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const id = link.dataset.productId;
    let index;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].productId === id) {
        index = i;
        break;
      }
    }
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    document.querySelector(`.js-cart-item-container-${id}`).remove();
    updateCartQuantity();
  });
});

function updateCartQuantity() {
  const checkoutNumber = document.querySelector(".return-to-home-link");
  checkoutNumber.innerHTML = "";
  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += Number(cartItem.quantity);
  });

  checkoutNumber.innerHTML = totalQuantity;
}

document.querySelectorAll(".js-update-link").forEach((link) => {
  const id = link.dataset.productId;
  link.addEventListener("click", () => {
    const cardContainer = document.querySelector(
      `.js-cart-item-container-${id}`);
    cardContainer.classList.add("is-editing-quantity");
  });
});

const saveLink = document.querySelectorAll(".save-quantity-link");
saveLink.forEach((link)=>{
link.addEventListener('click',()=>{
    const id = link.dataset.productId;
    const newQuantity = document.querySelector(`.js-quantity-input-${id}`).value;
    console.log(newQuantity);
    if(Number(newQuantity)>0){
        for(let i =0;i<cart.length;i++){
            if(cart[i].productId===id){
                cart[i].quantity = Number(newQuantity);
                break;
            }
        }
        localStorage.setItem('cart',JSON.stringify(cart));
        updateCartQuantity();
        const quantity = document.querySelector(`.js-quantity-label-${
                      id
                    }`);
        quantity.innerHTML = Number(newQuantity);
    }
    const cardContainer = document.querySelector(      `.js-cart-item-container-${id}`);
    cardContainer.classList.remove('is-editing-quantity');
})
})

import { cart , updateDeliveryOption} from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary(){
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

  const deliveryOptionid = cartItem.deliveryOptionId;

  let deliveryOption;

  deliveryOptions.forEach((deliveryOp) => {
    if (deliveryOp.id === deliveryOptionid){
      deliveryOption = deliveryOp.deliveryDays;
    }
  });


  const today = dayjs();
  const deliveryDate = today.add(
    deliveryOption,
    'days'
  );
  const dateString = deliveryDate.format('dddd, MMMM D');

  const html = `          <div class="cart-item-container js-cart-item-container js-cart-item-container-${productId}">
            <div class="delivery-date">
              Delivery date: ${dateString}
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
                  <input class="quantity-input js-quantity-input-${
                    cartItem.productId
                  }"> <span class="save-quantity-link link-primary" data-product-id = "${
                    cartItem.productId
                  }">Save</span>
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
                ${deliveryOptionsHTML(cartItem.productId, cartItem)}
              </div>
            </div>
          </div>
`;
  checkout += html;
});

const checkoutItem = document.querySelector(".order-summary");
if(checkoutItem){
checkoutItem.innerHTML = checkout;
}
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
    renderPaymentSummary();
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
      `.js-cart-item-container-${id}`,
    );
    cardContainer.classList.add("is-editing-quantity");
  });
});

const saveLink = document.querySelectorAll(".save-quantity-link");
saveLink.forEach((link) => {
  link.addEventListener("click", () => {
    const id = link.dataset.productId;
    const newQuantity = document.querySelector(
      `.js-quantity-input-${id}`,
    ).value;
    console.log(newQuantity);
    if (Number(newQuantity) > 0) {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].productId === id) {
          cart[i].quantity = Number(newQuantity);
          break;
        }
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartQuantity();
      const quantity = document.querySelector(`.js-quantity-label-${id}`);
      quantity.innerHTML = Number(newQuantity);
    }
    const cardContainer = document.querySelector(
      `.js-cart-item-container-${id}`,
    );
    cardContainer.classList.remove("is-editing-quantity");
    renderPaymentSummary();
  });
});

function deliveryOptionsHTML(id, cartItem) {
  let html = "";

  deliveryOptions.forEach((deliveryOp) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOp.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");
    const priceString =
      deliveryOp.priceCents === 0
        ? "FREE Shipping"
        : `$${deliveryOp.priceCents / 100} - Shipping`;

    const isChecked = deliveryOp.id === cartItem.deliveryOptionId;

    html += `<div class = "delivery-option js-delivery-option" data-product-id = ${id} data-delivery-option-id = ${deliveryOp.id} >
    <input type="radio"
     ${isChecked ? "checked" : ""}
     class="delivery-option-input"
      name="delivery-option-${id}">
    <div>
      <div class="delivery-option-date">
        ${dateString}
      </div>
      <div class="delivery-option-price">
        ${priceString}
      </div>
    </div>
  </div>
    `;
  });
  return html;
}

document.querySelectorAll('.js-delivery-option').forEach((element)=>{
element.addEventListener('click',()=>{
    let productId = element.dataset.productId;
    let deliveryOptionId = element.dataset.deliveryOptionId;
    updateDeliveryOption(productId
      ,deliveryOptionId
    );
    renderOrderSummary();
    renderPaymentSummary();
})
})
}

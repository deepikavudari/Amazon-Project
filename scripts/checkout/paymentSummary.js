import { cart } from "../../data/cart.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { products } from "../../data/products.js";

export function renderPaymentSummary() {
  let totalPriceCents=0;
  let totalShippingCost = 0;
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const deliveryOptionId = cartItem.deliveryOptionId;
    let matchingDeliveryOption;
    let matchingProduct;
    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });
    deliveryOptions.forEach((deliveryOp)=>{
        if(deliveryOp.id===deliveryOptionId)
            matchingDeliveryOption = deliveryOp;
    })
    let price = Number(matchingProduct.priceCents);
    let quan = Number(cartItem.quantity);
    totalPriceCents += price*quan;
    let shippingPrice = Number(matchingDeliveryOption.priceCents);
    totalShippingCost += shippingPrice;
  });
  
  const numOfItems = document.querySelector(".return-to-home-link").innerHTML;
  const totalPrice = (totalPriceCents + totalShippingCost) / 100;
  const tax = totalPrice * 0.1;
  const orderTotal = totalPrice + tax;
  
  

    const html = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${numOfItems}):</div>
            <div class="payment-summary-money">$${totalPriceCents/100}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${totalShippingCost / 100}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${totalPrice}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${tax.toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${orderTotal.toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`

    const paymentSum = document.querySelector('.payment-summary');
    paymentSum.innerHTML = html;
}

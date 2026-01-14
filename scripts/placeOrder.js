import { orders } from "../data/orders.js";
import { products , loadProductsFetch } from "../data/products.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

console.log(orders);

async function renderPage (){
await loadProductsFetch();
const prod = products;
orders.forEach(order =>{
    const header = document.querySelector('.order-header');
    const dateStr = dayjs(order.orderTime).format('MMMM DD');
    const htmlText = `
                <div class="order-header-left-section js-${order.id}">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${dateStr}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${((order.totalCostCents) / 100).toFixed(2)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
    `;
    header.innerHTML += htmlText;
    htmlPageForProducts(prod,order.products);
})
}




function htmlPageForProducts(prod,products){
    const container = document.querySelector('.order-details-grid');
    products.forEach((product)=>{
let matchingProd;
for(let i=0;i<prod.length;i++){
    if(prod[i].id===product.productId){
        matchingProd = prod[i];
        break;
    }
}
const timeString = product.estimatedDeliveryTime;
const dayjsObj = dayjs(timeString);
const deliveryTime = dayjsObj.format('MMMM DD');
const html = `
<div class="product-image-container">
              <img src="${matchingProd.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingProd.name}
              </div>
              <div class="product-delivery-date">
                Expected Delivery Date : ${deliveryTime}
              </div>
              <div class="product-quantity">
                Quantity : ${product.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
`;
container.innerHTML += html;
})
}
renderPage();
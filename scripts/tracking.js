import { orders } from "../data/orders.js";
import { products,loadProductsFetch } from "../data/products.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

async function renderTrackingPage(){
    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('orderId');
    const prodId = url.searchParams.get('productId');
    await loadProductsFetch();
    let order;
    let matchingProduct;
    let orderInfo;
    for(let i=0;i<orders.length;i++){
        if(orderId===orders[i].id){
            order = orders[i];
            break;
        }
    }
    order.products.forEach((prod)=>{
        if(prod.productId===prodId){
            orderInfo = prod;
        }
    })
    console.log(orderInfo);
    for(let i=0;i<products.length;i++){
        if(prodId===products[i].id){
            matchingProduct = products[i];
            break;
        }
    }
    const dateString = dayjs(orderInfo.estimatedDeliveryTime).format('dddd, MMMM DD');
    const today = dayjs();
    let deliveryStatus;
    const difference = dayjs(orderInfo.estimatedDeliveryTime).diff(today,'day');
    console.log(difference);
    let text = 'Arriving on '+dateString;
    if(difference<0){
        deliveryStatus = 'delivered';
        text = 'Delivered on ' + dateString;
    }
    else if(difference >= 0 && difference < 3){
        deliveryStatus = 'shipped';
    }
    else{
        deliveryStatus = 'preparing';
    }
    
    const html = `
      <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          ${text}
        </div>

        <div class="product-info">
          ${matchingProduct.name}
        </div>

        <div class="product-info">
          Quantity: ${orderInfo.quantity}
        </div>

        <img class="product-image" src="${matchingProduct.image}">

        <div class="progress-labels-container">
          <div class="progress-label js-prep">
            Preparing
          </div>
          <div class="progress-label js-ship">
            Shipped
          </div>
          <div class="progress-label js-deliver">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>
    `;
    document.querySelector('.main').innerHTML = html;
    const progressBar = document.querySelector('.progress-bar');
    if(deliveryStatus==='delivered'){
        document.querySelector('.js-deliver').classList.add('current-status');
        progressBar.classList.add('progress-bar-delivered');
    }
    else if(deliveryStatus==='shipped'){
        document.querySelector('.js-ship').classList.add('current-status');
        progressBar.classList.add('progress-bar-shipped');

    }
    else{
        document.querySelector('.js-prep').classList.add('current-status');
        progressBar.classList.add('progress-bar-preparing');
    }
}

renderTrackingPage();
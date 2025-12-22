import {cart} from '../data/cart.js';

const productGrid = document.querySelector(".products-grid");
products.forEach((product) => {
  const html = `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button" data-product-id = "${
            product.id
          }">
            Add to Cart
          </button>
        </div>`;
  productGrid.innerHTML += html;
});

const addtoCart = document.querySelectorAll(
  ".add-to-cart-button",
);

addtoCart.forEach((btn) => {
  btn.addEventListener("click", () => {
    const productId = btn.dataset.productId;
    dispMessage(productId);
    let added = false;
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    const quan = Number(quantitySelector.value);
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === productId) {
        cart[i].quantity+=quan;
        added = true;
        break;
      }
    }
    if (!added) {
        // let index = 0;
        // for(let i=0;i<products.length;i++){
        //         if(products[i].id===productId){
        //             index = i;
        //             break;
        //         }
        // }
        cart.push({
            // productName: products[index].name,
            productId,
            quantity: quan
      });
    }

    let totalQuantity = 0;
    cart.forEach((item)=>{
        totalQuantity += item.quantity;
    })
    const cartQ = document.querySelector('.cart-quantity');
    cartQ.innerHTML = totalQuantity;
  });
});

let timeoutId;
function dispMessage(id){
    if(timeoutId)
        clearTimeout(timeoutId);
    const div = document.querySelector(`.js-added-to-cart-${id}`);
    div.classList.add('make-visible');
    timeoutId = setTimeout(()=>{
        div.classList.remove('make-visible');
    },2000);
}

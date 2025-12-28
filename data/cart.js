export const cart = JSON.parse(localStorage.getItem('cart')) || [];

let timeoutId;
function dispMessage(id) {
  if (timeoutId) clearTimeout(timeoutId);
  const div = document.querySelector(`.js-added-to-cart-${id}`);
  div.classList.add("make-visible");
  timeoutId = setTimeout(() => {
    div.classList.remove("make-visible");
  }, 2000);
}


export function addtocart(productId){
    console.log(cart);
    dispMessage(productId);
    let added = false;
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    const quan = Number(quantitySelector.value);
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].productId === productId) {
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
            quantity: quan,
            deliveryOptionId : '1'
      });
    }
        localStorage.setItem('cart',JSON.stringify(cart));
}

export function updateDeliveryOption(productId,deliveryOptionId){
  cart.forEach((cartItem)=>{
    if(cartItem.productId===productId){
      cartItem.deliveryOptionId = deliveryOptionId;
    }
  })
  localStorage.setItem("cart",JSON.stringify(cart));
}
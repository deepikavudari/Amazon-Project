function Cart(localStorageKey){
const cart = {
     cartItems : undefined,

     loadFromStorage(){
  this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
},

 timeoutId : null,
dispMessage(id) {
  if (this.timeoutId) clearTimeout(this.timeoutId);
  const div = document.querySelector(`.js-added-to-cart-${id}`);
  div.classList.add("make-visible");
  this.timeoutId = setTimeout(() => {
    div.classList.remove("make-visible");
  }, 2000);
},

  addtocart(productId){
     this.dispMessage(productId);
    let added = false;
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
     const quan = Number(quantitySelector.value);
    for (let i = 0; i < cart.length; i++) {
      if (cart.cartItems[i].productId === productId) {
        cart.cartItems[i].quantity=quan;
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
        cart.cartItems.push({
            // productName: products[index].name,
            productId,
            quantity: quan,
            deliveryOptionId : '1'
      });
    }
        localStorage.setItem(localStorageKey,JSON.stringify(cart.cartItems));
},

updateDeliveryOption(productId,deliveryOptionId){
  cart.cartItems.forEach((cartItem)=>{
    if(cartItem.productId===productId){
      cartItem.deliveryOptionId = deliveryOptionId;
    }
  })
  localStorage.setItem(localStorageKey,JSON.stringify(cart.cartItems));
}


};

return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('business-cart');

cart.loadFromStorage();
businessCart.loadFromStorage();




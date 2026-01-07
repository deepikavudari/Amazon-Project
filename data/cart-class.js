class Cart {
  cartItems;
  timeoutId;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems =
      JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  }

  dispMessage(id) {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    const div = document.querySelector(`.js-added-to-cart-${id}`);
    if (!div) return;
    div.classList.add("make-visible");
    this.timeoutId = setTimeout(() => {
      div.classList.remove("make-visible");
    }, 2000);
  }

  addtocart(productId) {
    this.dispMessage(productId);
    let added = false;
    const quantitySelector = document.querySelector(
      `.js-quantity-selector-${productId}`,
    );
    let quan;
    if (quantitySelector) {
      quan = Number(quantitySelector.value);
    } else {
      quan = 1;
    }
    for (let i = 0; i < cart.length; i++) {
      if (this.cartItems[i].productId === productId) {
        this.cartItems[i].quantity = quan;
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
      this.cartItems.push({
        // productName: products[index].name,
        productId,
        quantity: quan,
        deliveryOptionId: "1",
      });
    }
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        cartItem.deliveryOptionId = deliveryOptionId;
      }
    });
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }
}
const cart = new Cart('cart-oop');
const businessCart = new Cart('business-cart');
cart.addtocart("54e0eccd-8f36-462b-b68a-8182611d9add");

console.log(cart);
console.log(businessCart);



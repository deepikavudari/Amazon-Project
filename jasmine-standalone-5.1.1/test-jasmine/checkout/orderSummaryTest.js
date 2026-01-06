import { renderOrderSummary } from "../../../scripts/checkout/orderSummary.js";
import { cart, loadFromStorage } from "../../../data/cart.js";

describe("test suite : renderOrderSummary", () => {
  it("displays the cart", () => {
    document.querySelector(".js-test-container").innerHTML = `
        <div class = 'return-to-home-link'></div>
        <div class = 'order-summary'></div>
        `;

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 2,
          deliveryOptionId: "1",
        },
      ]);
    });


    loadFromStorage();

    renderOrderSummary();

  });

      it("checks whether the number of products in the cart is equal to two", () => {
      expect(
        document.querySelectorAll(".js-cart-item-container").length,
      ).toEqual(2);
    });
});

import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import '../data/backend-practice.js';
import { loadProductsFetch } from "../data/products.js";

async function loadPage(){
    await loadProductsFetch();
    renderOrderSummary();
    renderPaymentSummary();
};

loadPage();


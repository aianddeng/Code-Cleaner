 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(e,o)=>{for(var r in o)t.o(o,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:o[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{default:()=>u});var __awaiter=function(t,e,o,r){return new(o||(o=Promise))((function(n,a){function fulfilled(t){try{step(r.next(t))}catch(t){a(t)}}function rejected(t){try{step(r.throw(t))}catch(t){a(t)}}function step(t){var e;t.done?n(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(fulfilled,rejected)}step((r=r.apply(t,e||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:o,StoreConnectorHelpers:r,MultipageStoreConnectorWrapper:n,Helpers:a,UIHelpers:c,Cookies:l,Settings:i,AjaxMethod:s,Logger:p,$:d}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new n(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5f0e351accf44c0011711c93"]},pageSelector:".cart-items, .cart-header, .checkout-form .form-body .redeemable-label, [data-test='modal-body']",cartTotalSelector:".cart-total-value.cart-total-grandTotal > span, .cart-priceItem.optimizedCheckout-contentPrimary.cart-priceItem--total>.cart-priceItem-value>span, .cartDrawer-total .optimizedCheckout-headingPrimary",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:1e4,beforeApplyingCoupon:5e3,applyCoupon:1e4,afterApplyingCoupon:5e3}},this.functions={getCheckoutId:()=>__awaiter(this,void 0,void 0,(function*(){let t=yield a.runCodeAtPageContext("\n        callback(window.BCData);\n      ");if(!t)throw Error("ERROR: BCData not found");this.context.crsf_token=t.csrf_token+", "+t.csrf_token+", "+t.csrf_token;let e=yield a.ajax("GET",`https://${location.hostname}/api/storefront/checkout-settings`,!1,{headers:{"x-xsrf-token":this.context.crsf_token,"x-api-internal":"This API endpoint is for internal use only and may change in the future"}});this.context.checkoutId=e.response.context.checkoutId}))},this.context={checkoutId:null,crsf_token:null,total:null}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){let t=[];if(0!==d(".cart-total-label").length){if(0!=d("div.cart-total-label a").length){let t=d("div.cart-total-label a").attr("href"),e=yield a.ajax("GET","https://www.blissworld.com"+t,!1);if(e.error)throw Error(`ERROR: ${this.constructor.name}.collectAndClearAppliedCoupons() | remove coupon request error | ${e.error}`)}return t}if(yield this.functions.getCheckoutId(),0===d(".cart-header").length&&0===d("#applyRedeemableButton").length&&(yield c.simulateClick(d(".checkout-form .form-body .redeemable-label")),yield a.waitFor("#applyRedeemableButton")),0!=d(".cart-priceItem-link > a, .redeemable-info-subHeader").length){let e=d(".cart-priceItem-postFix.optimizedCheckout-contentSecondary, .redeemable-info-subHeader").text();-1==t.indexOf(e)&&t.push(e);let o=yield a.ajax("DELETE",`https://www.blissworld.com/api/storefront/checkouts/${this.context.checkoutId}/coupons/${t}?include=cart.lineItems.physicalItems.options%2Ccart.lineItems.digitalItems.options%2Ccustomer%2Ccustomer.customerGroup%2Cpayments%2Cpromotions.banners%2Cconsignments.availableShippingOptions`,!1,{headers:{"x-xsrf-token":this.context.crsf_token}});if(o.error)throw Error(`ERROR: ${this.constructor.name}.collectAndClearAppliedCoupons() | remove coupon request error | ${o.error}`);this.context.total=o.response.grandTotal,console.log(this.context.total,"after delete")}}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){if(0!==d(".cart-total-label").length)return yield r.getCartTotalBySelectorLoadPage(this.metadata.cartTotalSelector);{if(this.context.total)return this.context.total;let t=yield a.runCodeAtPageContext("\n        callback(window.BCData);\n      ");if(!t)throw Error("ERROR: BCData not found");let e=t.csrf_token+", "+t.csrf_token,o=(yield a.ajax("GET",`https://${location.hostname}/internalapi/v1/checkout/quote?includes=cart,customer`,!1,{headers:{"x-xsrf-token":e}})).response.data.cart.grandTotal.amount;return console.log(o,"get"),o}}))}beforeApplyingCoupon(){}applyCoupon(t){return __awaiter(this,void 0,void 0,(function*(){if(0!=d(".cart-total-label").length){let e=yield a.ajax("POST",`https://${location.hostname}/remote/v1/apply-code`,!1,{data:{code:t}});if(e.error)throw Error(`ERROR: ${this.constructor.name}.applyCoupon() | apply coupon request error | ${e.error}`);return{cartTotalAfterApply:yield this.getCartTotal()}}{let e=yield a.ajax("POST",`https://${location.hostname}/api/storefront/checkouts/${this.context.checkoutId}/coupons?include=cart.lineItems.physicalItems.options%2Ccart.lineItems.digitalItems.options%2Ccustomer%2Ccustomer.customerGroup%2Cpayments%2Cpromotions.banners%2Cconsignments.availableShippingOptions`,!0,{data:JSON.stringify({couponCode:t}),headers:{"x-xsrf-token":this.context.crsf_token}}),{error:o,response:r}=e;return o&&400===o.jqXHR.status?{discount:0}:(this.context.total=r.grandTotal,console.log(this.context.total,"after"),{cartTotalAfterApply:this.context.total})}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),p.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const u=window.Fatcoupon.StoreConnector})();
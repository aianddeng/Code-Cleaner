 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(o,e)=>{for(var r in e)t.o(e,r)&&!t.o(o,r)&&Object.defineProperty(o,r,{enumerable:!0,get:e[r]})},o:(t,o)=>Object.prototype.hasOwnProperty.call(t,o),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},o={};t.r(o),t.d(o,{default:()=>l});var __awaiter=function(t,o,e,r){return new(e||(e=Promise))((function(n,a){function fulfilled(t){try{step(r.next(t))}catch(t){a(t)}}function rejected(t){try{step(r.throw(t))}catch(t){a(t)}}function step(t){var o;t.done?n(t.value):(o=t.value,o instanceof e?o:new e((function(t){t(o)}))).then(fulfilled,rejected)}step((r=r.apply(t,o||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:e,StoreConnectorHelpers:r,MultipageStoreConnectorWrapper:n,Helpers:a,Logger:i,$:c}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new n(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{dev:[""],prod:["5efa57a84ac30700116c7b40"]},pageSelector:".cart__summary > .cart__totals,#couponCode:visible",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:6e3,getCartTotal:6e3,beforeApplyingCoupon:5e3,applyCoupon:6e3,afterApplyingCoupon:1e4}},this.functions={get isCheckoutPage(){return location.href.indexOf("www.jackrabbit.com/checkout")>0},get priceSelector(){return this.isCheckoutPage?".grand-total-sum":".cart__summary > .cart__totals .total-list__row strong"},getTotalPrice(){return __awaiter(this,void 0,void 0,(function*(){const t=yield a.ajax("GET",location.href);return a.parseUsdString(c(t.response).find(this.priceSelector).last().text())}))}},this.context={oldPrice:0}}collectAndClearAppliedCoupons(t=!1){return __awaiter(this,void 0,void 0,(function*(){i.log(">>>> collectAndClearAppliedCoupons");if(c(".cart-coupon__remove-action").length){const t=c(".cart-coupon__remove-action").attr("aria-controls"),o=c("#"+t+" .button--primary"),e=o.data("code"),r=o.data("uuid");yield a.ajax("GET","https://www.jackrabbit.com/on/demandware.store/Sites-jackrabbit-Site/en_US/Cart-RemoveCouponLineItem?code="+e+"&uuid="+r)}return[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){i.log(">>>> getCartTotal");const t=yield this.functions.getTotalPrice();return i.log("Cart Price:"+t),t}))}beforeApplyingCoupon(){}applyCoupon(t){return __awaiter(this,void 0,void 0,(function*(){i.log(">>>> applyCoupon");const o=c(".promo-code-form input").first().val();yield a.ajax("GET","https://www.jackrabbit.com/on/demandware.store/Sites-jackrabbit-Site/en_US/Cart-AddCoupon?csrf_token="+o+"&couponCode="+t);const e=yield this.functions.getTotalPrice();return i.log("New Price:"+e),{cartTotalAfterApply:e}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),i.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const l=window.Fatcoupon.StoreConnector})();
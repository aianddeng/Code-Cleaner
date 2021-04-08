 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(o,e)=>{for(var r in e)t.o(e,r)&&!t.o(o,r)&&Object.defineProperty(o,r,{enumerable:!0,get:e[r]})},o:(t,o)=>Object.prototype.hasOwnProperty.call(t,o),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},o={};t.r(o),t.d(o,{default:()=>s});var __awaiter=function(t,o,e,r){return new(e||(e=Promise))((function(n,a){function fulfilled(t){try{step(r.next(t))}catch(t){a(t)}}function rejected(t){try{step(r.throw(t))}catch(t){a(t)}}function step(t){var o;t.done?n(t.value):(o=t.value,o instanceof e?o:new e((function(t){t(o)}))).then(fulfilled,rejected)}step((r=r.apply(t,o||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:e,StoreConnectorHelpers:r,MultipageStoreConnectorWrapper:n,Helpers:a,UIHelpers:c,Cookies:p,Settings:d,AjaxMethod:i,Logger:l,$:u}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new n(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{dev:["5ede05bed4b7ba42a371ffd9"],prod:["5ed0b7f057659f0011be1b46"]},pageSelector:".cart-coupon-code",cartTotalSelector:".order-totals-total-price>span",redirectToPageAfterApplying:"https://gopro.com/en/us/shop/cart",timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:1e4,afterApplyingCoupon:5e3}},this.functions={getPromocodeField:()=>u("#dwfrm_cart_couponCode"),getDwcont:()=>{let t=u("#cart-items-form");if(0===t.length)throw Error("ERROR: csrfToken not found");return t.attr("action").toString().split("=")[1]}},this.context={}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){let t=this.functions.getDwcont(),o=yield a.ajax("POST","https://gopro.com/en/us/shop/cart",!1,{data:{dwcont:t,dwfrm_cart_updateCart:"dwfrm_cart_updateCart",dwfrm_cart_couponCode:"123",format:"ajax"}});if(o.error)throw Error(`ERROR: ${this.constructor.name}.collectAndClearAppliedCoupons() | remove coupon request error | ${o.error}`);return[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){return yield r.getCartTotalBySelectorLoadPage(this.metadata.cartTotalSelector)}))}beforeApplyingCoupon(){}applyCoupon(t){return __awaiter(this,void 0,void 0,(function*(){let o=this.functions.getDwcont(),e=yield a.ajax("POST","https://gopro.com/en/us/shop/cart",!1,{data:{dwcont:o,dwfrm_cart_updateCart:"dwfrm_cart_updateCart",dwfrm_cart_couponCode:t,format:"ajax"}});if(e.error)throw Error(`ERROR: ${this.constructor.name}.applyCoupon() | apply coupon request error | ${e.error}`);return{cartTotalAfterApply:yield r.getCartTotalBySelectorLoadPage(this.metadata.cartTotalSelector)}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){yield this.collectAndClearAppliedCoupons()}))}}(!1)),l.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const s=window.Fatcoupon.StoreConnector})();
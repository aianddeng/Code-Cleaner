 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(o,e)=>{for(var r in e)t.o(e,r)&&!t.o(o,r)&&Object.defineProperty(o,r,{enumerable:!0,get:e[r]})},o:(t,o)=>Object.prototype.hasOwnProperty.call(t,o),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},o={};t.r(o),t.d(o,{default:()=>l});var __awaiter=function(t,o,e,r){return new(e||(e=Promise))((function(n,c){function fulfilled(t){try{step(r.next(t))}catch(t){c(t)}}function rejected(t){try{step(r.throw(t))}catch(t){c(t)}}function step(t){var o;t.done?n(t.value):(o=t.value,o instanceof e?o:new e((function(t){t(o)}))).then(fulfilled,rejected)}step((r=r.apply(t,o||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:e,StoreConnectorHelpers:r,MultipageStoreConnectorWrapper:n,Helpers:c,UIHelpers:i,Cookies:a,Settings:d,AjaxMethod:s,Logger:p,$:u}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new n(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5e9fb709c571ab001124bf23"]},pageSelector:"#dwfrm_cart_couponCode",reloadPageAfterApplying:!1,redirectToPageAfterApplying:location.href,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:1e4,afterApplyingCoupon:1e4}},this.functions={sendRequest:(t="",o=!0)=>__awaiter(this,void 0,void 0,(function*(){const e=u("#cart-items-form"),r=c.getAllFormData(e);o?r.dwfrm_cart_coupons_i0_deleteCoupon="Remove":(r.dwfrm_cart_couponCode=t,r.dwfrm_cart_addCoupon="dwfrm_cart_addCoupon");const{error:n,response:i}=yield c.ajax(e.attr("method"),e.attr("action"),!1,{data:r});if(n)throw Error("ERROR: "+JSON.stringify(n));return t&&i?c.parseUsdString(u(".order-totals__order-discount .bfx-price",i).first().text()):0}))},this.context={cartTotal:0}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){this.context.cartTotal=0;for(const t of u(".coupon-quantity-control .remove-from-cart"))yield this.functions.sendRequest();return[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const t=this.context.cartTotal;return p.log("getCartTotal: "+t)(),t}))}beforeApplyingCoupon(){}applyCoupon(t){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=yield this.functions.sendRequest(t,!1),{cartTotalAfterApply:this.context.cartTotal}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),p.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const l=window.Fatcoupon.StoreConnector})();
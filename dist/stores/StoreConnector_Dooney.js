 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(o,e)=>{for(var n in e)t.o(e,n)&&!t.o(o,n)&&Object.defineProperty(o,n,{enumerable:!0,get:e[n]})},o:(t,o)=>Object.prototype.hasOwnProperty.call(t,o),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},o={};t.r(o),t.d(o,{default:()=>u});var __awaiter=function(t,o,e,n){return new(e||(e=Promise))((function(r,a){function fulfilled(t){try{step(n.next(t))}catch(t){a(t)}}function rejected(t){try{step(n.throw(t))}catch(t){a(t)}}function step(t){var o;t.done?r(t.value):(o=t.value,o instanceof e?o:new e((function(t){t(o)}))).then(fulfilled,rejected)}step((n=n.apply(t,o||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:e,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:a,UIHelpers:c,Cookies:i,Settings:p,AjaxMethod:d,Logger:s,$:l}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new r(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5ff2d5d434f6a1002b9e098e"]},pageSelector:"#cart-coupon-code",cartTotalSelector:".bfx-total-grandtotal",appliedCodeSelector:".coupon-code-number .cartcoupon .value",reloadPageAfterApplying:!1,redirectToPageAfterApplying:location.origin+location.pathname,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:1e4,afterApplyingCoupon:1e4}},this.functions={sendRequest:(t="",o=!0)=>__awaiter(this,void 0,void 0,(function*(){const{error:e,response:n}=yield a.ajax("POST",l("#cart-items-form").attr("action"),!1,{data:o?{dwfrm_cart_coupons_i0_deleteCoupon:"dwfrm_cart_RemoveaddCoupon"}:{dwfrm_cart_addCoupon:"dwfrm_cart_addCoupon",dwfrm_cart_couponCode:t}});if(e)throw Error("ERROR: "+JSON.stringify(e));if(!o&&t&&n)for(const o of l(this.metadata.appliedCodeSelector,n))if(l(o).text().trim().toUpperCase()===t.toUpperCase())return-Math.abs(a.parseUsdString(l(o).parents(".coupon-code-number").find(".promo-price").text()));return 0}))},this.context={cartTotal:0}}collectAndClearAppliedCoupons(){var t;return __awaiter(this,void 0,void 0,(function*(){const o=[];this.context.cartTotal=0;for(const e of l(this.metadata.appliedCodeSelector)){const n=null===(t=l(e).text())||void 0===t?void 0:t.trim();n&&!o.includes(n)&&(o.push(n),yield this.functions.sendRequest(n))}return o}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const t=this.context.cartTotal;return s.log("getCartTotal: "+t)(),t}))}beforeApplyingCoupon(){}applyCoupon(t){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=yield this.functions.sendRequest(t,!1),{cartTotalAfterApply:this.context.cartTotal}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),s.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const u=window.Fatcoupon.StoreConnector})();
 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var o={d:(t,e)=>{for(var n in e)o.o(e,n)&&!o.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},o:(o,t)=>Object.prototype.hasOwnProperty.call(o,t),r:o=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(o,"__esModule",{value:!0})}},t={};o.r(t),o.d(t,{default:()=>d});var __awaiter=function(o,t,e,n){return new(e||(e=Promise))((function(r,a){function fulfilled(o){try{step(n.next(o))}catch(o){a(o)}}function rejected(o){try{step(n.throw(o))}catch(o){a(o)}}function step(o){var t;o.done?r(o.value):(t=o.value,t instanceof e?t:new e((function(o){o(t)}))).then(fulfilled,rejected)}step((n=n.apply(o,t||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:e,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:a,UIHelpers:c,Cookies:i,Settings:p,AjaxMethod:u,Logger:s,$:l}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new r(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{dev:[""],prod:["5f6326aa2cf320001110c3ac"]},pageSelector:"[id^=coupon-code], #couponCode",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:5e3,afterApplyingCoupon:1e4}},this.functions={sendRequest:(o="FakeCoupon")=>__awaiter(this,void 0,void 0,(function*(){const{error:t,response:e}=yield a.ajax("POST",`/api/cart/${l("html").html().match(/"cartId":"(.*?)"/)[1]}/promotion`,!0,{data:JSON.stringify({promoCode:o}),headers:{"x-frg-promo":o,"x-frg-pt":"CART","x-xsrf-token":i.readDocumentCookie("xsrft")}});return e&&"FakeCoupon"!==o?-e.data.cart.summary.discountTotal.baseValue:0}))},this.context={cartTotal:0}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=0,[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const o=this.context.cartTotal;return s.log("getCartTotal: "+o)(),o}))}beforeApplyingCoupon(){}applyCoupon(o){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=yield this.functions.sendRequest(o),{cartTotalAfterApply:this.context.cartTotal||0}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),s.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const d=window.Fatcoupon.StoreConnector})();
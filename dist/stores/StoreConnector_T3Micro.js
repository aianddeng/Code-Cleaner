 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(o,e)=>{for(var n in e)t.o(e,n)&&!t.o(o,n)&&Object.defineProperty(o,n,{enumerable:!0,get:e[n]})},o:(t,o)=>Object.prototype.hasOwnProperty.call(t,o),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},o={};t.r(o),t.d(o,{default:()=>l});var __awaiter=function(t,o,e,n){return new(e||(e=Promise))((function(r,i){function fulfilled(t){try{step(n.next(t))}catch(t){i(t)}}function rejected(t){try{step(n.throw(t))}catch(t){i(t)}}function step(t){var o;t.done?r(t.value):(o=t.value,o instanceof e?o:new e((function(t){t(o)}))).then(fulfilled,rejected)}step((n=n.apply(t,o||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:e,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:i,UIHelpers:c,Cookies:a,Settings:s,AjaxMethod:u,Logger:d,$:p}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new r(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["604984a6f7d08700110be37c"]},pageSelector:"#coupon_code, #discount-code",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:1e4,afterApplyingCoupon:1e4}},this.functions={getCartData:()=>__awaiter(this,void 0,void 0,(function*(){let{error:t,response:o}=yield i.ajax("GET","/checkout/cart",!1);if(t)throw Error("ERROR: "+JSON.stringify(t));return o})),sendRequest:(t="",o=!0)=>__awaiter(this,void 0,void 0,(function*(){let{error:e,response:n}=yield i.ajax("POST","/checkout/cart/couponPost/",!1,{data:{remove:o?1:0,coupon_code:t,form_key:p("[name=form_key]").val()}});if(e)throw Error("ERROR: "+JSON.stringify(e));if(n&&!o){location.pathname.includes("cart")||(n=yield this.functions.getCartData());const o=p("#coupon_code:disabled",n).attr("value");if(o&&o.toUpperCase()===t.toUpperCase()){const t=n.match(/"code":"discount".*?"value":"(.*?)"/);if(t)return-Math.abs(i.parseUsdString(null==t?void 0:t.pop()))||0}}return 0}))},this.context={cartTotal:0}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){this.context.cartTotal=0;const t=p("#coupon_code:disabled").attr("value")||p(".discount.coupon").text().trim();return t&&(yield this.functions.sendRequest(t)),[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const t=this.context.cartTotal;return d.log("getCartTotal: "+t)(),t}))}beforeApplyingCoupon(){}applyCoupon(t){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=yield this.functions.sendRequest(t,!1),{cartTotalAfterApply:this.context.cartTotal}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),d.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const l=window.Fatcoupon.StoreConnector})();
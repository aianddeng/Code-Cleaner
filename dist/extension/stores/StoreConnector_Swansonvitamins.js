 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(o,e)=>{for(var n in e)t.o(e,n)&&!t.o(o,n)&&Object.defineProperty(o,n,{enumerable:!0,get:e[n]})},o:(t,o)=>Object.prototype.hasOwnProperty.call(t,o),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},o={};t.r(o),t.d(o,{default:()=>d});var __awaiter=function(t,o,e,n){return new(e||(e=Promise))((function(r,c){function fulfilled(t){try{step(n.next(t))}catch(t){c(t)}}function rejected(t){try{step(n.throw(t))}catch(t){c(t)}}function step(t){var o;t.done?r(t.value):(o=t.value,o instanceof e?o:new e((function(t){t(o)}))).then(fulfilled,rejected)}step((n=n.apply(t,o||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:e,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:c,UIHelpers:i,Cookies:a,Settings:p,AjaxMethod:l,Logger:s,$:u}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new r(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5f0e351accf44c0011711c90"]},pageSelector:".cart-promo-code-form, #payment-content [name=coupon]",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:1e4,afterApplyingCoupon:1e4}},this.functions={sendRequest:(t="")=>__awaiter(this,void 0,void 0,(function*(){var o;const{error:e,response:n}=yield c.ajax("POST","/cart",!1,{data:{action:"promocode",promoCode:t},headers:{"x-csrf-token":u("[name=_csrf]").attr("content")}});if(e)throw Error("ERROR: "+JSON.stringify(e));return(null===(o=null==n?void 0:n.shoppingBag)||void 0===o?void 0:o.totalRoundedCost)||0}))},this.context={cartTotal:0,cartTotalAfterApply:0}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=yield this.functions.sendRequest("INT999"),this.context.cartTotalAfterApply=0,[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const t=this.context.cartTotalAfterApply||this.context.cartTotal||0;return s.log("getCartTotal: "+t)(),t}))}beforeApplyingCoupon(){}applyCoupon(t){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotalAfterApply=yield this.functions.sendRequest(t),{cartTotalAfterApply:this.context.cartTotalAfterApply}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),s.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const d=window.Fatcoupon.StoreConnector})();
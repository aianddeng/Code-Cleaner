 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var e={d:(t,o)=>{for(var r in o)e.o(o,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:o[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{default:()=>l});var __awaiter=function(e,t,o,r){return new(o||(o=Promise))((function(n,i){function fulfilled(e){try{step(r.next(e))}catch(e){i(e)}}function rejected(e){try{step(r.throw(e))}catch(e){i(e)}}function step(e){var t;e.done?n(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(fulfilled,rejected)}step((r=r.apply(e,t||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:o,StoreConnectorHelpers:r,MultipageStoreConnectorWrapper:n,Helpers:i,UIHelpers:a,Cookies:c,Settings:s,AjaxMethod:u,Logger:p,$:d}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new n(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5f8e8e20eedd4a0015b26823"]},pageSelector:"#order-promo-code-input",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:1e4,afterApplyingCoupon:1e4}},this.functions={sendRequest:(e="",t=!0)=>__awaiter(this,void 0,void 0,(function*(){const{error:o,response:r}=yield i.ajax("POST","/store/kitchenAid-us/en_US/voucher/"+(t?"remove":"apply"),!1,{data:{voucherCode:e,CSRFToken:d("[name=CSRFToken]").first().attr("value")}});if(o)throw Error("ERROR: "+JSON.stringify(o));return!t&&r&&d(".order-summary-promo-code",r).first().text().toUpperCase().includes(e.toUpperCase())?-Math.abs(i.parseUsdString(d(".order-summary-discount-price-value",r).first().text())):0}))},this.context={cartTotal:0}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){this.context.cartTotal=0;const e=d("#form_voucher_code[value]").attr("value");return e&&(yield this.functions.sendRequest(e)),[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const e=this.context.cartTotal;return p.log("getCartTotal: "+e)(),e}))}beforeApplyingCoupon(){}applyCoupon(e){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=yield this.functions.sendRequest(e,!1),{cartTotalAfterApply:this.context.cartTotal}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),p.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const l=window.Fatcoupon.StoreConnector})();
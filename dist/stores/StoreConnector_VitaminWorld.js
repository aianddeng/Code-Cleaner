 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{default:()=>u});var __awaiter=function(e,t,o,n){return new(o||(o=Promise))((function(r,i){function fulfilled(e){try{step(n.next(e))}catch(e){i(e)}}function rejected(e){try{step(n.throw(e))}catch(e){i(e)}}function step(e){var t;e.done?r(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(fulfilled,rejected)}step((n=n.apply(e,t||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:o,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:i,UIHelpers:a,Cookies:c,Settings:l,AjaxMethod:d,Logger:p,$:s}=window.Fatcoupon.ModulesImporter;class StoreConnector_Class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5f573731bf8efc00117e8b66"]},pageSelector:"#dwfrm_cart_couponCode",cartTotalSelector:".order-value",appliedSelector:".promo-clear",discountSelector:".billing-applied value",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:5e3,afterApplyingCoupon:1e4}},this.functions={getDiscount:(e="",t="")=>__awaiter(this,void 0,void 0,(function*(){const o=s(t).find(".billing-applied");for(const n of o)if(s(n).text().includes(e))return i.parseUsdString("#dwfrm_cart_couponCode"===this.metadata.pageSelector?s(n).find(".value").text():s(t).find(".discount-order").first().text())})),sendRequest:(e="")=>__awaiter(this,void 0,void 0,(function*(){const{error:t,response:o}=yield i.ajax("POST","/on/demandware.store/Sites-vitaminworld_us-Site/default/Cart-SubmitForm",!1,{data:{dwfrm_cart_couponCode:e,[e?"dwfrm_cart_addCoupon":"dwfrm_cart_coupons_i0_deleteCoupon"]:e?"dwfrm_cart_addCoupon":"Clear",csrf_token:s("[name=csrf_token]").val()}});if(t)throw Error("ERROR: "+JSON.stringify(t));return e?yield this.functions.getDiscount(e,o):0}))},this.context={cartTotal:0}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){this.context.cartTotal=0;for(const e of s(this.metadata.appliedSelector))yield this.functions.sendRequest();return[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const e=this.context.cartTotal;return p.log("getCartTotal: "+e)(),e}))}beforeApplyingCoupon(){}applyCoupon(e){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=yield this.functions.sendRequest(e),{cartTotalAfterApply:this.context.cartTotal||0}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}window.Fatcoupon.StoreConnector=new r(new StoreConnector_Class(!1),new class extends StoreConnector_Class{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5f57378fbf8efc00117e8b6a"]},pageSelector:"#dwfrm_billing_couponCode",cartTotalSelector:".order-value",appliedSelector:".billing-applied",discountSelector:".billing-applied value",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:5e3,afterApplyingCoupon:1e4}}}}(!1)),p.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const u=window.Fatcoupon.StoreConnector})();
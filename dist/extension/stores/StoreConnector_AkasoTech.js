 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(e,o)=>{for(var n in o)t.o(o,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:o[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{default:()=>d});var __awaiter=function(t,e,o,n){return new(o||(o=Promise))((function(r,i){function fulfilled(t){try{step(n.next(t))}catch(t){i(t)}}function rejected(t){try{step(n.throw(t))}catch(t){i(t)}}function step(t){var e;t.done?r(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(fulfilled,rejected)}step((n=n.apply(t,e||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:o,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:i,UIHelpers:a,Cookies:c,Settings:l,AjaxMethod:s,Logger:p,$:u}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new r(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5f8a495891c8720011407ea2"]},pageSelector:".pay-coupon-code",appliedSelector:".pay-all-subtotal .all-subtotal-word",discountSelector:".pay-all-subtotal .all-subtotal-money",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:1e4,afterApplyingCoupon:1e4}},this.functions={getCartData:(t="")=>__awaiter(this,void 0,void 0,(function*(){let{error:e,response:o}=yield i.ajax("GET","/index.php?route=checkout/billing/total");if(e)throw Error("ERROR: "+JSON.stringify(e));if(o){o="<div>"+o+"</div>";for(const e of u(this.metadata.appliedSelector,o))if(u(e).text().toUpperCase().includes(t.toUpperCase()))return i.parseUsdString(u(e).siblings(this.metadata.discountSelector).text())}return 0})),sendRequest:(t="")=>__awaiter(this,void 0,void 0,(function*(){const{error:e,response:o}=yield i.ajax("POST","/index.php?route=extension/total/coupon/coupon",!1,{data:{coupon:t}});if(e)throw Error("ERROR: "+JSON.stringify(e));return t&&o?yield this.functions.getCartData(t):0}))},this.context={cartTotal:0}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=yield this.functions.sendRequest(),[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const t=this.context.cartTotal;return p.log("getCartTotal: "+t)(),t}))}beforeApplyingCoupon(){}applyCoupon(t){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=yield this.functions.sendRequest(t),{cartTotalAfterApply:this.context.cartTotal}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),p.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const d=window.Fatcoupon.StoreConnector})();
 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var e={d:(o,t)=>{for(var n in t)e.o(t,n)&&!e.o(o,n)&&Object.defineProperty(o,n,{enumerable:!0,get:t[n]})},o:(e,o)=>Object.prototype.hasOwnProperty.call(e,o),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},o={};e.r(o),e.d(o,{default:()=>s});var __awaiter=function(e,o,t,n){return new(t||(t=Promise))((function(r,c){function fulfilled(e){try{step(n.next(e))}catch(e){c(e)}}function rejected(e){try{step(n.throw(e))}catch(e){c(e)}}function step(e){var o;e.done?r(e.value):(o=e.value,o instanceof t?o:new t((function(e){e(o)}))).then(fulfilled,rejected)}step((n=n.apply(e,o||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:t,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:c,UIHelpers:i,Cookies:p,Settings:a,AjaxMethod:l,Logger:u,$:d}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new r(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{dev:[""],prod:["5e914430dfc61600114f4d8b"]},pageSelector:"h1.screenReadersOnly:contains(Checkout)",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:5e3,afterApplyingCoupon:1e4}},this.functions={},this.context={cartTotal:0,cartTotalAfterApply:0}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){return[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const e=this.context.cartTotalAfterApply||this.context.cartTotal;return u.log("getCartTotal: "+e)(),e}))}beforeApplyingCoupon(){}applyCoupon(e){return __awaiter(this,void 0,void 0,(function*(){return{discount:0}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),u.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const s=window.Fatcoupon.StoreConnector})();
 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{default:()=>s});var __awaiter=function(e,t,o,n){return new(o||(o=Promise))((function(r,c){function fulfilled(e){try{step(n.next(e))}catch(e){c(e)}}function rejected(e){try{step(n.throw(e))}catch(e){c(e)}}function step(e){var t;e.done?r(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(fulfilled,rejected)}step((n=n.apply(e,t||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:o,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:c,UIHelpers:i,Cookies:a,Settings:l,AjaxMethod:u,Logger:d,$:p}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new r(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{dev:["5ec5ef71b39c0c0bf38f2793"],prod:["5e9fb63ac571ab001124bf21"]},pageSelector:'[data-lulu-track="my-bag-checkout-enabled"]',cartTotalSelector:'[data-testid="estimated-total-currency"]',timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:5e3,afterApplyingCoupon:5e3}},this.functions={},this.context={}}collectAndClearAppliedCoupons(e=!1){return __awaiter(this,void 0,void 0,(function*(){return[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){return yield n.getCartTotalBySelector(this.metadata.cartTotalSelector)}))}beforeApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}applyCoupon(e){return __awaiter(this,void 0,void 0,(function*(){return{discount:0}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){yield this.collectAndClearAppliedCoupons()}))}}(!1)),d.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const s=window.Fatcoupon.StoreConnector})();
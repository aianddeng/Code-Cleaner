 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{default:()=>s});var __awaiter=function(e,t,o,n){return new(o||(o=Promise))((function(r,i){function fulfilled(e){try{step(n.next(e))}catch(e){i(e)}}function rejected(e){try{step(n.throw(e))}catch(e){i(e)}}function step(e){var t;e.done?r(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(fulfilled,rejected)}step((n=n.apply(e,t||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:o,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:i,UIHelpers:a,Cookies:c,Settings:l,AjaxMethod:d,Logger:u,$:p}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new r(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5e799dc05dbd010011bba81f","5fc469336026a8001274099d"]},pageSelector:".checkout-page__adjustments",removeCodeSelector:".checkout-page__remove-link",cartTotalSelector:".review-confirm__total, div#bundle div.review-confirm__total,  .review-confirm__secure-checkout .review-confirm__total",timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:15e3,afterApplyingCoupon:5e3}},this.functions={},this.context={}}collectAndClearAppliedCoupons(e=!1){return __awaiter(this,void 0,void 0,(function*(){for(const e of p(this.metadata.removeCodeSelector))yield a.simulateClick(p(e)),yield i.waitForDisappear(e);return[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){return yield n.getCartTotalBySelector(this.metadata.cartTotalSelector)}))}beforeApplyingCoupon(){}applyCoupon(e){return __awaiter(this,void 0,void 0,(function*(){const t=p("[name=code]");return!t.length&&p(".checkout-page__sub-heading").length&&(yield a.simulateClick(p(".checkout-page__sub-heading").last())),yield a.clearInput(t),yield i.wait(500),yield a.sendKeysTogether(e+"{enter}",t,!0),yield i.wait(500),yield a.simulateClick(t.parents("form").find("button")),(yield Promise.race([i.waitForDisappear("[name=code]").then(()=>!0),i.waitFor(".standard-form__label-error").then(()=>!1),i.wait(8e3).then(()=>!1)]))?{cartTotalAfterApply:yield this.getCartTotal()}:{discount:0}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){yield this.collectAndClearAppliedCoupons()}))}}(!1)),u.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const s=window.Fatcoupon.StoreConnector})();
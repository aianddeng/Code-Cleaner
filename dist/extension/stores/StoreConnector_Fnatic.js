 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var e={d:(t,o)=>{for(var r in o)e.o(o,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:o[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{default:()=>s});var __awaiter=function(e,t,o,r){return new(o||(o=Promise))((function(n,a){function fulfilled(e){try{step(r.next(e))}catch(e){a(e)}}function rejected(e){try{step(r.throw(e))}catch(e){a(e)}}function step(e){var t;e.done?n(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(fulfilled,rejected)}step((r=r.apply(e,t||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:o,StoreConnectorHelpers:r,MultipageStoreConnectorWrapper:n,Helpers:a,UIHelpers:l,Cookies:i,Settings:c,AjaxMethod:p,Logger:u,$:d}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new n(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{dev:[""],prod:["5ee30c6bd883e900117e3ccd"]},pageSelector:".order-summary__sections",cartTotalSelector:".payment-due__price",submitBtnSelector:".field__input-btn",removeSubmitBtnSelector:".tag__button",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:6e3,getCartTotal:6e3,beforeApplyingCoupon:6e3,applyCoupon:6e3,afterApplyingCoupon:6e3}},this.functions={},this.context={}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){let e=d(this.metadata.removeSubmitBtnSelector);if(e.length>0)for(let t=0;t<e.length;t++){let o=d(e[t]).parents("form");if(o.length>0){let e=o.attr("action"),t=a.getAllFormData(o),{error:r,response:n}=yield a.ajax("POST",e,!1,{data:t});if(r)throw Error(`ERROR: ${this.constructor.name}.applyCoupon() 1 | coupon reset request error | ${r}`)}}return[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){return yield r.getCartTotalBySelectorLoadPage(this.metadata.cartTotalSelector)}))}beforeApplyingCoupon(){}applyCoupon(e){return __awaiter(this,void 0,void 0,(function*(){let t=yield r.getCartTotalBySelector(this.metadata.cartTotalSelector),o=d(this.metadata.submitBtnSelector).parents("form");if(o.length>0){let r=o.attr("action"),n=a.getAllFormData(o);n["checkout[reduction_code]"]=e;let{error:l,response:i}=yield a.ajax("POST",r,!1,{data:n});if(l)throw Error(`ERROR: ${this.constructor.name}.applyCoupon() 1 | coupon reset request error | ${l}`);t=yield a.parseUsdString(d(i).find(this.metadata.cartTotalSelector).text())}return{cartTotalAfterApply:t}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){yield this.collectAndClearAppliedCoupons()}))}}(!1)),u.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const s=window.Fatcoupon.StoreConnector})();
 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var e={d:(t,o)=>{for(var r in o)e.o(o,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:o[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{default:()=>s});var __awaiter=function(e,t,o,r){return new(o||(o=Promise))((function(n,a){function fulfilled(e){try{step(r.next(e))}catch(e){a(e)}}function rejected(e){try{step(r.throw(e))}catch(e){a(e)}}function step(e){var t;e.done?n(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(fulfilled,rejected)}step((r=r.apply(e,t||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:o,StoreConnectorHelpers:r,MultipageStoreConnectorWrapper:n,Helpers:a,UIHelpers:c,Cookies:i,Settings:l,AjaxMethod:d,Logger:p,$:u}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new n(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{dev:["5e71e0e4e38727797d926318"],prod:["5e798b1b5dbd010011bba813"]},pageSelector:"#order-summary",removeCodeFormSelector:'[data-reduction-form="true"]',cartTotalSelector:"div#order-summary span.payment-due__price",codeInputSelector:"input#checkout_reduction_code",codeInputOpenSelector:"",removeCodeSelector:"#order-summary > div > div.order-summary__section.order-summary__section--discount > div > div > form > div > button",codeApplySelector:'[data-trekkie-id="apply_discount_button"]',codeApplyErrorSelector:"p#error-for-reduction_code",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:6e4,getCartTotal:6e4,beforeApplyingCoupon:7e3,applyCoupon:6e4,afterApplyingCoupon:5e3}},this.functions={},this.context={total:null}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){const e=u(this.metadata.removeCodeFormSelector),t=e.attr("action"),o=a.getAllFormData(e);if(!u.isEmptyObject(o)){let e=yield a.ajax("POST",t,!1,{data:o});if(e.error)throw Error(`ERROR: ${this.constructor.name}.collectAndClearAppliedCoupons() | coupon reset request error | ${e.error}`);yield a.ajax("GET",t+"?step=contact_information",!1,{data:o})}return[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){if(this.context.total)return this.context.total;let e=yield r.getCartTotalBySelectorLoadPage(this.metadata.cartTotalSelector);return console.log(e,"get"),e}))}beforeApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){try{if(0===u(this.metadata.codeInputSelector).length){yield c.simulateClick(u(this.metadata.codeInputOpenSelector))}1===u(this.metadata.codeApplyErrorSelector).length&&u(this.metadata.codeApplyErrorSelector).remove()}catch(e){throw new Error(`ERROR: ${this.constructor.name}.beforeApplyingCoupon() | codeInputElement not found on cart page`)}}))}applyCoupon(e){return __awaiter(this,void 0,void 0,(function*(){const t=u(this.metadata.codeApplySelector).closest("form"),o=t.attr("action"),r=a.getAllFormData(t);if(u.isEmptyObject(r))throw Error(`ERROR: ${this.constructor.name}.collectAndClearAppliedCoupons() | coupon form not found error`);{r["checkout[reduction_code]"]=e;let t=yield a.ajax("POST",o,!1,{data:r});yield a.ajax("GET",o+"?step=contact_information",!1,{data:r});if(t.error)throw Error(`ERROR: ${this.constructor.name}.collectAndClearAppliedCoupons() | coupon apply request error | ${t.error}`);const n=a.parseUsdString(u(t.response).find(this.metadata.cartTotalSelector).text());return this.context.total=n,console.log(n,"after"),{cartTotalAfterApply:n}}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),p.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const s=window.Fatcoupon.StoreConnector})();
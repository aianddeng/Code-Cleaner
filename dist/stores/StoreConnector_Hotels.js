 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{default:()=>p});var __awaiter=function(e,t,o,n){return new(o||(o=Promise))((function(r,i){function fulfilled(e){try{step(n.next(e))}catch(e){i(e)}}function rejected(e){try{step(n.throw(e))}catch(e){i(e)}}function step(e){var t;e.done?r(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(fulfilled,rejected)}step((n=n.apply(e,t||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:o,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:i,UIHelpers:l,Cookies:c,Settings:a,AjaxMethod:s,Logger:d,$:u}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new r(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{dev:["5e859c91a25f6b2308115815"],prod:["5e8c163482e5bf0011e5a68f"]},pageSelector:"#deals-and-discounts",cartTotalSelector:"#financial-details-total-price,#financial-details-grand-total-price",timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:2e4,afterApplyingCoupon:5e3}},this.functions={getTotal:()=>{const e=i.parseUsdString(u(this.metadata.cartTotalSelector).text());if(!e)throw Error("ERROR: totalElement not found");return e}},this.context={total:null}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){let e=[];const t=u("#coupon-code-remove-btn");return 0===t.length||(yield l.simulateClick(t),yield i.waitForDisappear(t[0]),yield i.wait(a.COUPON_APPLYING.DELAY_INSIDE_ACTION)),e}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const e=this.functions.getTotal();return this.context.total=e,e}))}beforeApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){yield l.simulateClick(u("#deals-and-discounts .widget-toggle-btn"))}))}applyCoupon(e){return __awaiter(this,void 0,void 0,(function*(){let t=u("#coupon-code-field");if(yield l.clearInput(t),yield i.wait(a.COUPON_APPLYING.DELAY_INSIDE_ACTION),yield l.sendKeys(e,t),yield i.wait(a.COUPON_APPLYING.DELAY_INSIDE_ACTION),yield l.simulateClick(u("#coupon-code-apply-btn")),yield i.wait(a.COUPON_APPLYING.DELAY_INSIDE_ACTION),console.log(u("#coupon-code-error-message").css("display")),yield Promise.race([i.waitFor("#coupon-code-remove-btn").then(()=>!0),i.waitForFilter(()=>"block"===u("#coupon-code-error-message").css("display")).then(()=>!1),i.wait(2e3).then(()=>!1)])){const e=this.functions.getTotal();return e===this.context.total?{discount:0}:{cartTotalAfterApply:e}}return{discount:0}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){yield this.collectAndClearAppliedCoupons()}))}}(!1)),d.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const p=window.Fatcoupon.StoreConnector})();
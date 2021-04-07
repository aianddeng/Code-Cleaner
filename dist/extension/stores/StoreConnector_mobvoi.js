 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var e={d:(t,o)=>{for(var r in o)e.o(o,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:o[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{default:()=>s});var __awaiter=function(e,t,o,r){return new(o||(o=Promise))((function(n,i){function fulfilled(e){try{step(r.next(e))}catch(e){i(e)}}function rejected(e){try{step(r.throw(e))}catch(e){i(e)}}function step(e){var t;e.done?n(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(fulfilled,rejected)}step((r=r.apply(e,t||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:o,StoreConnectorHelpers:r,MultipageStoreConnectorWrapper:n,Helpers:i,UIHelpers:c,Cookies:a,Settings:p,AjaxMethod:l,Logger:d,$:u}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new n(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5f0530dff7b6cd001109848e"]},pageSelector:".line.total-overview.active > .total-line.price",cartTotalSelector:".line.total-overview.active > .total-line.price",codeInputSelector:"body:has(div.co-checkout-step) .codeinput-without-login input, .input-wrapper.enter-code > input",removeCodeSelector:"a.edit-coupon-icon",codeApplySelector:"#app a.discount-btn, .enter-code .coupon-btn-bottom .apl-btn.sfBold, .coupon-applied-content:contains(applied)",codeApplyErrorSelector:"#app .err-tips._err-tips",reloadPageAfterApplying:!1,timeouts:{collectAndClearAppliedCoupons:15e3,getCartTotal:15e3,beforeApplyingCoupon:15e3,applyCoupon:15e3,afterApplyingCoupon:15e3}},this.functions={},this.context={}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){return u(this.metadata.removeCodeSelector).length>0&&(yield i.runCodeAtPageContext("callback( document.querySelector('a.edit-coupon-icon').click())")),yield i.wait(5*p.COUPON_APPLYING.DELAY_INSIDE_ACTION),[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){return yield r.getCartTotalBySelector(this.metadata.cartTotalSelector)}))}beforeApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}applyCoupon(e){return __awaiter(this,void 0,void 0,(function*(){const t=u(this.metadata.codeInputSelector);yield c.clearInput(t),yield i.wait(100),yield c.sendKeysTogether(e+"{enter}",t),yield i.wait(100),yield c.simulateClick(u(this.metadata.codeApplySelector)),yield Promise.race([i.waitFor(this.metadata.removeCodeSelector),i.waitFor("body:has(div.co-checkout-step) .codeinput-without-login input.error, .input-wrapper.enter-code > input.error"),i.waitFor("#app .err-tips._err-tips:visible"),i.wait(2500)]);return{cartTotalAfterApply:i.parseUsdString(u(this.metadata.cartTotalSelector).first().text())}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){yield this.collectAndClearAppliedCoupons()}))}}(!1)),d.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const s=window.Fatcoupon.StoreConnector})();
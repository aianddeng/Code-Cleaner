 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(e,o)=>{for(var r in o)t.o(o,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:o[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{default:()=>u});var __awaiter=function(t,e,o,r){return new(o||(o=Promise))((function(a,n){function fulfilled(t){try{step(r.next(t))}catch(t){n(t)}}function rejected(t){try{step(r.throw(t))}catch(t){n(t)}}function step(t){var e;t.done?a(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(fulfilled,rejected)}step((r=r.apply(t,e||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:o,StoreConnectorHelpers:r,MultipageStoreConnectorWrapper:a,Helpers:n,UIHelpers:i,Cookies:c,Settings:l,AjaxMethod:p,Logger:d,$:s}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new a(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5f83f0ebd8ecfd00114ec688"]},pageSelector:'[data-hook="coupon-row"]',cartTotalSelector:'[data-hook="summary-row-price"]',openSelector:'[data-hook="coupon-row"] [data-hook="enter-coupon-button"]',clearSelector:'[data-hook="coupon-row"] [data-hook="input-clear-button"]',inputSelector:'[data-hook="coupon-row"] [data-hook="coupon-input"] [data-hook="wsr-input"]',buttonSelector:'[data-hook="coupon-row"] [data-hook="apply-button"]',errorSelector:'[data-hook="coupon-row"] [data-hook="input-error-message"]',appliedSelector:'[data-hook="coupon-row"] [data-hook="remove-coupon-button"]',reloadPageAfterApplying:!1,timeouts:{collectAndClearAppliedCoupons:15e3,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:15e3,afterApplyingCoupon:1e4}},this.functions={sendRequest:(t="")=>__awaiter(this,void 0,void 0,(function*(){s(this.metadata.openSelector).length&&(yield i.simulateClick(s(this.metadata.openSelector)),yield n.waitForDisappear(this.metadata.openSelector)),s(this.metadata.clearSelector).length&&(yield i.simulateClick(s(this.metadata.clearSelector)),yield n.waitForDisappear(this.metadata.clearSelector));const e=s(this.metadata.buttonSelector),o=s(this.metadata.inputSelector);return yield i.sendKeysTogether(t+"{enter}",o,!1),yield i.simulateClick(e),yield Promise.race([n.waitFor(this.metadata.appliedSelector).then(()=>!0),n.waitFor(this.metadata.errorSelector).then(()=>!1),n.wait(5e3).then(()=>!1)]),r.getCartTotalBySelector(this.metadata.cartTotalSelector)||this.context.cartTotal||0})),removeCode:()=>__awaiter(this,void 0,void 0,(function*(){for(const t of s(this.metadata.appliedSelector))yield i.simulateClick(s(t)),yield n.waitForDisappear(t);return r.getCartTotalBySelector(this.metadata.cartTotalSelector)||this.context.cartTotal||0}))},this.context={cartTotal:0,cartTotalAfterApply:0}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=yield this.functions.removeCode(),this.context.cartTotalAfterApply=0,[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const t=this.context.cartTotalAfterApply||this.context.cartTotal;return d.log("getCartTotal: "+t)(),t}))}beforeApplyingCoupon(){}applyCoupon(t){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotalAfterApply=yield this.functions.sendRequest(t),{cartTotalAfterApply:this.context.cartTotalAfterApply}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),d.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const u=window.Fatcoupon.StoreConnector})();
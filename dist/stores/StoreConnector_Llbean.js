 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var e={d:(t,o)=>{for(var r in o)e.o(o,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:o[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{default:()=>u});var __awaiter=function(e,t,o,r){return new(o||(o=Promise))((function(n,i){function fulfilled(e){try{step(r.next(e))}catch(e){i(e)}}function rejected(e){try{step(r.throw(e))}catch(e){i(e)}}function step(e){var t;e.done?n(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(fulfilled,rejected)}step((r=r.apply(e,t||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:o,StoreConnectorHelpers:r,MultipageStoreConnectorWrapper:n,Helpers:i,UIHelpers:a,Cookies:l,Settings:c,AjaxMethod:d,Logger:p,$:s}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new n(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5e9fab4fc571ab001124bf07"]},pageSelector:'input[name="promoCodeEntry"]',cartTotalSelector:".Cart_cart-middle-right .OrderSummary_line-description:contains(Subtotal) + .OrderSummary_line-amount",codeInputSelector:'input[name="promoCodeEntry"]',codeInputOpenSelector:"",removeCodeSelector:"div.OrderPromotionsList_remove > button:visible",codeApplySelector:"button#promoRedeemButton",codeApplyErrorSelector:".OrderPromotionEntry_error-message",reloadPageAfterApplying:!1,timeouts:{collectAndClearAppliedCoupons:2e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:15e3,afterApplyingCoupon:5e3}},this.functions={},this.context={}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){for(const e of s(this.metadata.removeCodeSelector))yield a.simulateClick(s(e)),yield i.waitForDisappear(".Overlay_container");return[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const e=i.parseUsdString(s(this.metadata.cartTotalSelector).first().text());return console.log(e),e}))}beforeApplyingCoupon(){}applyCoupon(e){return __awaiter(this,void 0,void 0,(function*(){s(this.metadata.codeInputSelector).length||(yield a.simulateClick(s(this.metadata.codeInputOpenSelector)),yield i.waitFor(this.metadata.codeInputSelector));const t=s(this.metadata.codeInputSelector),o=s(this.metadata.codeApplySelector);return yield a.clearInput(t),yield i.wait(100),yield a.sendKeysTogether(e+"{enter}",t),yield i.wait(100),yield a.simulateClick(o),yield i.waitForDisappear(".Overlay_container"),yield Promise.race([i.waitFor(this.metadata.removeCodeSelector),i.waitFor(this.metadata.codeApplyErrorSelector),i.wait(6e3)]),{cartTotalAfterApply:yield this.getCartTotal()}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){yield this.collectAndClearAppliedCoupons()}))}}(!1)),p.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const u=window.Fatcoupon.StoreConnector})();
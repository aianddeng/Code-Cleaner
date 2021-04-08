 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(e,o)=>{for(var r in o)t.o(o,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:o[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{default:()=>s});var __awaiter=function(t,e,o,r){return new(o||(o=Promise))((function(n,a){function fulfilled(t){try{step(r.next(t))}catch(t){a(t)}}function rejected(t){try{step(r.throw(t))}catch(t){a(t)}}function step(t){var e;t.done?n(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(fulfilled,rejected)}step((r=r.apply(t,e||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:o,StoreConnectorHelpers:r,MultipageStoreConnectorWrapper:n,Helpers:a,UIHelpers:l,Settings:c,Logger:i,$:p}=window.Fatcoupon.ModulesImporter;class StoreConnector_Class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5e9ea24913920f0011cdfa67"]},pageSelector:"#mod-overview",cartTotalSelector:".final-amount",openSelector:".promo",inputSelector:"#promo-apply",buttonSelector:".btn.apply",loadSelector:".loader",discountSelector:".discounts .discount-amount",errorSelector:"#new-messages .error",reloadPageAfterApplying:!1,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:15e3,afterApplyingCoupon:1e4}},this.functions={},this.context={cartTotal:0,cartTotalAfterApply:0}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotalAfterApply=this.context.cartTotal=a.parseUsdString(p(this.metadata.cartTotalSelector).first().text()),[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const t=this.context.cartTotalAfterApply||this.context.cartTotal||0;return i.log("getCartTotal: "+t)(),t}))}beforeApplyingCoupon(){p("#legacy-msgs").html("")}applyCoupon(t){return __awaiter(this,void 0,void 0,(function*(){p(this.metadata.openSelector).length&&(yield l.simulateClick(p(this.metadata.openSelector)),yield a.waitFor(this.metadata.inputSelector));const e=p(this.metadata.inputSelector),o=p(this.metadata.buttonSelector);return yield l.clearInput(e),yield a.wait(100),yield l.sendKeysTogether(t+"{enter}",e),yield a.wait(100),o.removeAttr("disabled").val("Apply"),yield l.simulateClick(o),yield a.waitForDisappear(this.metadata.loadSelector),!p(this.metadata.errorSelector).length&&p(this.metadata.discountSelector).length?this.context.cartTotalAfterApply=this.context.cartTotal-Math.abs(a.parseUsdString(p(this.metadata.discountSelector).first().text())):this.context.cartTotalAfterApply=a.parseUsdString(p(this.metadata.cartTotalSelector).first().text()),{cartTotalAfterApply:this.context.cartTotalAfterApply}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}window.Fatcoupon.StoreConnector=new n(new StoreConnector_Class(!1),new class extends StoreConnector_Class{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5e9ea24913920f0011cdfa67"]},pageSelector:".is-mobile .promo-code",cartTotalSelector:".total-price",openSelector:".promo-code-link",inputSelector:"#promo-code-input",buttonSelector:"#save-promo-code",loadSelector:".spinner-container",discountSelector:"[data-bhw=discount] .right-content .sub-title",errorSelector:"[data-bhw=PromoCodeError]",reloadPageAfterApplying:!1,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:15e3,afterApplyingCoupon:1e4}}}}(!1)),i.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const s=window.Fatcoupon.StoreConnector})();
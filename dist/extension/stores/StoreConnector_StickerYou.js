 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(e,o)=>{for(var n in o)t.o(o,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:o[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{default:()=>d});var __awaiter=function(t,e,o,n){return new(o||(o=Promise))((function(r,l){function fulfilled(t){try{step(n.next(t))}catch(t){l(t)}}function rejected(t){try{step(n.throw(t))}catch(t){l(t)}}function step(t){var e;t.done?r(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(fulfilled,rejected)}step((n=n.apply(t,e||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:o,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:l,Logger:i,Cookies:a,UIHelpers:c,Settings:p,$:s}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new r(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5efa57a84ac30700116c7b43"]},pageSelector:"#promo-text:visible",cartTotalSelector:".order-details__total span:last-child strong",discountSelector:".full-width > li:last-child .order-details__value",codeInputSelector:"#promo-text",applyCouponSuccessSelector:".promo-message.promo-success:visible",applyCouponErrorSelector:".promo-message.promo-error:visible",showCodeInputBtnSelector:"",applyCodeBtnBtnSelector:"#promo-apply",appliedCouponRemoveBtnSelector:"",timeouts:{collectAndClearAppliedCoupons:15e3,getCartTotal:15e3,beforeApplyingCoupon:15e3,applyCoupon:15e3,afterApplyingCoupon:15e3}},this.functions={getAppliedCouponText:t=>t.innerText},this.context={total:null}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){return[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){return this.context.total||(this.context.total=yield n.getCartTotalBySelector(this.metadata.cartTotalSelector),console.log(this.context.total,"get")),this.context.total}))}beforeApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){yield c.clearInput(this.metadata.codeInputSelector)}))}applyCoupon(t){return __awaiter(this,void 0,void 0,(function*(){let e=s(this.metadata.codeInputSelector);e.focus(),yield c.sendKeysTogether(t+"{enter}",e,!1),yield l.wait(2*p.COUPON_APPLYING.DELAY_INSIDE_ACTION);let o=s(this.metadata.applyCodeBtnBtnSelector);if(yield c.simulateClick(o),yield Promise.race([l.waitFor(this.metadata.applyCouponSuccessSelector).then(()=>!0),l.waitFor(this.metadata.applyCouponErrorSelector).then(()=>!1)])){let t=yield n.getCartTotalBySelector(this.metadata.discountSelector);return console.log(t,"discount"),this.context.total=this.context.total-t,console.log(this.context.total,"after"),{cartTotalAfterApply:this.context.total}}return{discount:0}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){yield this.collectAndClearAppliedCoupons()}))}}(!1)),i.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const d=window.Fatcoupon.StoreConnector})();
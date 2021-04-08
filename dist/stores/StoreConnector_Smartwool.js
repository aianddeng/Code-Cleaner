 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(e,o)=>{for(var r in o)t.o(o,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:o[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{default:()=>u});var __awaiter=function(t,e,o,r){return new(o||(o=Promise))((function(n,i){function fulfilled(t){try{step(r.next(t))}catch(t){i(t)}}function rejected(t){try{step(r.throw(t))}catch(t){i(t)}}function step(t){var e;t.done?n(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(fulfilled,rejected)}step((r=r.apply(t,e||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:o,StoreConnectorHelpers:r,MultipageStoreConnectorWrapper:n,Helpers:i,UIHelpers:a,Cookies:c,Settings:s,AjaxMethod:d,Logger:l,$:p}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new n(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5ef16d7df627230011e687f2"]},pageSelector:".promo-code-form",appliedSelector:".checkout-action-remove-promo",discountSelector:".checkout-gift-card",reloadPageAfterApplying:!1,redirectToPageAfterApplying:location.href,timeouts:{collectAndClearAppliedCoupons:2e4,getCartTotal:2e4,beforeApplyingCoupon:2e4,applyCoupon:2e4,afterApplyingCoupon:2e4}},this.functions={getCartData:(t="")=>__awaiter(this,void 0,void 0,(function*(){var e,o,r;const{error:n,response:a}=yield i.ajax("GET",p(".topnav-cart a").first().attr("href")||p("#checkout-summary-item-table a.leave-alert-exclude-js").attr("href")||"/shop/VFCheckoutSummaryDetailRefreshView"),{error:c,response:s}=yield i.ajax("GET",p(".topnav-cart a",a).first().attr("href"));if(c)throw Error("ERROR: "+JSON.stringify(c));return this.context.code=p(this.metadata.appliedSelector,s).first().attr("data-promocode"),this.context.code&&t&&this.context.code.toUpperCase()===t.toUpperCase()&&-(null===(r=null===(o=null===(e=p(this.metadata.discountSelector,s))||void 0===e?void 0:e.text())||void 0===o?void 0:o.match(/(\d+\.\d+)/))||void 0===r?void 0:r.pop())||0})),sendRequest:(t="",e=!0)=>__awaiter(this,void 0,void 0,(function*(){const o=i.getAllFormData("[id^=PromotionCodeForm]:eq(0)");o.promoCode=t,o.taskType=e?"R":"A";const{error:r}=yield i.ajax("POST","/shop/VFAjaxPromotionCodeManage",!1,{data:o});if(r)throw Error("ERROR: "+JSON.stringify(r));return yield this.functions.getCartData(t)}))},this.context={cartTotal:0,code:null}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=0,this.context.code=null,yield this.functions.getCartData(),yield this.afterApplyingCoupon(),[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const t=this.context.cartTotal;return l.log("getCartTotal: "+t)(),t}))}beforeApplyingCoupon(){}applyCoupon(t){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=yield this.functions.sendRequest(t,!1),{cartTotalAfterApply:this.context.cartTotal}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){this.context.code&&(yield this.functions.sendRequest(this.context.code)),this.context.code=null}))}}(!1)),l.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const u=window.Fatcoupon.StoreConnector})();
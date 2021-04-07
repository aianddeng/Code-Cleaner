 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(e,o)=>{for(var r in o)t.o(o,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:o[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{default:()=>l});var __awaiter=function(t,e,o,r){return new(o||(o=Promise))((function(n,c){function fulfilled(t){try{step(r.next(t))}catch(t){c(t)}}function rejected(t){try{step(r.throw(t))}catch(t){c(t)}}function step(t){var e;t.done?n(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(fulfilled,rejected)}step((r=r.apply(t,e||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:o,StoreConnectorHelpers:r,MultipageStoreConnectorWrapper:n,Helpers:c,Logger:a,$:i}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new n(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{dev:["5ed62962007f670c0ea4cce8"],prod:["5ed0b7f057659f0011be1b37"]},pageSelector:"#checkout_reduction_code",cartTotalSelector:".total-line-table__footer .payment-due__price",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:1e4,afterApplyingCoupon:5e3}},this.functions={},this.context={cartTotal:null,cartTotalAfterApply:null}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){let t=[];this.context.cartTotal=yield r.getCartTotalBySelector(this.metadata.cartTotalSelector),this.context.cartTotalAfterApply=0;let e=i(".tags-list .tag");for(const o of e){const e=i(o).find(".reduction-code__text").text().trim();t.includes(e)||t.push(e)}for(const e of t){const t=c.getAllFormData(i(".edit_checkout:has(.reduction-code__text)"));let e=yield c.ajax("POST",i(".edit_checkout:has(.reduction-code__text)").attr("action"),!1,{data:t});this.context.cartTotal=c.parseUsdString(i(e.response).find(this.metadata.cartTotalSelector).first().text())}return t}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const t=this.context.cartTotalAfterApply||this.context.cartTotal;return a.log("getCartTotal: "+t)(),t}))}beforeApplyingCoupon(){}applyCoupon(t){return __awaiter(this,void 0,void 0,(function*(){let e=0;const o=c.getAllFormData(i(".edit_checkout:has(#checkout_reduction_code)"));o["checkout[reduction_code]"]=t;let r=yield c.ajax("POST",`https://${location.host}${i(".edit_checkout:has(#checkout_reduction_code)").attr("action")}`,!1,{data:o});if(r.error)throw Error(`ERROR: ${this.constructor.name}.applyCoupon() | coupon apply request error | ${r.error}`);return r.response?(this.context.cartTotalAfterApply=e=c.parseUsdString(i(r.response).find(this.metadata.cartTotalSelector).first().text()),{cartTotalAfterApply:e}):{discount:0}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),a.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const l=window.Fatcoupon.StoreConnector})();
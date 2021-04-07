 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var e={d:(o,t)=>{for(var r in t)e.o(t,r)&&!e.o(o,r)&&Object.defineProperty(o,r,{enumerable:!0,get:t[r]})},o:(e,o)=>Object.prototype.hasOwnProperty.call(e,o),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},o={};e.r(o),e.d(o,{default:()=>u});var __awaiter=function(e,o,t,r){return new(t||(t=Promise))((function(n,c){function fulfilled(e){try{step(r.next(e))}catch(e){c(e)}}function rejected(e){try{step(r.throw(e))}catch(e){c(e)}}function step(e){var o;e.done?n(e.value):(o=e.value,o instanceof t?o:new t((function(e){e(o)}))).then(fulfilled,rejected)}step((r=r.apply(e,o||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:t,StoreConnectorHelpers:r,MultipageStoreConnectorWrapper:n,Helpers:c,UIHelpers:i,Cookies:l,Settings:a,AjaxMethod:d,Logger:p,$:s}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new n(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5f0530dff7b6cd00110984a7"]},pageSelector:".order-summary__section--discount",cartTotalSelector:".payment-due__price",codeInputSelector:"#checkout_reduction_code",codeApplySelector:"[data-trekkie-id='apply_discount_button']",codeApplyErrorSelector:"#error-for-reduction_code",codeRemoveSelector:"#checkout_clear_discount",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:3e4,getCartTotal:3e4,beforeApplyingCoupon:5e3,applyCoupon:3e4,afterApplyingCoupon:3e4}},this.functions={getCodeRemoveForm:()=>{let e=s(this.metadata.codeRemoveSelector);return 0===e.length?null:s(e).closest("form")},getCodeApplyForm:()=>{let e=s(this.metadata.codeApplySelector);if(0===e.length)throw Error("ERROR: getCodeApplyForm not found");return s(e).closest("form")},getFormAction:e=>0===e.length?{}:{action:e.attr("action")||"bad-action",method:e.attr("method")||"bad-method"}},this.context={}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){let e=[];const o=this.functions.getCodeRemoveForm();if(!o)return e;const{action:t,method:r}=this.functions.getFormAction(o),n=c.getAllFormData(o);n["checkout[clear_discount]"]=1;let i=yield c.ajax("POST",t,!1,{data:n}),{error:l,response:a}=i;if(l)throw Error(`ERROR: ${this.constructor.name}.collectAndClearAppliedCoupons() | coupon apply request error | ${l}`);return e}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){let e=yield c.ajax("GET",""+location.href,!1),{error:o,response:t}=e;if(o)throw Error(`ERROR: ${this.constructor.name}.collectAndClearAppliedCoupons() | coupon apply request error | ${o}`);let r=+c.parseUsdString(s(t).find(this.metadata.cartTotalSelector).text());return console.log(r,"get"),r}))}beforeApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}applyCoupon(e){return __awaiter(this,void 0,void 0,(function*(){let o,t;const r=this.functions.getCodeApplyForm(),{method:n,action:i}=this.functions.getFormAction(r),l=c.getAllFormData(r);l["checkout[reduction_code]"]=e,t=yield c.ajax("POST",i,!1,{data:l});const{error:a,response:d}=t;if(a)throw Error(`ERROR: ${this.constructor.name}.collectAndClearAppliedCoupons() | coupon apply request error | ${a}`);return o=+c.parseUsdString(s(d).find(this.metadata.cartTotalSelector).text()),console.log(o,"after"),{cartTotalAfterApply:o}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),p.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const u=window.Fatcoupon.StoreConnector})();
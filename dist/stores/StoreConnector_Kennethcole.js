 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var e={d:(t,o)=>{for(var r in o)e.o(o,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:o[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{default:()=>u});var __awaiter=function(e,t,o,r){return new(o||(o=Promise))((function(n,a){function fulfilled(e){try{step(r.next(e))}catch(e){a(e)}}function rejected(e){try{step(r.throw(e))}catch(e){a(e)}}function step(e){var t;e.done?n(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(fulfilled,rejected)}step((r=r.apply(e,t||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:o,StoreConnectorHelpers:r,MultipageStoreConnectorWrapper:n,Helpers:a,UIHelpers:i,Cookies:c,Settings:d,AjaxMethod:l,Logger:p,$:s}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new n(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{dev:["5e86a54a4dcff925b4105714"],prod:["5e8c1a2082e5bf0011e5a692"]},pageSelector:"div.cart-container > h1",cartTotalSelector:"div.cart-totals > div.row.grand-total > div.col-4 > div",codeInputSelector:"input#couponCode",codeApplySelector:'form[name="promo-code-form"] > div > div.input-group > div > button[type="submit"]',removeCodeSelector:"div.col-lg-7.cart-leftcol > div.coupons-and-promos > div.coupon-price-adjustment.applied > div > a",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:1e4,beforeApplyingCoupon:1e4,applyCoupon:1e4,afterApplyingCoupon:1e4}},this.functions={getToken:()=>{let e=s('[name="csrf_token"]');if(0===e.length)throw Error("ERROR: jElement not found");return e.attr("value")},getRemoveCodeData:()=>{let e=s(this.metadata.removeCodeSelector);return 0===e.length?{}:{code:e.attr("data-code"),uuid:e.attr("data-uuid")}},getRemoveCodeAction:()=>"https://www.kennethcole.com/on/demandware.store/Sites-kennethcole-Site/default/Cart-RemoveCouponLineItem",getCodeApplyForm:()=>{let e=s(this.metadata.codeApplySelector);if(0===e.length)throw Error("ERROR: jElement not found");return s(e).closest("form")},getCodeApplyFormAction:e=>0===e.length?{}:{action:e.attr("action")||"bad-action",method:e.attr("method")||"bad-method"}},this.context={}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){let e=[];const t=this.functions.getRemoveCodeData(),o=this.functions.getRemoveCodeAction();if(!s.isEmptyObject(t)){const{code:r,uuid:n}=t;e.push(r);let i=yield a.ajax("GET",o,!1,{data:Object.assign(Object.assign({},t),{isCheckout:!1})});if(i.error)throw Error(`ERROR: ${this.constructor.name}.collectAndClearAppliedCoupons() | coupon reset request error | ${i.error}`)}return e}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){return yield r.getCartTotalBySelectorLoadPage(this.metadata.cartTotalSelector)}))}beforeApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}applyCoupon(e){return __awaiter(this,void 0,void 0,(function*(){const t=this.functions.getCodeApplyForm(),{action:o,method:r}=this.functions.getCodeApplyFormAction(t),n=a.getAllFormData(t);n.couponCode=e,n.csrf_token=this.functions.getToken();let i=yield a.ajax("GET",o,!1,{data:n});if(i.error)throw Error(`ERROR: ${this.constructor.name}.applycode() | coupon apply request error | ${i.error}`);if(!s.isEmptyObject(i.response)&&!i.response.error){const{totals:{grandTotal:e}}=i.response;return{cartTotalAfterApply:a.parseUsdString(e)}}return{discount:0}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),p.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const u=window.Fatcoupon.StoreConnector})();
 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(o,e)=>{for(var r in e)t.o(e,r)&&!t.o(o,r)&&Object.defineProperty(o,r,{enumerable:!0,get:e[r]})},o:(t,o)=>Object.prototype.hasOwnProperty.call(t,o),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},o={};t.r(o),t.d(o,{default:()=>d});var __awaiter=function(t,o,e,r){return new(e||(e=Promise))((function(n,c){function fulfilled(t){try{step(r.next(t))}catch(t){c(t)}}function rejected(t){try{step(r.throw(t))}catch(t){c(t)}}function step(t){var o;t.done?n(t.value):(o=t.value,o instanceof e?o:new e((function(t){t(o)}))).then(fulfilled,rejected)}step((r=r.apply(t,o||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:e,StoreConnectorHelpers:r,MultipageStoreConnectorWrapper:n,Helpers:c,UIHelpers:a,Cookies:i,Settings:s,AjaxMethod:u,Logger:l,$:p}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new n(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{dev:["5ebd0536c87fb14435de5c2f"],prod:["5e9ea96c13920f0011cdfa77"]},pageSelector:"#discount-coupon-form",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:5e3,afterApplyingCoupon:5e3}},this.functions={getRetrieveCartTotals:()=>__awaiter(this,void 0,void 0,(function*(){let t=yield c.ajax("GET",`https://${location.host}/checkout/cart/retrieveCartTotals`,!0);if(t.error)throw Error(`ERROR: ${this.constructor.name}.getRetrieveCartTotals() | cannot fetch basket data | ${t.error}`);return t.response}))},this.context={}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){let t=[],o=yield c.ajax("GET",`https://${location.host}/checkout/cart/retrieveCartCoupons`,!0);if(o.error)throw Error(`ERROR: ${this.constructor.name}.getRetrieveCartTotals() | cannot fetch basket data | ${o.error}`);if(0===o.response.length)return t;for(const e of o.response){t.push(e.code);let o=yield c.ajax("POST",`https://${location.host}/amcoupons/checkout/cancelCoupon`,!0,{data:JSON.stringify({async:!0,amcoupon_code_cancel:e.code})});if(o.error)throw Error(`ERROR: ${this.constructor.name}.collectAndClearAppliedCoupons() | coupon clear request error | ${o.error}`)}return t}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const t=yield this.functions.getRetrieveCartTotals();if(!t.grandtotal)throw Error(`ERROR: ${this.constructor.name}.getCartTotal() | get total error`);return t.grandtotal}))}beforeApplyingCoupon(){}applyCoupon(t){return __awaiter(this,void 0,void 0,(function*(){let o=yield c.ajax("POST",`https://${location.host}/checkout/cart/couponPost`,!0,{data:JSON.stringify({async:!0,coupon_code:t})});if(o.error)throw Error(`ERROR: ${this.constructor.name}.applyCoupon() | coupon apply request error | ${o.error}`);if(o.response.success){const t=yield this.functions.getRetrieveCartTotals();return t.grandtotal?{cartTotalAfterApply:t.grandtotal}:{discount:0}}return{discount:0}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),l.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const d=window.Fatcoupon.StoreConnector})();
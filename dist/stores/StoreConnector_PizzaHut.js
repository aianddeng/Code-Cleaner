 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var e={d:(o,t)=>{for(var n in t)e.o(t,n)&&!e.o(o,n)&&Object.defineProperty(o,n,{enumerable:!0,get:t[n]})},o:(e,o)=>Object.prototype.hasOwnProperty.call(e,o),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},o={};e.r(o),e.d(o,{default:()=>u});var __awaiter=function(e,o,t,n){return new(t||(t=Promise))((function(r,a){function fulfilled(e){try{step(n.next(e))}catch(e){a(e)}}function rejected(e){try{step(n.throw(e))}catch(e){a(e)}}function step(e){var o;e.done?r(e.value):(o=e.value,o instanceof t?o:new t((function(e){e(o)}))).then(fulfilled,rejected)}step((n=n.apply(e,o||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:t,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:a,UIHelpers:p,Cookies:i,Settings:c,AjaxMethod:s,Logger:l,$:d}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new r(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{dev:["5f3ccd406f46b84de9e982d9"],prod:["5f3c9a458863980016d7a7c2"]},pageSelector:".order-summary-custom .my-order",cartTotalSelector:".total-summary-line-item",pageName:"/order",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:15e3,beforeApplyingCoupon:6e3,applyCoupon:3e4,afterApplyingCoupon:1e4},codeFormKeySelector:'#discount-coupon-form [name="form_key"]',couponMessageError:'[data-ui-id="message-error"]'},this.functions={},this.context={}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){let e=yield a.ajax("POST",`https://${document.location.host}/api.php/site/api_ajax/order/removeItem`,!0,{headers:{"content-type":"application/json;charset=UTF-8",accept:"application/json, text/plain, */*"},data:JSON.stringify({item:"C0"})});if(e.error)throw Error(`ERROR: ${this.constructor.name}.collectAndClearAppliedCoupons() | remove coupon request error | ${e.error}`);return[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){let e=yield a.ajax("POST",`https://${document.location.host}/api.php/site/api_pages/api_order_summary/getSummaryData`,!0,{headers:{"content-type":"application/json;charset=UTF-8",accept:"application/json, text/plain, */*"}});if(e.error)throw Error(`ERROR: ${this.constructor.name}.applyCoupon() | cannot fetch basket data | ${e.error}`);let o=a.parseUsdString(e.response.summary_info.total);return console.log(o),o}))}beforeApplyingCoupon(){}applyCoupon(e){return __awaiter(this,void 0,void 0,(function*(){let o=null,t=yield a.ajax("POST",`https://${document.location.host}/api.php/site/api_ajax/coupons/checkCouponCode`,!0,{headers:{"content-type":"application/json;charset=UTF-8",accept:"application/json, text/plain, */*"},data:JSON.stringify({code:e,loyalty:"N",user_guid:""})});if(t.response&&t.response.errMsg)return{discount:0};if(o=yield a.ajax("POST",`https://${document.location.host}/api.php/site/api_ajax/coupons/applyCouponCode`,!0,{headers:{"content-type":"application/json;charset=UTF-8",accept:"application/json, text/plain, */*"},data:JSON.stringify({code:e,loyalty:"N"})}),1!==o.response.success)return{discount:0};let n=yield this.getCartTotal();return console.log(n),{cartTotalAfterApply:n}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){yield this.collectAndClearAppliedCoupons()}))}}(!1)),l.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const u=window.Fatcoupon.StoreConnector})();
 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var e={d:(t,o)=>{for(var r in o)e.o(o,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:o[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{default:()=>u});var __awaiter=function(e,t,o,r){return new(o||(o=Promise))((function(n,a){function fulfilled(e){try{step(r.next(e))}catch(e){a(e)}}function rejected(e){try{step(r.throw(e))}catch(e){a(e)}}function step(e){var t;e.done?n(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(fulfilled,rejected)}step((r=r.apply(e,t||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:o,StoreConnectorHelpers:r,MultipageStoreConnectorWrapper:n,Helpers:a,UIHelpers:i,Cookies:d,Settings:c,AjaxMethod:l,Logger:p,$:s}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new n(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{dev:["5ede230fd4b7ba42a371ffe1"],prod:["5ed0b7f057659f0011be1b4d"]},pageSelector:"#add-promo-code-label-id",cartTotalSelector:".order-value",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:1e4,afterApplyingCoupon:5e3}},this.functions={getPromocodeField:()=>s("#dwfrm_cart_couponCode")},this.context={total:null}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){let e=[],t=s(".cartcoupon>span>strong");if(0===t.length)return e;for(let o of t){let t=s(o).text(),r=yield a.ajax("POST","https://www.mattressfirm.com/on/demandware.store/Sites-Mattress-Firm-Site/default/Cart-SubmitForm?format=ajax",!1,{data:{dwfrm_cart_coupons_i0_deleteCoupon:"true",dwfrm_cart_updateCart:"dwfrm_cart_updateCart"}});if(r.error)throw Error(`ERROR: ${this.constructor.name}.collectAndClearAppliedCoupons() | remove coupon request error | ${r.error}`);-1==e.indexOf(t)&&e.push(t)}return e}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const e=yield r.getCartTotalBySelectorLoadPage(this.metadata.cartTotalSelector);return this.context.total=e,e}))}beforeApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){let e=this.functions.getPromocodeField();e.is(":visible")||(yield i.simulateClick(s("#add-promo-code-label-id"))),yield i.clearInput(e)}))}applyCoupon(e){return __awaiter(this,void 0,void 0,(function*(){let t=yield a.ajax("POST","https://www.mattressfirm.com/on/demandware.store/Sites-Mattress-Firm-Site/default/Cart-SubmitForm?format=ajax",!1,{data:{dwfrm_cart_addCoupon:"true",dwfrm_cart_updateCart:"dwfrm_cart_updateCart",dwfrm_cart_couponCode:e}});if(t.error)throw Error(`ERROR: ${this.constructor.name}.applyCoupon() | apply coupon request error | ${t.error}`);if("string"==typeof t.response){const e=s(t.response).find(this.metadata.cartTotalSelector),o=a.parseUsdString(e[0].innerText);return o>=this.context.total?{discount:0}:{cartTotalAfterApply:o}}return{discount:0}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){yield this.collectAndClearAppliedCoupons()}))}}(!1)),p.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const u=window.Fatcoupon.StoreConnector})();
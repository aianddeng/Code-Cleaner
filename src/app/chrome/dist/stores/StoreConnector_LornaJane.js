 /**************************
 * Time: 04.06.21 14:37:35 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(o,e)=>{for(var n in e)t.o(e,n)&&!t.o(o,n)&&Object.defineProperty(o,n,{enumerable:!0,get:e[n]})},o:(t,o)=>Object.prototype.hasOwnProperty.call(t,o),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},o={};t.r(o),t.d(o,{default:()=>u});var __awaiter=function(t,o,e,n){return new(e||(e=Promise))((function(r,a){function fulfilled(t){try{step(n.next(t))}catch(t){a(t)}}function rejected(t){try{step(n.throw(t))}catch(t){a(t)}}function step(t){var o;t.done?r(t.value):(o=t.value,o instanceof e?o:new e((function(t){t(o)}))).then(fulfilled,rejected)}step((n=n.apply(t,o||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:e,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:a,UIHelpers:i,Cookies:c,Settings:s,AjaxMethod:d,Logger:l,$:p}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new r(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5f0530dff7b6cd00110984a2"]},pageSelector:"#couponCode",appliedSelector:"[data-code][data-uuid]",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:1e4,afterApplyingCoupon:1e4},couponsCloaking:[{type:"text",selector:".coupon-code"}]},this.functions={removeCode:(t="",o="")=>__awaiter(this,void 0,void 0,(function*(){const{error:e,response:n}=yield a.ajax("GET","/on/demandware.store/Sites-LJUS-Site/en_US/Cart-RemoveCouponLineItem",!1,{data:{code:t,uuid:o}});return a.parseUsdString(n.totals.grandTotal)||this.context.cartTotal||0})),sendRequest:(t="")=>__awaiter(this,void 0,void 0,(function*(){var o,e;const{error:n,response:r}=yield a.ajax("GET","/on/demandware.store/Sites-LJUS-Site/en_US/Cart-AddCoupon",!1,{data:{csrf_token:p("[name=csrf_token]").first().val(),couponCode:t}});if(t&&(null===(e=null===(o=null==r?void 0:r.totals)||void 0===o?void 0:o.discounts)||void 0===e?void 0:e.length)){this.context.applied=r.totals.discounts.map(t=>({UUID:t.UUID,couponCode:t.couponCode}));for(const o of r.totals.discounts)if(o.couponCode.toUpperCase()===t.toUpperCase())return a.parseUsdString(r.totals.grandTotal)||this.context.cartTotal||0}return this.context.cartTotal||0}))},this.context={applied:[],cartTotal:0,cartTotalAfterApply:0}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){const t=[];for(const o of p("[data-uuid][data-code]")){const e=p(o).attr("data-code"),n=p(o).attr("data-uuid");t.includes(e)||(t.push(e),this.context.cartTotal=yield this.functions.removeCode(e,n))}return this.context.cartTotal=this.context.cartTotal||a.parseUsdString(p(".value .grand-total").first().text()),this.context.cartTotalAfterApply=0,t}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const t=this.context.cartTotalAfterApply||this.context.cartTotal;return l.log("getCartTotal: "+t)(),t}))}beforeApplyingCoupon(){}applyCoupon(t){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotalAfterApply=yield this.functions.sendRequest(t),{cartTotalAfterApply:this.context.cartTotalAfterApply}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){for(const t of this.context.applied)yield this.functions.removeCode(t.couponCode,t.UUID);this.context.applied.length=0}))}}(!1)),l.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const u=window.Fatcoupon.StoreConnector})();
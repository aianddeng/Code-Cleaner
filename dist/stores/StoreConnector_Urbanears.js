 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var o={d:(t,e)=>{for(var n in e)o.o(e,n)&&!o.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},o:(o,t)=>Object.prototype.hasOwnProperty.call(o,t),r:o=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(o,"__esModule",{value:!0})}},t={};o.r(t),o.d(t,{default:()=>p});var __awaiter=function(o,t,e,n){return new(e||(e=Promise))((function(r,i){function fulfilled(o){try{step(n.next(o))}catch(o){i(o)}}function rejected(o){try{step(n.throw(o))}catch(o){i(o)}}function step(o){var t;o.done?r(o.value):(t=o.value,t instanceof e?t:new e((function(o){o(t)}))).then(fulfilled,rejected)}step((n=n.apply(o,t||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:e,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:i,UIHelpers:a,Cookies:c,Settings:d,AjaxMethod:s,Logger:u,$:l}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new r(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5efa57a84ac30700116c7b3e"]},pageSelector:"#cart-state-container[aria-hidden=false] .cart__coupon-codes",reloadPageAfterApplying:!1,redirectToPageAfterApplying:location.href,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:1e4,afterApplyingCoupon:1e4}},this.functions={removeCode:(o="",t="")=>__awaiter(this,void 0,void 0,(function*(){return yield i.ajax("GET","/on/demandware.store/Sites-Urbanears-US-Site/en_US/Cart-RemoveCouponLineItem",!1,{data:{code:o,uuid:t}}),!0})),sendRequest:(o="")=>__awaiter(this,void 0,void 0,(function*(){var t,e,n,r;const{error:a,response:c}=yield i.ajax("GET","/on/demandware.store/Sites-Urbanears-US-Site/en_US/Cart-AddCoupon",!1,{data:{csrf_token:l("[name=csrf_token]").first().val(),couponCode:o}});if(a)throw Error("ERROR: "+JSON.stringify(a));if(o&&(null===(e=null===(t=null==c?void 0:c.totals)||void 0===t?void 0:t.discounts)||void 0===e?void 0:e.length))for(const t of c.totals.discounts)if(t.couponCode.toUpperCase()===o.toUpperCase())return-(null===(r=null===(n=null==c?void 0:c.totals)||void 0===n?void 0:n.totalDiscounts)||void 0===r?void 0:r.value)||0;return 0}))},this.context={cartTotal:0}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){const o=[];this.context.cartTotal=0;for(const t of l("[data-uuid][data-code]")){const e=l(t).attr("data-code"),n=l(t).attr("data-uuid");o.includes(e)||(o.push(e),yield this.functions.removeCode(e,n))}return o}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const o=this.context.cartTotal;return u.log("getCartTotal: "+o)(),o}))}beforeApplyingCoupon(){}applyCoupon(o){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=yield this.functions.sendRequest(o),{cartTotalAfterApply:this.context.cartTotal}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),u.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const p=window.Fatcoupon.StoreConnector})();
 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var e={d:(t,o)=>{for(var r in o)e.o(o,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:o[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{default:()=>u});var __awaiter=function(e,t,o,r){return new(o||(o=Promise))((function(n,a){function fulfilled(e){try{step(r.next(e))}catch(e){a(e)}}function rejected(e){try{step(r.throw(e))}catch(e){a(e)}}function step(e){var t;e.done?n(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(fulfilled,rejected)}step((r=r.apply(e,t||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:o,StoreConnectorHelpers:r,MultipageStoreConnectorWrapper:n,Helpers:a,UIHelpers:c,Cookies:i,Settings:s,AjaxMethod:p,Logger:l,$:d}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new n(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5e82f7fbbd820800116c6624"]},pageSelector:"#dwfrm_cart_couponCode, #dwfrm_billing_couponCode",cartTotalSelectorOld:".item-price .price-total, .item-price .strikethrough",removeCodeSelector:"[value=Remove][name*=cart_coupon], .remove-coupon",reloadPageAfterApplying:!1,redirectToPageAfterApplying:location.href.replace("step-2","step-1"),timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:15e3,afterApplyingCoupon:1e4}},this.functions={getDiscount:(e=0)=>__awaiter(this,void 0,void 0,(function*(){const{error:t,response:o}=yield a.ajax("GET","/cart/");if(t)throw Error("ERROR: "+JSON.stringify(t));if(o){let t=0;for(const e of d(this.metadata.cartTotalSelectorOld,o))t+=a.parseUsdString(d(e).text());return e-t}}))},this.context={cartTotal:0,code:null}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){const e=[];for(const t of d(this.metadata.removeCodeSelector)){const o=d(t).attr("data-code")||d(t).prev().text().trim();o&&!e.includes(o)&&(e.push(o),yield a.ajax("GET","/on/demandware.store/Sites-keen_us-Site/en_US/Cart-RemoveCouponJson",!1,{data:{couponCode:o,format:"ajax"}}))}return this.context.cartTotal=0,e}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const e=this.context.cartTotal;return l.log("getCartTotal: "+e)(),e}))}beforeApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}applyCoupon(e){return __awaiter(this,void 0,void 0,(function*(){let{error:t,response:o}=yield a.ajax("GET","/on/demandware.store/Sites-keen_us-Site/en_US/Cart-AddCouponJson",!1,{data:{couponCode:e,format:"ajax"}});if(t)throw Error(`ERROR: ${this.constructor.name}.applycode() | coupon apply request error | ${t}`);return o&&o.success?(this.context.cartTotal=yield this.functions.getDiscount(o.baskettotal),{cartTotalAfterApply:this.context.cartTotal}):{discount:0}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),l.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const u=window.Fatcoupon.StoreConnector})();
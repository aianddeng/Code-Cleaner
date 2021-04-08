 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(o,e)=>{for(var n in e)t.o(e,n)&&!t.o(o,n)&&Object.defineProperty(o,n,{enumerable:!0,get:e[n]})},o:(t,o)=>Object.prototype.hasOwnProperty.call(t,o),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},o={};t.r(o),t.d(o,{default:()=>d});var __awaiter=function(t,o,e,n){return new(e||(e=Promise))((function(r,c){function fulfilled(t){try{step(n.next(t))}catch(t){c(t)}}function rejected(t){try{step(n.throw(t))}catch(t){c(t)}}function step(t){var o;t.done?r(t.value):(o=t.value,o instanceof e?o:new e((function(t){t(o)}))).then(fulfilled,rejected)}step((n=n.apply(t,o||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:e,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:c,UIHelpers:a,Cookies:i,Settings:s,AjaxMethod:p,Logger:l,$:u}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new r(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{dev:["5eb36564afcc2a77dbf2187a"],prod:["5e9e9d1313920f0011cdfa5d"]},pageSelector:"#cart-items-form",cartTotalSelector:".order-total",couponAppliedNumber:2,reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:15e3,getCartTotal:7e3,beforeApplyingCoupon:5e3,applyCoupon:15e3,afterApplyingCoupon:15e3}},this.functions={stackingCalc:t=>{if(t<this.context.total){if(this.context.totalAfterApply&&t>=this.context.totalAfterApply)return this.context.couponsArr.push("dwfrm_cart_coupons_i1_deleteCoupon"),{discount:0};this.context.stackNum++,this.context.totalAfterApply=t,console.log(t,`after ${this.context.stackNum} apply`)}else this.context.stackNum>0?this.context.couponsArr.push("dwfrm_cart_coupons_i1_deleteCoupon"):this.context.couponsArr.push("dwfrm_cart_coupons_i0_deleteCoupon");return this.context.stackNum===this.metadata.couponAppliedNumber?(this.context.total=this.context.totalAfterApply,{cartTotalAfterApply:this.context.total}):{discount:0}}},this.context={total:null,totalAfterApply:null,couponsArr:[],stackNum:0}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){let t=[],o=u(".promotions-coupons .cart-row-coupon");if(0===o.length)return t;for(const e of o){const o=u(e).find(".cartcoupon .value").text().trim().split("\n")[0];t.push(o);const n=c.getAllFormData(u("#cart-items-form"));n.dwfrm_cart_couponCode="",n.dwfrm_cart_coupons_i0_deleteCoupon="Remove",yield c.ajax("POST",u("#cart-items-form").attr("action"),!1,{"content-type":"application/x-www-form-urlencoded; charset=UTF-8",data:n})}return t}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){return this.context.total||(this.context.total=yield n.getCartTotalBySelectorLoadPage(this.metadata.cartTotalSelector),console.log(this.context.total,"get")),this.context.total}))}beforeApplyingCoupon(){}applyCoupon(t){return __awaiter(this,void 0,void 0,(function*(){if("FatCoupon"===t)return this.context.total=this.context.totalAfterApply,console.log(this.context.total||0,`after ${this.context.stackNum} apply`),this.context.total?{cartTotalAfterApply:this.context.total}:{discount:0};const o=c.getAllFormData(u("#cart-items-form"));o.dwfrm_cart_couponCode=t,o.dwfrm_cart_addCoupon="dwfrm_cart_addCoupon";let{error:e,response:n}=yield c.ajax("POST",u("#cart-items-form").attr("action"),!1,{data:o,contentType:"application/x-www-form-urlencoded"});if(e)throw Error(`ERROR: ${this.constructor.name}.applyCoupon() | coupon apply request error | ${e}`);if("string"==typeof n){const t=u(n).find(this.metadata.cartTotalSelector),o=c.parseUsdString(t[0].innerText);return yield c.wait(2*s.COUPON_APPLYING.DELAY_INSIDE_ACTION),this.functions.stackingCalc(o)}return{discount:0}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){if(this.context.couponsArr.length){for(const t of this.context.couponsArr){const o={dwfrm_cart_couponCode:""};o[t]="Remove",yield c.ajax("POST",u("#cart-items-form").attr("action"),!1,{"content-type":"application/x-www-form-urlencoded; charset=UTF-8",data:o})}this.context.couponsArr.length=0}}))}}(!1)),l.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const d=window.Fatcoupon.StoreConnector})();
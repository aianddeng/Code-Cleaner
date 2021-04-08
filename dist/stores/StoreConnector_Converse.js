 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(o,e)=>{for(var r in e)t.o(e,r)&&!t.o(o,r)&&Object.defineProperty(o,r,{enumerable:!0,get:e[r]})},o:(t,o)=>Object.prototype.hasOwnProperty.call(t,o),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},o={};t.r(o),t.d(o,{default:()=>d});var __awaiter=function(t,o,e,r){return new(e||(e=Promise))((function(n,a){function fulfilled(t){try{step(r.next(t))}catch(t){a(t)}}function rejected(t){try{step(r.throw(t))}catch(t){a(t)}}function step(t){var o;t.done?n(t.value):(o=t.value,o instanceof e?o:new e((function(t){t(o)}))).then(fulfilled,rejected)}step((r=r.apply(t,o||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:e,StoreConnectorHelpers:r,MultipageStoreConnectorWrapper:n,Helpers:a,UIHelpers:c,Cookies:l,Settings:s,AjaxMethod:i,Logger:p,$:u}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new n(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{dev:["5e98192b2747202d833ae02d"],prod:["5e90101497ae8d00118d9486"]},pageSelector:"[id$=cart_couponCode]",cartTotalSelector:"div#secondary span.value--highlight, div.order-totals__highlight span.value--highlight",cartSubTotalSelector:"div.subtotal span.value",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:15e3,getCartTotal:1e4,beforeApplyingCoupon:5e3,applyCoupon:1e4,afterApplyingCoupon:5e3}},this.functions={},this.context={cartTotal:null,cartTotalAfterApply:null,stackNum:0}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){let t,o=[];if(!u("#remove-coupon:visible").length)return o;const e=a.substringBetween(u("html").html(),"coupon_codes","order_coupon_discount").replace(/[\n\s["':/\]//]/g,"").split(",");e.splice(-1,1);for(let o of e)t=yield a.ajax("GET","https://www.converse.com/on/demandware.store/Sites-ConverseUS-Site/default/Cart-RemoveCouponJson",!1,{data:{couponCode:o,format:"ajax",reload:!1}}),yield a.wait(5*s.COUPON_APPLYING.DELAY_INSIDE_ACTION);const{error:r,response:n}=t;if(r)throw Error(`ERROR: ${this.constructor.name}.collectAndClearAppliedCoupons() | remove coupon request error | ${t.error}`);const{success:c,couponData:{totals:{total:l,subtotal:i,discount:p}}}=n;return this.context.cartTotal=a.parseUsdString(i),console.log(this.context.cartTotal,"after delete"),o}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){if(this.context.cartTotal)return this.context.cartTotal;let t=yield r.getCartTotalBySelector(this.metadata.cartSubTotalSelector);return this.context.cartTotal=t,console.log(t,"get"),t}))}beforeApplyingCoupon(){}applyCoupon(t){return __awaiter(this,void 0,void 0,(function*(){let o=yield a.ajax("GET","https://www.converse.com/on/demandware.store/Sites-ConverseUS-Site/default/Cart-AddCouponJson",!1,{data:{couponCode:t,format:"ajax",reload:!1}});const{error:e,response:r}=o;if(e)throw Error(`ERROR: ${this.constructor.name}.applyCoupon() | apply coupon request error | ${e}`);const{success:n,couponData:{totals:{total:c,subtotal:l,discount:i}}}=r;return this.context.cartTotalAfterApply=a.parseUsdString(l)+a.parseUsdString(i),console.log(this.context.cartTotalAfterApply,"after"),this.context.cartTotalAfterApply<this.context.cartTotal&&(this.context.stackNum++,yield a.wait(5*s.COUPON_APPLYING.DELAY_INSIDE_ACTION)),"FatCoupon"===t||2===this.context.stackNum?(this.context.stackNum=0,this.context.cartTotal=this.context.cartTotalAfterApply,{cartTotalAfterApply:this.context.cartTotal}):{discount:0}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),p.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const d=window.Fatcoupon.StoreConnector})();
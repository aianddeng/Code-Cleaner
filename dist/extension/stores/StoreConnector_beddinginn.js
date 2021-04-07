 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var o={d:(t,e)=>{for(var n in e)o.o(e,n)&&!o.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},o:(o,t)=>Object.prototype.hasOwnProperty.call(o,t),r:o=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(o,"__esModule",{value:!0})}},t={};o.r(t),o.d(t,{default:()=>d});var __awaiter=function(o,t,e,n){return new(e||(e=Promise))((function(r,i){function fulfilled(o){try{step(n.next(o))}catch(o){i(o)}}function rejected(o){try{step(n.throw(o))}catch(o){i(o)}}function step(o){var t;o.done?r(o.value):(t=o.value,t instanceof e?t:new e((function(o){o(t)}))).then(fulfilled,rejected)}step((n=n.apply(o,t||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:e,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:i,UIHelpers:a,Cookies:c,Settings:s,AjaxMethod:l,Logger:p,$:u}=window.Fatcoupon.ModulesImporter;class StoreConnector_Class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5f0214668df73400113770b1"]},pageSelector:"#divCoupon:visible, .cart-coupon:visible",reloadPageAfterApplying:!1,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:5e3,afterApplyingCoupon:1e4}},this.functions={getTotalDiscount(){return __awaiter(this,void 0,void 0,(function*(){const o=new URL(location.origin+"/ajax/ShopCartHandler.ashx");o.searchParams.set("action","GetActiveResult"),o.searchParams.set("cultureName","en");let{error:t,response:e}=yield i.ajax("GET",o.href);if(t)throw Error("ERROR: "+JSON.stringify(t));return e=JSON.parse(e),(null==e?void 0:e.CouponMoney)?(console.log(-Math.abs(+e.CouponMoney)),-Math.abs(+e.CouponMoney)):0}))},setDocumentCookie(o,t,e=30){var n="";if(e){var r=new Date;r.setTime(r.getTime()+24*e*60*60*1e3),n="; expires="+r.toUTCString()}document.cookie=o+"="+(t||"")+n+"; path=/; domain=.beddinginn.com;"}},this.context={cartTotal:null}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=0,[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const o=this.context.cartTotal;return p.log("getCartTotal: "+o)(),o}))}beforeApplyingCoupon(){}applyCoupon(o){return __awaiter(this,void 0,void 0,(function*(){return this.functions.setDocumentCookie("CouponCode",o,30),i.runCodeAtPageContext("ShopCart.getActiveResult()"),yield i.wait(250),this.context.cartTotal=yield this.functions.getTotalDiscount(),{cartTotalAfterApply:this.context.cartTotal}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}window.Fatcoupon.StoreConnector=new r(new StoreConnector_Class(!1),new class extends StoreConnector_Class{constructor(){super(...arguments),this.metadata={storeIds:{dev:[""],prod:["5f0214668df73400113770b1"]},pageSelector:"#pSelectCouponTip",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:5e3,afterApplyingCoupon:1e4}}}applyCoupon(o){return __awaiter(this,void 0,void 0,(function*(){return this.functions.setDocumentCookie("CouponCode",o,30),this.context.cartTotal=yield this.functions.getTotalDiscount(),{cartTotalAfterApply:this.context.cartTotal}}))}}(!1)),p.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const d=window.Fatcoupon.StoreConnector})();
 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var e={d:(o,t)=>{for(var r in t)e.o(t,r)&&!e.o(o,r)&&Object.defineProperty(o,r,{enumerable:!0,get:t[r]})},o:(e,o)=>Object.prototype.hasOwnProperty.call(e,o),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},o={};e.r(o),e.d(o,{default:()=>d});var __awaiter=function(e,o,t,r){return new(t||(t=Promise))((function(n,c){function fulfilled(e){try{step(r.next(e))}catch(e){c(e)}}function rejected(e){try{step(r.throw(e))}catch(e){c(e)}}function step(e){var o;e.done?n(e.value):(o=e.value,o instanceof t?o:new t((function(e){e(o)}))).then(fulfilled,rejected)}step((r=r.apply(e,o||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:t,StoreConnectorHelpers:r,MultipageStoreConnectorWrapper:n,Helpers:c,UIHelpers:a,Cookies:i,Settings:s,AjaxMethod:p,Logger:u,$:l}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new n(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5e784ede44864100113213ff"]},pageSelector:"#bagPageWrapper",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:5e3,afterApplyingCoupon:5e3},couponsCloaking:[{type:"text",selector:".promo-applied-description"},{type:"text",selector:".itemPrices .PROMOTION_SAVE"}]},this.functions={getCurrencyCode:()=>{let e=l("header");return e.length>0?JSON.parse(e.attr("data-context")).currencyCode:"USD"},getBagId:()=>{let e=i.readDocumentCookie("macys_bagguid");if(!e)throw Error("ERROR: bagId not found");return e}},this.context={cartTotal:0}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){let e=yield c.ajax("PUT",`https://www.macys.com/my-bag/${this.functions.getBagId()}/promo?currencyCode=${this.functions.getCurrencyCode()}&promoCode=NON_EXISTING_CODE`,!0);if(e.error)throw Error(`ERROR: ${this.constructor.name}.collectAndClearAppliedCoupons() | reset coupon request error | ${e.error}`);return this.context.cartTotal=0,[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const e=this.context.cartTotal;return u.log("getCartTotal: "+e)(),e}))}beforeApplyingCoupon(){}applyCoupon(e){var o,t;return __awaiter(this,void 0,void 0,(function*(){let r=yield c.ajax("PUT",`https://www.macys.com/my-bag/${this.functions.getBagId()}/promo?currencyCode=${this.functions.getCurrencyCode()}&promoCode=${e}`,!0);if(r.error)throw Error(`ERROR: ${this.constructor.name}.applyCoupon() | cannot fetch basket data | ${r.error}`);for(let n of r.response.bag.sections.bagPromotions.manual)if(n.identifier.code.toUpperCase()===e.toUpperCase()&&(this.context.cartTotal=0,null===(t=null===(o=null==n?void 0:n.discount)||void 0===o?void 0:o.values)||void 0===t?void 0:t.length)){for(const e of n.discount.values)this.context.cartTotal-=e.value||0;return{cartTotalAfterApply:this.context.cartTotal}}return{discount:0}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),u.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const d=window.Fatcoupon.StoreConnector})();
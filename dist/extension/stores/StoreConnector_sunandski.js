 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var e={d:(o,t)=>{for(var n in t)e.o(t,n)&&!e.o(o,n)&&Object.defineProperty(o,n,{enumerable:!0,get:t[n]})},o:(e,o)=>Object.prototype.hasOwnProperty.call(e,o),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},o={};e.r(o),e.d(o,{default:()=>s});var __awaiter=function(e,o,t,n){return new(t||(t=Promise))((function(r,c){function fulfilled(e){try{step(n.next(e))}catch(e){c(e)}}function rejected(e){try{step(n.throw(e))}catch(e){c(e)}}function step(e){var o;e.done?r(e.value):(o=e.value,o instanceof t?o:new t((function(e){e(o)}))).then(fulfilled,rejected)}step((n=n.apply(e,o||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:t,MultipageStoreConnectorWrapper:n,Helpers:r,Logger:c,$:i}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new n(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{dev:[""],prod:["5ef16d7df627230011e68807"]},pageSelector:"#mz-carttable-total,#scrollSummary",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:25e3,getCartTotal:25e3,beforeApplyingCoupon:5e3,applyCoupon:25e3,afterApplyingCoupon:25e3}},this.functions={priceSelector:"#mz-carttable-total",get isInCheckoutPage(){return location.href.indexOf("checkout")>0},get cartId(){let e="";if(this.isInCheckoutPage){const o=location.href.split("/");e=o[o.length-1]}else e=i("#cartform input").first().val();return e},getTotalPrice(){return __awaiter(this,void 0,void 0,(function*(){return(yield r.ajax("GET","https://www.sunandski.com/api/commerce/carts/current")).response.discountedTotal}))}},this.context={oldPrice:0}}collectAndClearAppliedCoupons(e=!1){return __awaiter(this,void 0,void 0,(function*(){c.log(">>>> collectAndClearAppliedCoupons");const e=this.functions.cartId,o=yield r.ajax("GET",`https://${location.host}/api/commerce/carts/current`),t=this.functions.isInCheckoutPage?"orders":"carts";return o.response.couponCodes&&o.response.couponCodes.length&&(yield r.ajax("DELETE",`https://www.sunandski.com/api/commerce/${t}/${e}/coupons/${o.response.couponCodes[0]}`)),[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){c.log(">>>> getCartTotal");const e=yield this.functions.getTotalPrice();return c.log("Cart Price:"+e),e}))}beforeApplyingCoupon(){}applyCoupon(e){return __awaiter(this,void 0,void 0,(function*(){c.log(">>>> applyCoupon");const o=this.functions.cartId,t=this.functions.isInCheckoutPage?"orders":"carts";yield r.ajax("PUT",`https://www.sunandski.com/api/commerce/${t}/${o}/coupons/${e}`);const n=yield this.functions.getTotalPrice();return c.log("New Price:"+n),{cartTotalAfterApply:n}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),c.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const s=window.Fatcoupon.StoreConnector})();
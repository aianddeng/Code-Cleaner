 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(e,o)=>{for(var n in o)t.o(o,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:o[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{default:()=>p});var __awaiter=function(t,e,o,n){return new(o||(o=Promise))((function(r,i){function fulfilled(t){try{step(n.next(t))}catch(t){i(t)}}function rejected(t){try{step(n.throw(t))}catch(t){i(t)}}function step(t){var e;t.done?r(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(fulfilled,rejected)}step((n=n.apply(t,e||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:o,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:i,UIHelpers:a,Cookies:c,Settings:s,AjaxMethod:d,Logger:u,$:l}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new r(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5f8a88f2f414e8001117e76f"]},pageSelector:"input[id$='couponCode']",appliedSelector:".coupon .remove",discountSelector:".discount .order-subtotal-value",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:1e4,afterApplyingCoupon:5e3}},this.functions={getCartData:()=>__awaiter(this,void 0,void 0,(function*(){const{error:t,response:e}=yield i.ajax("GET","/us/basket?format=ajax");if(t)throw Error("ERROR: "+JSON.stringify(t));return e?+l(".order-value",e).attr("data-order-total"):this.context.cartTotal||0})),sendRequest:(t="",e=!0)=>__awaiter(this,void 0,void 0,(function*(){const{error:o,response:n}=yield i.ajax("GET","/on/demandware.store/Sites-SB-US-Site/en_US/"+(e?"COShipping-RemoveAppliedCoupon":"Cart-AddCouponJson"),!1,{data:{couponCode:t,format:"ajax"}});if(o)throw Error("ERROR: "+JSON.stringify(o));return!e&&(null==n?void 0:n.success)?(this.context.code=t,yield this.functions.getCartData()):this.context.cartTotal||0}))},this.context={cartTotal:0,cartTotalAfterApply:0,code:null}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){const t=[];for(const e of l(this.metadata.appliedSelector)){const o=new URL(l(e).attr("href")).searchParams.get("couponCode");o&&!t.includes(o)&&(t.push(o),yield this.functions.sendRequest(o))}return this.context.cartTotal=yield this.functions.getCartData(),t}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const t=this.context.cartTotal;return u.log("getCartTotal: "+t)(),t}))}beforeApplyingCoupon(){}applyCoupon(t){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=yield this.functions.sendRequest(t,!1),{cartTotalAfterApply:this.context.cartTotal}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){this.context.code&&(yield this.functions.sendRequest(this.context.code)),this.context.code=null}))}}(!1)),u.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const p=window.Fatcoupon.StoreConnector})();
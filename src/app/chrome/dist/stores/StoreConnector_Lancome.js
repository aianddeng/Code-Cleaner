 /**************************
 * Time: 15.04.21 18:08:26 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(o,e)=>{for(var n in e)t.o(e,n)&&!t.o(o,n)&&Object.defineProperty(o,n,{enumerable:!0,get:e[n]})},o:(t,o)=>Object.prototype.hasOwnProperty.call(t,o),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},o={};t.r(o),t.d(o,{default:()=>d});var __awaiter=function(t,o,e,n){return new(e||(e=Promise))((function(r,c){function fulfilled(t){try{step(n.next(t))}catch(t){c(t)}}function rejected(t){try{step(n.throw(t))}catch(t){c(t)}}function step(t){var o;t.done?r(t.value):(o=t.value,o instanceof e?o:new e((function(t){t(o)}))).then(fulfilled,rejected)}step((n=n.apply(t,o||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:e,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:c,UIHelpers:i,Cookies:a,Settings:s,AjaxMethod:p,Logger:u,$:l}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new r(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5e9fac24c571ab001124bf09"]},pageSelector:".c-cart-coupon__form",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:1e4,afterApplyingCoupon:1e4}},this.functions={sendRequest:(t="",o=!0)=>__awaiter(this,void 0,void 0,(function*(){var e;const{error:n,response:r}=yield c.ajax("POST","/on/demandware.store/Sites-lancome-us-Site/en_US/Cart-Submit?ajax=true",!1,{data:o?{["coupon_remove_"+t]:t}:{couponcode:t,form_id:"coupon",apply:""}});if(n)throw Error("ERROR: "+JSON.stringify(n));if(!o&&r){const t=[];for(const o of l(".c-cart-coupon__form .c-cart-coupon__list-item",r))this.context.applied.push(l(o).find(".c-cart-coupon__list-remove").attr("value")),t.push(null===(e=l(o).find(".c-cart-coupon__list-message").text().match(/\$(\d{1,3},?)+(\.\d{2})?/g))||void 0===e?void 0:e.pop());return-Math.abs(t.filter(Boolean).map(c.parseUsdString).filter(Boolean).map(Math.abs).concat(0).reduce((t,o)=>t+o))}return 0}))},this.context={cartTotal:0,applied:[]}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){this.context.cartTotal=0;for(const t of l(".c-cart-coupon__form .c-cart-coupon__list-item")){const o=l(t).find(".c-cart-coupon__list-remove").attr("value");o&&(yield this.functions.sendRequest(o))}return[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const t=this.context.cartTotal;return u.log("getCartTotal: "+t)(),t}))}beforeApplyingCoupon(){}applyCoupon(t){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=yield this.functions.sendRequest(t,!1),{cartTotalAfterApply:this.context.cartTotal}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){for(const t of this.context.applied)yield this.functions.sendRequest(t);this.context.applied.length=0}))}}(!1)),u.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const d=window.Fatcoupon.StoreConnector})();
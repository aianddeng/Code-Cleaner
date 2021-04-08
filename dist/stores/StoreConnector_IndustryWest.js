 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var o={d:(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o:(o,e)=>Object.prototype.hasOwnProperty.call(o,e),r:o=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(o,"__esModule",{value:!0})}},e={};o.r(e),o.d(e,{default:()=>l});var __awaiter=function(o,e,t,n){return new(t||(t=Promise))((function(r,c){function fulfilled(o){try{step(n.next(o))}catch(o){c(o)}}function rejected(o){try{step(n.throw(o))}catch(o){c(o)}}function step(o){var e;o.done?r(o.value):(e=o.value,e instanceof t?e:new t((function(o){o(e)}))).then(fulfilled,rejected)}step((n=n.apply(o,e||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:t,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:c,UIHelpers:i,Cookies:a,Settings:p,AjaxMethod:u,Logger:s,$:d}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new r(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5f0530dff7b6cd00110984a0"]},pageSelector:"#coupon_code, #discount-code",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:1e4,afterApplyingCoupon:1e4}},this.functions={sendRequest:(o="",e=!0)=>__awaiter(this,void 0,void 0,(function*(){var t;const{error:n,response:r}=yield c.ajax("POST","/checkout/cart/couponPost/",!1,{data:{remove:e?1:0,coupon_code:o,form_key:d("[name=form_key]").val()}});if(n)throw Error("ERROR: "+JSON.stringify(n));return r&&!e&&d("#coupon_code",r).attr("value").toUpperCase()===o.toUpperCase()&&-Math.abs(c.parseUsdString(null===(t=r.match(/"code":"discount"[^\{\}]+?"value":"(.*?)"/))||void 0===t?void 0:t.pop()))||0}))},this.context={cartTotal:0}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){this.context.cartTotal=0;const o=d("#remove-coupon + div #coupon_code").val();return o&&(yield this.functions.sendRequest(o)),[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const o=this.context.cartTotal;return s.log("getCartTotal: "+o)(),o}))}beforeApplyingCoupon(){}applyCoupon(o){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=yield this.functions.sendRequest(o,!1),{cartTotalAfterApply:this.context.cartTotal}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),s.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const l=window.Fatcoupon.StoreConnector})();
 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var o={d:(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o:(o,e)=>Object.prototype.hasOwnProperty.call(o,e),r:o=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(o,"__esModule",{value:!0})}},e={};o.r(e),o.d(e,{default:()=>s});var __awaiter=function(o,e,t,n){return new(t||(t=Promise))((function(r,c){function fulfilled(o){try{step(n.next(o))}catch(o){c(o)}}function rejected(o){try{step(n.throw(o))}catch(o){c(o)}}function step(o){var e;o.done?r(o.value):(e=o.value,e instanceof t?e:new t((function(o){o(e)}))).then(fulfilled,rejected)}step((n=n.apply(o,e||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:t,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:c,UIHelpers:i,Cookies:a,Settings:u,AjaxMethod:p,Logger:d,$:l}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new r(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["6019fdef9bbbfc0011ed4953"]},pageSelector:"#coupon_code, #discount-code",appliedSelector:"#coupon_code, #discount-code",removeSelector:"#discount-coupon-form .action.cancel[value=Remove], #discount-form .action.cancel[value=Cancel]",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:1e4,afterApplyingCoupon:1e4}},this.functions={sendRequest:(o="")=>__awaiter(this,void 0,void 0,(function*(){var e,t,n;const{error:r,response:i}=yield c.ajax("POST","/checkout/cart/couponPost/",!1,{data:{remove:o?0:"1",coupon_code:o}});if(r)throw Error("ERROR: "+JSON.stringify(r));if(o&&i){const r=l(this.metadata.appliedSelector,i).val()||(null===(e=i.match(/"coupon_code":"(.*?)",/))||void 0===e?void 0:e.pop());if(r&&r.toUpperCase()===o.toUpperCase())return-Math.abs(c.parseUsdString((null===(t=i.match(/"discount_amount":"(?:-)(.*?)"/))||void 0===t?void 0:t.pop())||(null===(n=i.match(/"discount_amount":(?:-)(.*?),/))||void 0===n?void 0:n.pop())))}return 0}))},this.context={cartTotal:0}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){return l(this.metadata.removeSelector).length&&(yield this.functions.sendRequest()),[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const o=this.context.cartTotal;return d.log("getCartTotal: "+o)(),o}))}beforeApplyingCoupon(){}applyCoupon(o){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=yield this.functions.sendRequest(o),{cartTotalAfterApply:this.context.cartTotal}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),d.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const s=window.Fatcoupon.StoreConnector})();
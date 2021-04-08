 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(o,e)=>{for(var n in e)t.o(e,n)&&!t.o(o,n)&&Object.defineProperty(o,n,{enumerable:!0,get:e[n]})},o:(t,o)=>Object.prototype.hasOwnProperty.call(t,o),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},o={};t.r(o),t.d(o,{default:()=>p});var __awaiter=function(t,o,e,n){return new(e||(e=Promise))((function(r,c){function fulfilled(t){try{step(n.next(t))}catch(t){c(t)}}function rejected(t){try{step(n.throw(t))}catch(t){c(t)}}function step(t){var o;t.done?r(t.value):(o=t.value,o instanceof e?o:new e((function(t){t(o)}))).then(fulfilled,rejected)}step((n=n.apply(t,o||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:e,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:c,UIHelpers:i,Cookies:a,Settings:s,AjaxMethod:u,Logger:d,$:l}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new r(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{dev:[""],prod:["5ee30c6bd883e900117e3cc7"]},pageSelector:"[class^=coupon-code-input]",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:16e3,getCartTotal:6e3,beforeApplyingCoupon:6e3,applyCoupon:16e3,afterApplyingCoupon:6e3}},this.functions={getCartData:(t="")=>__awaiter(this,void 0,void 0,(function*(){var o;const{error:e,response:n}=yield c.ajax("GET","https://caseable.com/cart/content/",!1,{data:{region:"us",language:"en"}});if(e)throw Error(`ERROR: ${this.constructor.name}.functions.getCartData()`);return(null==n?void 0:n.couponCode)&&(this.context.code=n.couponCode),t&&(null===(o=null==n?void 0:n.couponCode)||void 0===o?void 0:o.toUpperCase())===t.toUpperCase()&&(null==n?void 0:n.discount)||0})),sendRequest:(t="",o=!0)=>__awaiter(this,void 0,void 0,(function*(){const{error:e,response:n}=yield c.ajax("POST","/us/en/checkout/cart/couponPost/",!1,{data:{coupon_code:t,remove:Number(o)}});if(e)throw Error(`ERROR: ${this.constructor.name}.functions.sendRequest()`);return t?yield this.functions.getCartData(t):0}))},this.context={cartTotal:0,code:null}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){return yield this.functions.getCartData(),yield this.afterApplyingCoupon(),[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const t=this.context.cartTotal;return d.log("getCartTotal: "+t)(),t}))}beforeApplyingCoupon(){}applyCoupon(t){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=yield this.functions.sendRequest(t,!1),{cartTotalAfterApply:this.context.cartTotal}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){this.context.code&&(yield this.functions.sendRequest(this.context.code))}))}}(!1)),d.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const p=window.Fatcoupon.StoreConnector})();
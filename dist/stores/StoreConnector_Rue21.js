 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var e={d:(t,o)=>{for(var r in o)e.o(o,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:o[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{default:()=>u});var __awaiter=function(e,t,o,r){return new(o||(o=Promise))((function(n,i){function fulfilled(e){try{step(r.next(e))}catch(e){i(e)}}function rejected(e){try{step(r.throw(e))}catch(e){i(e)}}function step(e){var t;e.done?n(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(fulfilled,rejected)}step((r=r.apply(e,t||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:o,StoreConnectorHelpers:r,MultipageStoreConnectorWrapper:n,Helpers:i,UIHelpers:a,Cookies:s,Settings:c,AjaxMethod:l,Logger:p,$:d}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new n(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5ef16d7df627230011e687ec"]},pageSelector:".promocode-card",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:1e4,afterApplyingCoupon:1e4}},this.functions={getCartData:(e="")=>__awaiter(this,void 0,void 0,(function*(){var t;const{error:o,response:r}=yield i.ajax("GET","/orchestrationservices/storefront/carts/USER?locale=en_US&storeId=404",!1,{headers:{"x-api-key":"Rbpz1rVbVj9xW7kX4b2LE6ziaxvVRtrR2Rz1LUsA"}});if(o)throw Error("ERROR: "+JSON.stringify(o));return r&&r.promotionDetails.codes.map(e=>e.code.toUpperCase()).includes(e.toUpperCase())?-Math.abs((null===(t=null==r?void 0:r.value)||void 0===t?void 0:t.cartDiscount)||0):0})),sendRequest:(e="",t=!0)=>__awaiter(this,void 0,void 0,(function*(){const{response:o}=yield i.ajax(t?"DELETE":"POST",`/orchestrationservices/storefront/carts/USER/promos${t?"/"+e:""}?locale=en_US&storeId=404`,!0,{data:t?"":`[{"code":"${e}"}]`,headers:{"x-api-key":"Rbpz1rVbVj9xW7kX4b2LE6ziaxvVRtrR2Rz1LUsA"}});return!t&&e&&o?yield this.functions.getCartData(e):0}))},this.context={cartTotal:null}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){this.context.cartTotal=0;for(const e of d(".applied-value")){const t=d(e).text().trim();yield this.functions.sendRequest(t)}return[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const e=this.context.cartTotal;return p.log("getCartTotal: "+e)(),e}))}beforeApplyingCoupon(){}applyCoupon(e){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=yield this.functions.sendRequest(e,!1),{cartTotalAfterApply:this.context.cartTotal}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),p.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const u=window.Fatcoupon.StoreConnector})();
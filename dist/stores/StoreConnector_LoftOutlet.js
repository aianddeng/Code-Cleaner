 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(e,o)=>{for(var n in o)t.o(o,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:o[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{default:()=>u});var __awaiter=function(t,e,o,n){return new(o||(o=Promise))((function(r,a){function fulfilled(t){try{step(n.next(t))}catch(t){a(t)}}function rejected(t){try{step(n.throw(t))}catch(t){a(t)}}function step(t){var e;t.done?r(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(fulfilled,rejected)}step((n=n.apply(t,e||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:o,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:a,UIHelpers:l,Cookies:c,Settings:i,AjaxMethod:p,Logger:d,$:s}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new r(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{dev:[""],prod:["5e9fb303c571ab001124bf1c"]},pageSelector:".promo-code-text",cartTotalSelector:".order-total>.order-summary-right",couponAppliedNumber:2,reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:2e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:1e4,afterApplyingCoupon:5e3}},this.functions={},this.context={cartTotal:0,cartTotalAfterApply:0,device:null}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){let t=[];this.context.cartTotal=yield n.getCartTotalBySelector(this.metadata.cartTotalSelector),s("[data-slnm-id=promotionalCodeInput]").length||(yield l.simulateClick(s(".promo-code-text")));let e=s(".promo-code-loyalty");if(0===e.length)return t;let o=this.context.device=yield a.runCodeAtPageContext("\n            callback(window.__NEXT_DATA__.props.initialState.global.globalData.deviceType);\n            ");for(let n of e){let e=n.innerText;e=e.substr(1,e.length-1),t.push(e);let r=yield a.ajax("GET",`https://${location.host}/cws/cart/removeCoupon.jsp`,!1,{data:{couponCode:e,device:o}});this.context.cartTotal=+r.response.checkout.ordSum.orderTotal}return t}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const t=this.context.cartTotalAfterApply||this.context.cartTotal;return d.log("getCartTotal: "+t)(),t}))}beforeApplyingCoupon(){}applyCoupon(t){return __awaiter(this,void 0,void 0,(function*(){let e=0,o=this.context.device,n=yield a.ajax("GET",`https://${location.host}/cws/cart/claimCoupon.jsp`,!1,{data:{couponCode:t,loyaltyCoupon:!1,device:o}});return"ERROR"!=n.response.status?(this.context.cartTotalAfterApply=e=+n.response.checkout.ordSum.orderTotal,{cartTotalAfterApply:e}):{discount:0}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),d.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const u=window.Fatcoupon.StoreConnector})();
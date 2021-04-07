 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(e,o)=>{for(var n in o)t.o(o,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:o[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{default:()=>u});var __awaiter=function(t,e,o,n){return new(o||(o=Promise))((function(r,a){function fulfilled(t){try{step(n.next(t))}catch(t){a(t)}}function rejected(t){try{step(n.throw(t))}catch(t){a(t)}}function step(t){var e;t.done?r(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(fulfilled,rejected)}step((n=n.apply(t,e||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:o,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:a,UIHelpers:c,Cookies:i,Settings:l,AjaxMethod:s,Logger:p,$:d}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new r(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{dev:[""],prod:["5f7056ae6b806600113406f6"]},pageSelector:"#checkout_reduction_code",cartTotalSelector:".payment-due__price",couponSelector:"form .reduction-code__text",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:15e3,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:15e3,afterApplyingCoupon:5e3}},this.functions={sendRequest:(t="")=>__awaiter(this,void 0,void 0,(function*(){let e,o;t?(e=d(this.metadata.pageSelector).closest("form"),o=a.getAllFormData(e),o["checkout[reduction_code]"]=t):(e=d(this.metadata.couponSelector).closest("form"),o=a.getAllFormData(e));const{error:n,response:r}=yield a.ajax("POST",e.attr("action"),!1,{data:o});if(n)throw Error("ERROR: "+JSON.stringify(n));const c=a.parseUsdString(d(r).find(this.metadata.cartTotalSelector).first().text())||0,i=d(r).find(this.metadata.couponSelector).text();return{total:c,useCode:new RegExp(t,"i").test(i)}}))},this.context={cartTotal:0,cartTotalAfterApply:0}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){if(this.context.cartTotal=yield n.getCartTotalBySelector(this.metadata.cartTotalSelector),this.context.cartTotalAfterApply=0,d(this.metadata.couponSelector).length){const{total:t}=yield this.functions.sendRequest();this.context.cartTotal=t}return[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const t=this.context.cartTotalAfterApply||this.context.cartTotal;return p.log("getCartTotal: "+t)(),t}))}beforeApplyingCoupon(){}applyCoupon(t){return __awaiter(this,void 0,void 0,(function*(){const{total:e,useCode:o}=yield this.functions.sendRequest(t);return o?(this.context.cartTotalAfterApply=e,{cartTotalAfterApply:e}):{discount:0}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),p.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const u=window.Fatcoupon.StoreConnector})();
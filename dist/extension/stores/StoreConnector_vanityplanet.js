 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(e,o)=>{for(var r in o)t.o(o,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:o[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{default:()=>u});var __awaiter=function(t,e,o,r){return new(o||(o=Promise))((function(n,c){function fulfilled(t){try{step(r.next(t))}catch(t){c(t)}}function rejected(t){try{step(r.throw(t))}catch(t){c(t)}}function step(t){var e;t.done?n(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(fulfilled,rejected)}step((r=r.apply(t,e||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:o,StoreConnectorHelpers:r,MultipageStoreConnectorWrapper:n,Helpers:c,UIHelpers:a,Cookies:i,Settings:l,AjaxMethod:p,Logger:s,$:d}=window.Fatcoupon.ModulesImporter;class StoreConnector_Class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{dev:[""],prod:["5f0530dff7b6cd001109847e"]},pageSelector:"#checkout_reduction_code",cartTotalSelector:".payment-due__price",couponSelector:"form .reduction-code__text",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:15e3,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:15e3,afterApplyingCoupon:5e3}},this.functions={sendRequest:(t="")=>__awaiter(this,void 0,void 0,(function*(){let e,o;t?(e=d(this.metadata.pageSelector).closest("form"),o=c.getAllFormData(e),o["checkout[reduction_code]"]=t):(e=d(this.metadata.couponSelector).closest("form"),o=c.getAllFormData(e));const{error:r,response:n}=yield c.ajax("POST",e.attr("action"),!1,{data:o});if(r)throw Error("ERROR: "+JSON.stringify(r));const a=c.parseUsdString(d(n).find(this.metadata.cartTotalSelector).first().text())||0,i=d(n).find(this.metadata.couponSelector).text();return{total:a,useCode:new RegExp(t,"i").test(i)}}))},this.context={cartTotal:0,cartTotalAfterApply:0}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){if(this.context.cartTotal=yield r.getCartTotalBySelector(this.metadata.cartTotalSelector),this.context.cartTotalAfterApply=0,d(this.metadata.couponSelector).length){const{total:t}=yield this.functions.sendRequest();this.context.cartTotal=t}return[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const t=this.context.cartTotalAfterApply||this.context.cartTotal;return s.log("getCartTotal: "+t)(),t}))}beforeApplyingCoupon(){}applyCoupon(t){return __awaiter(this,void 0,void 0,(function*(){const{total:e,useCode:o}=yield this.functions.sendRequest(t);return o?(this.context.cartTotalAfterApply=e,{cartTotalAfterApply:e}):{discount:0}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}window.Fatcoupon.StoreConnector=new n(new class extends StoreConnector_Class{constructor(){super(...arguments),this.metadata={storeIds:{dev:[""],prod:["5f0530dff7b6cd001109847e"]},pageSelector:"#checkout_reduction_code",cartTotalSelector:".payment-due__price",couponSelector:"form .reduction-code__text",reloadPageAfterApplying:!1,redirectToPageAfterApplying:location.origin+location.pathname,timeouts:{collectAndClearAppliedCoupons:15e3,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:15e3,afterApplyingCoupon:5e3}}}}(!1)),s.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const u=window.Fatcoupon.StoreConnector})();
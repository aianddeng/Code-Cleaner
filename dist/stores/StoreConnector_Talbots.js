 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(e,o)=>{for(var r in o)t.o(o,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:o[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{default:()=>u});var __awaiter=function(t,e,o,r){return new(o||(o=Promise))((function(n,i){function fulfilled(t){try{step(r.next(t))}catch(t){i(t)}}function rejected(t){try{step(r.throw(t))}catch(t){i(t)}}function step(t){var e;t.done?n(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(fulfilled,rejected)}step((r=r.apply(t,e||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:o,StoreConnectorHelpers:r,MultipageStoreConnectorWrapper:n,Helpers:i,UIHelpers:a,Cookies:s,Settings:c,AjaxMethod:l,Logger:d,$:p}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new n(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5ef16d7df627230011e687f6"]},pageSelector:"#dwfrm_billing_couponCode,#dwfrm_cart_couponCode",reloadPageAfterApplying:!1,redirectToPageAfterApplying:location.href,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:1e4,afterApplyingCoupon:1e4}},this.functions={sendRequest:(t="",e=!0)=>__awaiter(this,void 0,void 0,(function*(){const{error:o,response:r}=yield i.ajax("GET","/on/demandware.store/Sites-talbotsus-Site/default/Cart-"+(e?"DeleteCoupon":"AddCouponJson"),!1,{data:{couponCode:t,format:"ajax"}});if(o)throw Error("ERROR: "+JSON.stringify(o));return e?this.context.cartTotal||0:(this.context.codes.push(t),yield this.functions.getCartData())})),getCartData:()=>__awaiter(this,void 0,void 0,(function*(){const{error:t,response:e}=yield i.ajax("GET","/on/demandware.store/Sites-talbotsus-Site/default/COBilling-UpdateSummary");if(t)throw Error("ERROR: "+JSON.stringify(t));return i.parseUsdString(p(".order-total .order-value",e).first().text())||this.context.cartTotal||0})),getCartCode:(t="")=>__awaiter(this,void 0,void 0,(function*(){const{error:t,response:e}=yield i.ajax("GET","/cart");if(t)throw Error("ERROR: "+JSON.stringify(t));if(e)for(const t of p(".cartcoupon .value",e)){const e=p(t).text().trim();e&&this.context.codes.push(e)}return 0}))},this.context={cartTotal:0,cartTotalAfterApply:0,codes:[]}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){return yield this.functions.getCartCode(),yield this.afterApplyingCoupon(),this.context.cartTotal=yield this.functions.getCartData(),this.context.cartTotalAfterApply=0,[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const t=this.context.cartTotalAfterApply||this.context.cartTotal;return d.log("getCartTotal: "+t)(),t}))}beforeApplyingCoupon(){}applyCoupon(t){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotalAfterApply=yield this.functions.sendRequest(t,!1),{cartTotalAfterApply:this.context.cartTotalAfterApply}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){for(const t of this.context.codes)yield this.functions.sendRequest(t);this.context.codes.length=0}))}}(!1)),d.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const u=window.Fatcoupon.StoreConnector})();
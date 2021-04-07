 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(e,o)=>{for(var n in o)t.o(o,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:o[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{default:()=>p});var __awaiter=function(t,e,o,n){return new(o||(o=Promise))((function(r,i){function fulfilled(t){try{step(n.next(t))}catch(t){i(t)}}function rejected(t){try{step(n.throw(t))}catch(t){i(t)}}function step(t){var e;t.done?r(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(fulfilled,rejected)}step((n=n.apply(t,e||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:o,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:i,UIHelpers:a,Cookies:c,Settings:s,AjaxMethod:l,Logger:u,$:d}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new r(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5ff26bd63bc39b0011029299"]},pageSelector:"#discount_code_form",cartTotalSelector:"#basket_sub_total .product-content__price--inc",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:1e4,afterApplyingCoupon:1e4}},this.functions={getCartData:()=>__awaiter(this,void 0,void 0,(function*(){const{error:t,response:e}=yield i.ajax("GET","/basket");if(t)throw Error("ERROR: "+JSON.stringify(t));if(e)return this.context.token=d("[name=csrf_token]",e).attr("value"),i.parseUsdString(d(this.metadata.cartTotalSelector,e).text())})),removeCode:()=>__awaiter(this,void 0,void 0,(function*(){yield i.ajax("GET","/checkout/remove_discount/0")})),sendRequest:(t="")=>__awaiter(this,void 0,void 0,(function*(){const{error:e,response:o}=yield i.ajax("POST","/checkout/apply_discount_code/mybag",!1,{data:{form_identifier:d("[name=form_identifier]").attr("value"),csrf_token:this.context.token||d("[name=csrf_token]").attr("value"),referer:d("[name=referer]").attr("value"),discount_code:t,undefined:"Apply"}});if(e)throw Error("ERROR: "+JSON.stringify(e));return t?yield this.functions.getCartData():this.context.cartTotal}))},this.context={cartTotal:0,cartTotalAfterApply:0,token:null}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){return yield this.functions.removeCode(),this.context.cartTotal=yield this.functions.getCartData(),this.context.cartTotalAfterApply=0,[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const t=this.context.cartTotalAfterApply||this.context.cartTotal||0;return u.log("getCartTotal: "+t)(),t}))}beforeApplyingCoupon(){}applyCoupon(t){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotalAfterApply=yield this.functions.sendRequest(t),{cartTotalAfterApply:this.context.cartTotalAfterApply}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),u.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const p=window.Fatcoupon.StoreConnector})();
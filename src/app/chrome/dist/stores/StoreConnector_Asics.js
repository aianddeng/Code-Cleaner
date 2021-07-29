 /********************************
 * File: StoreConnector_Asics.js *
 * Time: 27.07.21 13:52:40       *
 * Host: iMac-P                  *
 * User: chase                   *
 ********************************/

(()=>{"use strict";var t={d:(o,e)=>{for(var r in e)t.o(e,r)&&!t.o(o,r)&&Object.defineProperty(o,r,{enumerable:!0,get:e[r]})},o:(t,o)=>Object.prototype.hasOwnProperty.call(t,o),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},o={};t.r(o),t.d(o,{default:()=>d});var __awaiter=function(t,o,e,r){return new(e||(e=Promise))((function(n,c){function fulfilled(t){try{step(r.next(t))}catch(t){c(t)}}function rejected(t){try{step(r.throw(t))}catch(t){c(t)}}function step(t){var o;t.done?n(t.value):(o=t.value,o instanceof e?o:new e((function(t){t(o)}))).then(fulfilled,rejected)}step((r=r.apply(t,o||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:e,StoreConnectorHelpers:r,MultipageStoreConnectorWrapper:n,Helpers:c,UIHelpers:a,Cookies:p,Settings:i,AjaxMethod:s,Logger:l,$:u}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new n(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5e9e8dd413920f0011cdfa33"]},pageSelector:"#cart-items-form",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:1e4,afterApplyingCoupon:5e3},couponsCloaking:[{type:"text",selector:".rowcoupons .cartcoupon .value"}]},this.functions={},this.context={cartTotal:0,applied:[]}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){const t=[];this.context.cartTotal=0;for(const o of u(".rowcoupons")){const e=u(o).find(".cartcoupon .value").text().trim();t.push(e);const r=c.getAllFormData(u("#cart-items-form"));r.dwfrm_cart_couponCode="",r.dwfrm_cart_coupons_i0_deleteCoupon="Remove",yield c.ajax("POST",u("#cart-items-form").attr("action"),!1,{"content-type":"application/x-www-form-urlencoded; charset=UTF-8",data:r})}return t}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const t=this.context.cartTotal;return l.log(`getCartTotal: ${t}`)(),t}))}beforeApplyingCoupon(){}applyCoupon(t){return __awaiter(this,void 0,void 0,(function*(){const o=c.getAllFormData(u("#cart-items-form"));o.dwfrm_cart_couponCode=t,o.dwfrm_cart_addCoupon="dwfrm_cart_addCoupon";let e=yield c.ajax("POST",u("#cart-items-form").attr("action"),!1,{data:o,contentType:"application/x-www-form-urlencoded"});if(e.error)throw Error(`ERROR: ${this.constructor.name}.applyCoupon() | coupon apply request error | ${e.error}`);if(e.response)for(const o of u(".rowcoupons",e.response)){const e=u(o).find(".cartcoupon .value").text().trim();return this.context.applied.push(u(o).find(".cartcoupon .value").text().trim()),e.toUpperCase()===t.toUpperCase()&&(this.context.cartTotal=u(o).find(".discount .value").get().map((t=>c.parseUsdString(u(t).text()))).concat(0).reduce(((t,o)=>t+o),0)),{cartTotalAfterApply:this.context.cartTotal}}return{discount:0}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){for(const t of this.context.applied){const t=c.getAllFormData(u("#cart-items-form"));t.dwfrm_cart_couponCode="",t.dwfrm_cart_coupons_i0_deleteCoupon="Remove",yield c.ajax("POST",u("#cart-items-form").attr("action"),!1,{"content-type":"application/x-www-form-urlencoded; charset=UTF-8",data:t})}this.context.applied.length=0}))}}(!1)),l.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const d=window.Fatcoupon.StoreConnector})();
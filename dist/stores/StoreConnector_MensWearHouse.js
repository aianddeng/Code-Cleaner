 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var e={d:(t,o)=>{for(var r in o)e.o(o,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:o[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{default:()=>u});var __awaiter=function(e,t,o,r){return new(o||(o=Promise))((function(n,a){function fulfilled(e){try{step(r.next(e))}catch(e){a(e)}}function rejected(e){try{step(r.throw(e))}catch(e){a(e)}}function step(e){var t;e.done?n(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(fulfilled,rejected)}step((r=r.apply(e,t||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:o,StoreConnectorHelpers:r,MultipageStoreConnectorWrapper:n,Helpers:a,UIHelpers:i,Cookies:s,Settings:c,AjaxMethod:l,Logger:p,$:d}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new n(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["60641a93c6fcae0013469e55"]},pageSelector:"#PromotionCodeForm",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:1e4,afterApplyingCoupon:1e4}},this.functions={getCartData:e=>__awaiter(this,void 0,void 0,(function*(){const t=new URL(location.origin+"/ShopCartDisplayView");t.searchParams.set("shipmentType",d("[name=shipmentType]").attr("value")),t.searchParams.set("catalogId",d("[name=catalogId]").attr("value")),t.searchParams.set("langId",d("[name=langId]").attr("value")),t.searchParams.set("storeId",d("[name=storeId]").attr("value"));const{error:o,response:r}=yield a.ajax("POST",t.href,!1,{data:{requesttype:"ajax",actionId:"AjaxUpdateOrderItem"}});if(o)throw Error("ERROR: "+JSON.stringify(o));if(r){const t=d(".product-price.promo-highlight.value",r).get().map(e=>Math.abs(a.parseUsdString(d(e).text())));if(t.filter(Boolean).length>1||"FatCoupon"===e)return-t.concat(0).reduce((e,t)=>e+t,0)}return 0})),sendRequest:(e="",t=!0)=>__awaiter(this,void 0,void 0,(function*(){if("FatCoupon"===e)return yield this.functions.getCartData(e);const o=yield a.getAllFormData("#PromotionCodeForm"),{error:r,response:n}=yield a.ajax("POST","/webapp/wcs/stores/servlet/AjaxPromotionCodeManage",!1,{data:Object.assign(o,{promoCode:e},t&&{taskType:"R"})});if(yield a.ajax("POST","/webapp/wcs/stores/servlet/AjaxOrderChangeServiceItemUpdate",!1,{data:o}),r)throw Error("ERROR: "+JSON.stringify(r));return t||n.includes("errorCode")?0:yield this.functions.getCartData(e)}))},this.context={cartTotal:0}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){this.context.cartTotal=0;for(const e of d("#appliedPromotionCodes .promotionName"))yield this.functions.sendRequest(d(e).text().trim());return[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const e=this.context.cartTotal;return p.log("getCartTotal: "+e)(),e}))}beforeApplyingCoupon(){}applyCoupon(e){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=yield this.functions.sendRequest(e,!1),{cartTotalAfterApply:this.context.cartTotal}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),p.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const u=window.Fatcoupon.StoreConnector})();
 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{default:()=>u});var __awaiter=function(e,t,o,n){return new(o||(o=Promise))((function(i,r){function fulfilled(e){try{step(n.next(e))}catch(e){r(e)}}function rejected(e){try{step(n.throw(e))}catch(e){r(e)}}function step(e){var t;e.done?i(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(fulfilled,rejected)}step((n=n.apply(e,t||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:o,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:i,Helpers:r,UIHelpers:a,Cookies:c,Settings:l,AjaxMethod:d,Logger:s,$:p}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new i(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{dev:["5e8d3a0e515f3653562df3fc"],prod:["5e901b3297ae8d00118d949e"]},pageSelector:".ship_order_summary",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:2e4,getCartTotal:15e3,beforeApplyingCoupon:15e3,applyCoupon:15e3,afterApplyingCoupon:15e3}},this.functions={removeCouponRequest(e){return __awaiter(this,void 0,void 0,(function*(){return yield r.ajax("POST","/cnc/checkout/removekccoupons",!0,{data:JSON.stringify({couponType:"promo",couponCode:e})})}))}},this.context={cartTotal:0,backupDiscount:0}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=0,this.context.backupDiscount=0,p("#tr-wallet-content-placeholder .content-right").length||(yield a.simulateClick(p(".kohlscashapply")),yield r.waitFor("#tr-wallet-content-placeholder .content-right")),[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const e=this.context.cartTotal;return s.log("getCartTotal: "+e)(),e}))}beforeApplyingCoupon(){}applyCoupon(e){var t,o;return __awaiter(this,void 0,void 0,(function*(){const{response:n,error:i}=yield r.ajax("POST","/cnc/checkout/applykccoupons",!0,{data:JSON.stringify({promoCode:e,couponType:"promo"})});if("FatCoupon"===e||i)return this.context.cartTotal=this.context.backupDiscount,{cartTotalAfterApply:this.context.cartTotal};if(null===(o=null===(t=null==n?void 0:n.appliedDiscounts)||void 0===t?void 0:t.qualifiedItems)||void 0===o?void 0:o.length){let e=0;for(const t of n.appliedDiscounts.qualifiedItems)t.systemInitiated||(e+=Math.abs(r.parseUsdString(t.amount)));this.context.backupDiscount=-e}return{discount:0}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1),new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{dev:["5e8d3a0e515f3653562df3fc"],prod:["5e901b3297ae8d00118d949e"]},pageSelector:"[ng-click*=discountsApply], [ng-click*=validateAndAddDiscount]",reloadPageAfterApplying:!1,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:5e3,afterApplyingCoupon:5e3}},this.functions={},this.context={cartTotal:0,code:""}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){this.context.cartTotal=0;p("[ng-click*=validateAndAddDiscount]").length||(yield a.simulateClick(p("[ng-click*=discountsApply]")),yield r.waitFor("[ng-click*=validateAndAddDiscount]")),yield r.wait(250),yield r.waitForDisappear(".loaderOverlay");const e=p("[ng-click*=removeOffer]");for(let t of e)yield a.simulateClick(p(t)),yield r.waitForDisappear(t);return[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const e=this.context.cartTotal;if(this.context.code&&this.context.cartTotal){const e=p('[ng-model="cardNo"]');yield a.clearInput(e),yield r.wait(250),yield a.sendKeysTogether(this.context.code+"{enter}",e,!0),yield r.wait(250),yield a.simulateClick(p('[ng-click="validateAndAddDiscount()"]')),yield r.waitFor("[ng-click*=removeOffer]"),yield a.simulateClick(p("#hybrid_page_header_text_left")),yield r.waitForDisappear("[ng-click*=validateAndAddDiscount]")}return s.log("getCartTotal: "+e)(),e}))}beforeApplyingCoupon(){}applyCoupon(e){var t,o,n;return __awaiter(this,void 0,void 0,(function*(){const{response:i}=yield r.ajax("POST",location.origin+"/api/lookup/v1/lookup/offers",!0,{data:JSON.stringify({offerCode:e}),headers:{"x-channel":"MCOM","x-correlation-id":c.readDocumentCookie("Correlation-Id")+"-"+(new Date).getTime(),"x-pageid":"MCOM--Discounts"}});if(i&&i.payload.offers.every(e=>!e.errors)){const i=[];for(let e of JSON.parse(localStorage["KOHLS-BAG"]))i.push({skuCode:e.skuCode,qty:e.quantity,shipIndex:e.shipIndex,shippingMethod:e.defaultToShippingMethod});const{error:a,response:l}=yield r.ajax("POST",location.origin+"/api/checkout/v2/checkout/order/calculation?lpf=v2&trEnabled=true",!0,{data:JSON.stringify({payload:{order:{cartItems:i,checkBopusItemInventory:!1,loyaltyId:null,customerSegments:[],incentiveDetails:JSON.parse(localStorage.incentive_data),paymentTypes:{promoCodes:[{code:e}]},preferredStore:JSON.parse(localStorage.topFiveStores).nearestStore.id}}}),headers:{"x-channel":"MCOM","x-correlation-id":c.readDocumentCookie("Correlation-Id")+"-"+(new Date).getTime(),"x-pageid":"MCOM--Discounts"}});if(null===(n=null===(o=null===(t=null==l?void 0:l.payload)||void 0===t?void 0:t.order)||void 0===o?void 0:o.totals)||void 0===n?void 0:n.discountsTotal)return this.context.cartTotal=-l.payload.order.totals.discountsTotal,this.context.code=e,{cartTotalAfterApply:this.context.cartTotal}}return{discount:0}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),s.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const u=window.Fatcoupon.StoreConnector})();
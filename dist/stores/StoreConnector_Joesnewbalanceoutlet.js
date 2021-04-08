 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var e={d:(o,t)=>{for(var r in t)e.o(t,r)&&!e.o(o,r)&&Object.defineProperty(o,r,{enumerable:!0,get:t[r]})},o:(e,o)=>Object.prototype.hasOwnProperty.call(e,o),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},o={};e.r(o),e.d(o,{default:()=>s});var __awaiter=function(e,o,t,r){return new(t||(t=Promise))((function(n,a){function fulfilled(e){try{step(r.next(e))}catch(e){a(e)}}function rejected(e){try{step(r.throw(e))}catch(e){a(e)}}function step(e){var o;e.done?n(e.value):(o=e.value,o instanceof t?o:new t((function(e){e(o)}))).then(fulfilled,rejected)}step((r=r.apply(e,o||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:t,StoreConnectorHelpers:r,MultipageStoreConnectorWrapper:n,Helpers:a,UIHelpers:i,Cookies:l,Settings:c,AjaxMethod:p,Logger:u,$:d}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new n(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{dev:[""],prod:["5ee30c6bd883e900117e3cd0"]},pageSelector:"#PromoCodeWrapper,#CheckoutPromoCode",cartTotalSelector:"#OrderTotal,#SideBarOrderTotal",formSelector:"#UpdateQtyForm",orderNumber:"#OrderNumber",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:6e3,getCartTotal:6e3,beforeApplyingCoupon:6e3,applyCoupon:6e3,afterApplyingCoupon:6e3}},this.functions={},this.context={},this.total=0}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){let{error:e,response:o}=yield a.ajax("POST","https://www.joesnewbalanceoutlet.com/cart/removeDiscountCode",!0,{});if(e)throw Error(`ERROR: ${this.constructor.name}.applyCoupon() | coupon apply request error | error}`);return[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){return this.total=yield r.getCartTotalBySelectorLoadPage(this.metadata.cartTotalSelector),this.total}))}beforeApplyingCoupon(){}applyCoupon(e){return __awaiter(this,void 0,void 0,(function*(){let o=this.total,{error:t,response:n}=yield a.ajax("POST","https://www.joesnewbalanceoutlet.com/cart/applyDiscountCode",!0,{headers:{__RequestVerificationToken:d('input[name="__RequestVerificationToken"]').val()},data:JSON.stringify({CustomerDiscountCode:e,OrderNumber:d(this.metadata.orderNumber).val()})});if(t)throw Error(`ERROR: ${this.constructor.name}.applyCoupon() | coupon apply request error | error}`);return n&&(o=yield r.getCartTotalBySelectorLoadPage(this.metadata.cartTotalSelector)),{cartTotalAfterApply:o}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){yield this.collectAndClearAppliedCoupons()}))}}(!1)),u.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const s=window.Fatcoupon.StoreConnector})();
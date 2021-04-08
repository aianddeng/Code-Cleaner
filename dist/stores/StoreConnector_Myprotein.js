 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var e={d:(t,o)=>{for(var r in o)e.o(o,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:o[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{default:()=>p});var __awaiter=function(e,t,o,r){return new(o||(o=Promise))((function(n,a){function fulfilled(e){try{step(r.next(e))}catch(e){a(e)}}function rejected(e){try{step(r.throw(e))}catch(e){a(e)}}function step(e){var t;e.done?n(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(fulfilled,rejected)}step((r=r.apply(e,t||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:o,MultipageStoreConnectorWrapper:r,Helpers:n,Logger:a,$:i}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new r(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{dev:["5edf1a97d4b7ba42a371fff1"],prod:["5ed0b7f057659f0011be1b53"]},pageSelector:".athenaBasket_totalLabel",redirectToPageAfterApplying:"https://us.myprotein.com/my.basket",removeCodeSelector:".athenaBasket_removeItem.athenaBasket_removeItem-discount",timeouts:{collectAndClearAppliedCoupons:5e4,getCartTotal:25e3,beforeApplyingCoupon:25e3,applyCoupon:5e4,afterApplyingCoupon:25e3}},this.functions={getUrl:()=>{let e=i(this.metadata.removeCodeSelector);if(!e)throw Error("ERROR:url not found");return i(e).attr("href")}},this.context={}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){if(i(this.metadata.removeCodeSelector).length){let e="https://us.myprotein.com/"+this.functions.getUrl(),t=yield n.ajax("GET",e,!1);if(t.error)throw Error(`ERROR: ${this.constructor.name}.collectAndClearAppliedCoupons() | remove coupon request error | ${t.error}`)}return[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){let e=yield n.ajax("GET","https://us.myprotein.com/my.basket",!1),t=i(e.response).find(".responsiveFlyoutBasket_basketTotalPrice");return n.parseUsdString(t[0].innerText)}))}beforeApplyingCoupon(){}applyCoupon(e){return __awaiter(this,void 0,void 0,(function*(){let t=yield n.ajax("POST","https://us.myprotein.com/my.basket",!1,{data:{discountCode:e}});if(t.error)throw Error(`ERROR: ${this.constructor.name}.applyCoupon() | apply coupon request error | ${t.error}`);return{cartTotalAfterApply:yield this.getCartTotal()}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),a.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const p=window.Fatcoupon.StoreConnector})();
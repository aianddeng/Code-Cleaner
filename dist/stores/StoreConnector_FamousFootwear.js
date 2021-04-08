 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var o={d:(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o:(o,e)=>Object.prototype.hasOwnProperty.call(o,e),r:o=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(o,"__esModule",{value:!0})}},e={};o.r(e),o.d(e,{default:()=>l});var __awaiter=function(o,e,t,n){return new(t||(t=Promise))((function(r,i){function fulfilled(o){try{step(n.next(o))}catch(o){i(o)}}function rejected(o){try{step(n.throw(o))}catch(o){i(o)}}function step(o){var e;o.done?r(o.value):(e=o.value,e instanceof t?e:new t((function(o){o(e)}))).then(fulfilled,rejected)}step((n=n.apply(o,e||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:t,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:i,UIHelpers:s,Cookies:a,Settings:p,AjaxMethod:c,Logger:u,$:d}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new r(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5e798bef5dbd010011bba815"]},pageSelector:"#promotional-code-input",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:1e4,afterApplyingCoupon:1e4}},this.functions={sendRequest:(o="",e=!0)=>__awaiter(this,void 0,void 0,(function*(){var t;const{error:n,response:r}=yield i.ajax("POST",`/api/cxa/cart/${e?"RemoveDiscount":"ApplyDiscount"}?sc_site=Famous%20Footwear`,!1,{data:{promotionCode:o,__RequestVerificationToken:d("#_CRSFform input[name=__RequestVerificationToken]").attr("value")}});if(n)throw Error("ERROR: "+JSON.stringify(n));if(!e&&o&&(null===(t=null==r?void 0:r.AppliedPromoCodes)||void 0===t?void 0:t.length))for(const t of r.AppliedPromoCodes)if(this.context.appliedCode.push(t.CouponCode),!e&&o.toUpperCase().startsWith(t.CouponCode.toUpperCase())&&t.Success)return-Math.abs(r.DiscountAmount);return 0}))},this.context={cartTotal:0,appliedCode:[]}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=0,yield this.functions.sendRequest("FakeCode",!1),yield this.afterApplyingCoupon(),[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const o=this.context.cartTotal;return u.log("getCartTotal: "+o)(),o}))}beforeApplyingCoupon(){}applyCoupon(o){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=yield this.functions.sendRequest(o,!1),{cartTotalAfterApply:this.context.cartTotal}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){for(const o of this.context.appliedCode)yield this.functions.sendRequest(o);this.context.appliedCode.length=0}))}}(!1)),u.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const l=window.Fatcoupon.StoreConnector})();
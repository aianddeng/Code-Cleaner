 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(e,o)=>{for(var n in o)t.o(o,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:o[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{default:()=>d});var __awaiter=function(t,e,o,n){return new(o||(o=Promise))((function(r,a){function fulfilled(t){try{step(n.next(t))}catch(t){a(t)}}function rejected(t){try{step(n.throw(t))}catch(t){a(t)}}function step(t){var e;t.done?r(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(fulfilled,rejected)}step((n=n.apply(t,e||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:o,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:a,UIHelpers:c,Cookies:i,Settings:l,AjaxMethod:s,Logger:p,$:u}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new r(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5f8e821c1c7b290011261b82"]},pageSelector:".c-cart-coupon",cartTotalSelector:".m-total .m-value:eq(0)",appliedSelector:"[data-coupon]",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:1e4,afterApplyingCoupon:1e4}},this.functions={sendRequest:(t="",e=!0)=>__awaiter(this,void 0,void 0,(function*(){const{error:o,response:n}=yield a.ajax("POST","/on/demandware.store/Sites-hair-us-Site/en_US/Cart-Submit?ajax=true",!1,{data:e?{csrf_token:u('[name="csrf_token"]').val(),["coupon_remove_"+t]:"WEL15-5PCL-XK5F-GYP2-QAX6"}:{csrf_token:u('[name="csrf_token"]').val(),couponcode:t,form_id:"coupon",apply:""}});if(o)throw Error("ERROR: "+JSON.stringify(o));return a.parseUsdString(u(this.metadata.cartTotalSelector,n).first().text())}))},this.context={cartTotal:0}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){this.context.cartTotal=yield n.getCartTotalBySelector(this.metadata.cartTotalSelector);for(const t of u(this.metadata.appliedSelector)){const e=u(t).attr("data-coupon");this.context.cartTotal=yield this.functions.sendRequest(e)}return[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const t=this.context.cartTotal;return p.log("getCartTotal: "+t)(),t}))}beforeApplyingCoupon(){}applyCoupon(t){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=yield this.functions.sendRequest(t,!1),{cartTotalAfterApply:this.context.cartTotal}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),p.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const d=window.Fatcoupon.StoreConnector})();
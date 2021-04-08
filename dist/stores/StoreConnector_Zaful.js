 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{default:()=>d});var __awaiter=function(e,t,o,n){return new(o||(o=Promise))((function(r,c){function fulfilled(e){try{step(n.next(e))}catch(e){c(e)}}function rejected(e){try{step(n.throw(e))}catch(e){c(e)}}function step(e){var t;e.done?r(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(fulfilled,rejected)}step((n=n.apply(e,t||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:o,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:c,UIHelpers:a,Cookies:i,Settings:l,AjaxMethod:p,Logger:s,$:u}=window.Fatcoupon.ModulesImporter;class StoreConnector_Class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{dev:[""],prod:["5f0530dff7b6cd0011098499"]},pageSelector:"#promotion_code",cartTotalSelector:"#price_total",couponSelector:".coupon_status",reloadPageAfterApplying:!1,redirectToPageAfterApplying:location.href,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:5e3,afterApplyingCoupon:1e4}},this.functions={sendRequest:(e="")=>__awaiter(this,void 0,void 0,(function*(){const{error:t,response:o}=yield c.ajax("GET","/fun/ajax/index.php",!1,{data:{module:"Cart",act:"shoppingCart",pipeline:"zf",callback:"callback",pcode:e,_:(new Date).getTime()}});if(t)throw Error("ERROR: "+JSON.stringify(t));if(e&&o){const e=o.match(/"couponSaving":"(\d+\.\d+)",/)||o.match(/"couponDiscountPrice":"(\d+\.\d+)",/);if(null==e?void 0:e.length)return-parseFloat(e[1])}return 0}))},this.context={cartTotal:0}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=0,u(this.metadata.couponSelector).length&&(yield this.functions.sendRequest()),[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const e=this.context.cartTotal;return s.log("getCartTotal: "+e)(),e}))}beforeApplyingCoupon(){}applyCoupon(e){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=yield this.functions.sendRequest(e),{cartTotalAfterApply:this.context.cartTotal||0}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}window.Fatcoupon.StoreConnector=new r(new StoreConnector_Class(!1),new class extends StoreConnector_Class{constructor(){super(...arguments),this.metadata={storeIds:{dev:[""],prod:["5f0530dff7b6cd0011098499"]},pageSelector:"#coupon",cartTotalSelector:".cartTotal .js_totalPrice",couponSelector:"#js_full_reduce_discount .my_shop_price",reloadPageAfterApplying:!1,redirectToPageAfterApplying:location.href,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:5e3,afterApplyingCoupon:1e4}}}}(!1)),s.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const d=window.Fatcoupon.StoreConnector})();
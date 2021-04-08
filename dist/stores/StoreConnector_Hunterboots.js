 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(o,e)=>{for(var n in e)t.o(e,n)&&!t.o(o,n)&&Object.defineProperty(o,n,{enumerable:!0,get:e[n]})},o:(t,o)=>Object.prototype.hasOwnProperty.call(t,o),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},o={};t.r(o),t.d(o,{default:()=>d});var __awaiter=function(t,o,e,n){return new(e||(e=Promise))((function(r,c){function fulfilled(t){try{step(n.next(t))}catch(t){c(t)}}function rejected(t){try{step(n.throw(t))}catch(t){c(t)}}function step(t){var o;t.done?r(t.value):(o=t.value,o instanceof e?o:new e((function(t){t(o)}))).then(fulfilled,rejected)}step((n=n.apply(t,o||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:e,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:c,UIHelpers:a,Cookies:i,Settings:s,AjaxMethod:u,Logger:l,$:p}=window.Fatcoupon.ModulesImporter;class StoreConnector_Hunterboots extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{dev:["5e7dbc7b468bd960594c1263"],prod:["5e8c16d382e5bf0011e5a690"]},pageSelector:"body.cart",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:5e3,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:5e3,afterApplyingCoupon:5e3}},this.functions={getToken:()=>{try{return JSON.parse(window.localStorage.getItem("us-cart")).token}catch(t){throw Error("ERROR: token not found")}},getTotal:(t={})=>{const o=p.isEmptyObject(t)?JSON.parse(window.localStorage.getItem("us-cart")):t;try{const{price:{value:t}}=o.totalToPay||{};return Number(t)}catch(t){throw Error("ERROR: total not found")}},getDiscount:t=>{const o=p.isEmptyObject(t)?JSON.parse(window.localStorage.getItem("us-cart")):t;try{const{discountAsMoney:{value:t}}=o.promotion||{};return Number(t)}catch(t){throw Error("ERROR: total not found")}}},this.context={cartTotal:null,cartTotalAfterApply:null,codeKey:null}}collectAndClearAppliedCoupons(){var t,o;return __awaiter(this,void 0,void 0,(function*(){return yield c.ajax("PUT","https://www.hunterboots.com/us/en_us/api/checkout/update-promotion-code",!1,{data:{code:"",token:this.functions.getToken()}}),this.context.cartTotal=this.functions.getTotal(),this.context.cartTotalAfterApply=0,this.context.codeKey=(null===(o=null===(t=JSON.parse(window.localStorage.getItem("us-cart")))||void 0===t?void 0:t.promotion)||void 0===o?void 0:o.key)||"",[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const t=this.context.cartTotalAfterApply||this.context.cartTotal;return l.log("getCartTotal: "+t)(),t}))}beforeApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}applyCoupon(t){var o,e;return __awaiter(this,void 0,void 0,(function*(){let n=yield c.ajax("PUT","https://www.hunterboots.com/us/en_us/api/checkout/update-promotion-code",!1,{data:{code:t,token:this.functions.getToken()}});const{response:r,error:a}=n;return a&&console.log(a.jqXHR.response),!r||this.context.codeKey&&(null===(e=null===(o=null==r?void 0:r.data)||void 0===o?void 0:o.promotion)||void 0===e?void 0:e.key)!=this.context.codeKey?{discount:0}:(this.context.cartTotalAfterApply=this.functions.getTotal(r.data||{})-this.functions.getDiscount(r.data||{}),{discount:this.functions.getDiscount(r.data||{})})}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}window.Fatcoupon.StoreConnector=new r(new StoreConnector_Hunterboots(!1),new class extends StoreConnector_Hunterboots{constructor(){super(...arguments),this.metadata={storeIds:{dev:["5e7dbc7b468bd960594c1263"],prod:["5e8c16d382e5bf0011e5a690"]},pageSelector:".rhs-sidebar.is-active",reloadPageAfterApplying:!1,redirectToPageAfterApplying:"https://www.hunterboots.com/us/en_us/bag",timeouts:{collectAndClearAppliedCoupons:5e3,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:5e3,afterApplyingCoupon:5e3}}}}(!1)),l.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const d=window.Fatcoupon.StoreConnector})();
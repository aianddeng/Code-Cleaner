 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(e,o)=>{for(var r in o)t.o(o,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:o[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{default:()=>u});var __awaiter=function(t,e,o,r){return new(o||(o=Promise))((function(n,a){function fulfilled(t){try{step(r.next(t))}catch(t){a(t)}}function rejected(t){try{step(r.throw(t))}catch(t){a(t)}}function step(t){var e;t.done?n(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(fulfilled,rejected)}step((r=r.apply(t,e||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:o,StoreConnectorHelpers:r,MultipageStoreConnectorWrapper:n,Helpers:a,UIHelpers:i,Cookies:l,Settings:p,AjaxMethod:c,Logger:s,$:d}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new n(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={pageSelector:"span[data-wrapper='promo-code-wrapper']",cartTotalSelector:"li.total-price > span.right",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:1e4,afterApplyingCoupon:5e3}},this.functions={},this.context={total:0}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){let t=[],e=d("#mainform").children().length-1,o=d(`#mainform > div:nth-child(${e}) > .width-calc-150 > .prod-name-warranties> span`);if(0===o.length)return t;let r=o[0].innerHTML.split("(")[1].split(")")[0];if(t.push(r),0!=d("a[data-item-id='158636']").length){let t=yield a.ajax("GET",`https://${location.host}/cart.html`,!1,{data:{todo:158636}});if(t.error)throw Error(`ERROR: ${this.constructor.name}.collectAndClearAppliedCoupons() | remove coupon request error | ${t.error}`);let e=yield a.ajax("GET",`https://${location.host}/cart.html`,!1,{data:{todo:"add",IndexID:158636}});if(e.error)throw Error(`ERROR: ${this.constructor.name}.collectAndClearAppliedCoupons() | remove coupon request error | ${e.error}`)}else{let t=yield a.ajax("GET",`https://${location.host}/cart.html`,!1,{data:{todo:"add",IndexID:158636}});if(t.error)throw Error(`ERROR: ${this.constructor.name}.collectAndClearAppliedCoupons() | remove coupon request error | ${t.error}`);let e=yield a.ajax("GET",`https://${location.host}/cart.html`,!1,{data:{todo:158636}});if(e.error)throw Error(`ERROR: ${this.constructor.name}.collectAndClearAppliedCoupons() | remove coupon request error | ${e.error}`)}return t}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){let t=yield a.ajax("GET",`https://${location.host}/cart.html`,!1);if(t.error)throw Error(`ERROR: ${this.constructor.name}.applyCoupon() | coupon apply request error | ${t.error}`);let e=d(t.response).find(this.metadata.cartTotalSelector),o=a.parseUsdString(e[0].innerText);return o||(e=d(t.response).find(".cart-price-box > ul > li:nth-child(3) > .right"),o=a.parseUsdString(e[0].innerText),o||(e=d(t.response).find("div.cart-price-box > ul > li:nth-child(1) > span.right"),o=a.parseUsdString(e[0].innerText))),this.context.total=o,o}))}beforeApplyingCoupon(){}applyCoupon(t){return __awaiter(this,void 0,void 0,(function*(){let e=a.getAllFormData(d("#mainform"));e.promo_code=t;let o=yield a.ajax("POST",`https://${location.host}/cart.html?todo=update`,!1,{data:e});if(o.error)throw Error(`ERROR: ${this.constructor.name}.applyCoupon() | coupon apply request error | ${o.error}`);if("string"==typeof o.response){let t=d(o.response).find(this.metadata.cartTotalSelector),e=a.parseUsdString(t[0].innerText);return e>=this.context.total?{discount:0}:0==e?(t=d(o.response).find(".cart-price-box > ul > li:nth-child(3) > .right"),0==t.length?{discount:0}:(e=a.parseUsdString(t[0].innerText),e>=this.context.total?{discount:0}:{cartTotalAfterApply:e})):{cartTotalAfterApply:e}}return{discount:0}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),s.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const u=window.Fatcoupon.StoreConnector})();
 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var __webpack_require__={d:(e,o)=>{for(var t in o)__webpack_require__.o(o,t)&&!__webpack_require__.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:o[t]})},o:(e,o)=>Object.prototype.hasOwnProperty.call(e,o),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},__webpack_exports__={};__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var __awaiter=function(e,o,t,r){return new(t||(t=Promise))((function(n,c){function fulfilled(e){try{step(r.next(e))}catch(e){c(e)}}function rejected(e){try{step(r.throw(e))}catch(e){c(e)}}function step(e){var o;e.done?n(e.value):(o=e.value,o instanceof t?o:new t((function(e){e(o)}))).then(fulfilled,rejected)}step((r=r.apply(e,o||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult,StoreConnectorHelpers,MultipageStoreConnectorWrapper,Helpers,UIHelpers,Cookies,Settings,AjaxMethod,Logger,$}=window.Fatcoupon.ModulesImporter;class StoreConnector_Dollargeneral extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{dev:["5eb235127b98dc35d362ff36"],prod:["5e9e99b813920f0011cdfa55"]},pageSelector:"#form-validate",cartTotalSelector:".grand .price",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:1e4,beforeApplyingCoupon:5e3,applyCoupon:5e3,afterApplyingCoupon:5e3}},this.functions={getAction:()=>{const e=$("#discount-coupon-form").attr("action");if(!e)throw Error("ERROR: action not found");return e},getTotal:response=>{let og_settings={};$(response).find("script").map((function(){try{eval($(this).text())}catch(e){}}));const total=Helpers.parseUsdString(og_settings.cart.order_total);return total}},this.context={total:null}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){let e=[],o=$(".amCouponsCode");if(0===o.length)return e;for(const t of o){const o=$(t).val();e.push(o);const r=Helpers.getAllFormData($("#discount-coupon-form"));r.coupon_code="",r.coupon_code_fake="",r.remove_coupon=o;yield Helpers.ajax("POST",this.functions.getAction(),!1,{data:r,contentType:"application/x-www-form-urlencoded"})}return e}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){let e=yield Helpers.ajax("GET",document.location.href,!1);if(e.error)throw Error(`ERROR: ${this.constructor.name}.getCartTotal() | cannot fetch basket data | ${e.error}`);const o=this.functions.getTotal(e.response);return this.context.total=o,o}))}beforeApplyingCoupon(){}applyCoupon(e){return __awaiter(this,void 0,void 0,(function*(){const o=Helpers.getAllFormData($("#discount-coupon-form"));o.coupon_code=e,o.coupon_code_fake=e,o.remove_coupon="";let t=yield Helpers.ajax("POST",this.functions.getAction(),!1,{data:o,contentType:"application/x-www-form-urlencoded"});if(t.error)throw Error(`ERROR: ${this.constructor.name}.applyCoupon() | coupon reset request error | ${t.error}`);if(t.response){const e=this.functions.getTotal(t.response);return e>=this.context.total?{discount:0}:{cartTotalAfterApply:e}}return{discount:0}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}window.Fatcoupon.StoreConnector=new MultipageStoreConnectorWrapper(new StoreConnector_Dollargeneral(!1)),Logger.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const __WEBPACK_DEFAULT_EXPORT__=window.Fatcoupon.StoreConnector})();
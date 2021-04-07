 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var o={d:(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o:(o,e)=>Object.prototype.hasOwnProperty.call(o,e),r:o=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(o,"__esModule",{value:!0})}},e={};o.r(e),o.d(e,{default:()=>l});var __awaiter=function(o,e,t,n){return new(t||(t=Promise))((function(r,c){function fulfilled(o){try{step(n.next(o))}catch(o){c(o)}}function rejected(o){try{step(n.throw(o))}catch(o){c(o)}}function step(o){var e;o.done?r(o.value):(e=o.value,e instanceof t?e:new t((function(o){o(e)}))).then(fulfilled,rejected)}step((n=n.apply(o,e||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:t,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:c,UIHelpers:i,Cookies:a,Settings:p,AjaxMethod:s,Logger:u,$:d}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new r(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5f0e351accf44c0011711c94"]},pageSelector:"#coupon_code, div.shopkeeper_checkout_coupon, #cfw-promo-code",reloadPageAfterApplying:!1,redirectToPageAfterApplying:location.origin+location.pathname,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:1e4,beforeApplyingCoupon:5e3,applyCoupon:1e4,afterApplyingCoupon:5e3}},this.functions={removeCode:(o="")=>__awaiter(this,void 0,void 0,(function*(){for(const e of d("a.woocommerce-remove-coupon",o||document)){const o=d(e).attr("data-coupon");if(o){const{response:e}=yield c.ajax("GET","/checkout/?remove_coupon="+o);yield this.functions.removeCode(e)}}return!0})),sendRequest:(o="")=>__awaiter(this,void 0,void 0,(function*(){const{error:e,response:t}=yield c.ajax("POST","/?wc-ajax=cfw_apply_coupon",!1,{data:{coupon:o,coupon_code:o}});if(e)throw Error("ERROR: "+JSON.stringify(e));if(t){const o=JSON.parse(t);if(o.result&&o.code){const{error:o,response:e}=yield c.ajax("GET","/checkout/");if(o)throw Error("ERROR: "+JSON.stringify(o));if(e)return-d(".cart-discount .woocommerce-Price-amount").get().map(o=>Math.abs(c.parseUsdString(d(o).text()))).filter(Boolean).reduce((o,e)=>o+e,0)}}return 0}))},this.context={cartTotal:0}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=0,yield this.functions.removeCode(),[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const o=this.context.cartTotal;return u.log("getCartTotal: "+o)(),o}))}beforeApplyingCoupon(){}applyCoupon(o){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=yield this.functions.sendRequest(o),{cartTotalAfterApply:this.context.cartTotal||0}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),u.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const l=window.Fatcoupon.StoreConnector})();
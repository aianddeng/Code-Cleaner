 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(o,e)=>{for(var n in e)t.o(e,n)&&!t.o(o,n)&&Object.defineProperty(o,n,{enumerable:!0,get:e[n]})},o:(t,o)=>Object.prototype.hasOwnProperty.call(t,o),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},o={};t.r(o),t.d(o,{default:()=>u});var __awaiter=function(t,o,e,n){return new(e||(e=Promise))((function(r,c){function fulfilled(t){try{step(n.next(t))}catch(t){c(t)}}function rejected(t){try{step(n.throw(t))}catch(t){c(t)}}function step(t){var o;t.done?r(t.value):(o=t.value,o instanceof e?o:new e((function(t){t(o)}))).then(fulfilled,rejected)}step((n=n.apply(t,o||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:e,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:c,UIHelpers:a,Cookies:i,Settings:s,AjaxMethod:d,Logger:l,$:p}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new r(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5e913b5ddfc61600114f4d80"]},pageSelector:".cart-summary-wrapper",discountSelector:".amt",redirectToPageAfterApplying:location.href,timeouts:{collectAndClearAppliedCoupons:15e3,getCartTotal:15e3,beforeApplyingCoupon:15e3,applyCoupon:15e3,afterApplyingCoupon:15e3}},this.functions={},this.context={cartTotal:null,action:null,csrf:null,code:null}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){let t=[];this.context.action=p("#checkout-form").attr("action"),this.context.csrf=p("#primary input[name='csrf_token']").val(),this.context.cartTotal=0;const o=yield c.runCodeAtPageContext("\n                callback(window.utag_data.order_promo_code);\n            ");if(!o||0===o.length)return t;for(const e of o)t.push(e),yield c.ajax("POST",this.context.action,!1,{data:{dwfrm_cart_coupons_i0_deleteCoupon:"Remove",csrf_token:this.context.csrf}});return t}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const t=this.context.cartTotal;return l.log("getCartTotal: "+t)(),t}))}beforeApplyingCoupon(){}applyCoupon(t){return __awaiter(this,void 0,void 0,(function*(){let{error:o,response:e}=yield c.ajax("POST",this.context.action,!1,{data:{dwfrm_cart_couponCode:t,dwfrm_cart_addCoupon:"dwfrm_cart_addCoupon",csrf_token:this.context.csrf}});if(o)throw Error(`ERROR: ${this.constructor.name}.applyCoupon() | coupon apply request error | ${o}`);if(e){const o=e.match(/"promo_code": (\[[\s\S]*?\])/);if(o&&JSON.parse(o[1]).includes(t))return this.context.code=t,this.context.cartTotal=-Math.abs(c.parseUsdString(p(e).find(this.metadata.discountSelector).first().text())),{cartTotalAfterApply:this.context.cartTotal||0}}return{discount:0}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){this.context.code&&(yield c.ajax("POST",this.context.action,!1,{data:{dwfrm_cart_coupons_i0_deleteCoupon:"Remove",csrf_token:this.context.csrf}})),this.context.code=null}))}}(!1)),l.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const u=window.Fatcoupon.StoreConnector})();
 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var o={d:(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o:(o,e)=>Object.prototype.hasOwnProperty.call(o,e),r:o=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(o,"__esModule",{value:!0})}},e={};o.r(e),o.d(e,{default:()=>l});var __awaiter=function(o,e,t,n){return new(t||(t=Promise))((function(r,i){function fulfilled(o){try{step(n.next(o))}catch(o){i(o)}}function rejected(o){try{step(n.throw(o))}catch(o){i(o)}}function step(o){var e;o.done?r(o.value):(e=o.value,e instanceof t?e:new t((function(o){o(e)}))).then(fulfilled,rejected)}step((n=n.apply(o,e||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:t,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:i,UIHelpers:c,Cookies:s,Settings:p,AjaxMethod:a,Logger:d,$:u}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new r(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5ef16d7df627230011e687f8","605587d499c5f2001147d583"]},pageSelector:"form.coupon_submit_form input",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:25e3,getCartTotal:15e3,beforeApplyingCoupon:5e3,applyCoupon:15e3,afterApplyingCoupon:5e3}},this.functions={},this.context={config:null}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){const o=[];try{this.context.config=JSON.parse(u("#__NEXT_DATA__").text()).props.initialState.APIConfig}catch(o){this.context.config=yield i.runCodeAtPageContext("callback(window.__NEXT_DATA__.props.initialState.APIConfig);")}const{response:e,error:t}=yield i.ajax("GET","/api/v2/checkout/cart",!0,{headers:{storeid:this.context.config.storeId}});for(const t of e.coupons.offers){const e=t.couponCode;if(e&&!o.includes(e)){o.push(e);const{error:t,response:n}=yield i.ajax("POST","/api/v2/checkout/removePromotionCode",!0,{headers:{devicetype:"desktop",promocode:e,storeid:this.context.config.storeId}});if(t)throw Error(`ERROR: ${this.constructor.name}.collectAndClearAppliedCoupons() | remove coupon request error | ${t}`)}}return o}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const{error:o,response:e}=yield i.ajax("GET","/api/v2/checkout/cart");return e.orderDetails.grandTotal}))}beforeApplyingCoupon(){}applyCoupon(o){return __awaiter(this,void 0,void 0,(function*(){const{error:e,response:t}=yield i.ajax("POST","/api/v2/checkout/coupons",!0,{headers:{catalogid:this.context.config.catalogId,client_source:"tcp-us-bag","content-type":"application/json",devicetype:"desktop",storeid:this.context.config.storeId},data:JSON.stringify({promoCode:o})});return t?{cartTotalAfterApply:yield this.getCartTotal()}:{discount:0}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),d.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const l=window.Fatcoupon.StoreConnector})();
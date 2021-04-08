 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(o,e)=>{for(var r in e)t.o(e,r)&&!t.o(o,r)&&Object.defineProperty(o,r,{enumerable:!0,get:e[r]})},o:(t,o)=>Object.prototype.hasOwnProperty.call(t,o),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},o={};t.r(o),t.d(o,{default:()=>l});var __awaiter=function(t,o,e,r){return new(e||(e=Promise))((function(n,a){function fulfilled(t){try{step(r.next(t))}catch(t){a(t)}}function rejected(t){try{step(r.throw(t))}catch(t){a(t)}}function step(t){var o;t.done?n(t.value):(o=t.value,o instanceof e?o:new e((function(t){t(o)}))).then(fulfilled,rejected)}step((r=r.apply(t,o||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:e,StoreConnectorHelpers:r,MultipageStoreConnectorWrapper:n,Helpers:a,Logger:c,$:p}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new n(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{dev:[""],prod:["5ed0b7f057659f0011be1b75"]},pageSelector:"#promoCode",cartTotalSelector:".cs-subtotal .sub-value,.dr_totals",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:5e3,afterApplyingCoupon:5e3}},this.functions={},this.context={cartTotal:null,cartTotalAfterApply:null}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){try{const t=p("html").html(),o=JSON.parse(t.match(/roduct_list_price:(\[.*?\]),/)[1]).map(parseFloat),e=JSON.parse(t.match(/product_quantity:(\[.*?\]),/)[1]).map(parseFloat),r=JSON.parse(t.match(/product_unit_price:(\[.*?\]),/)[1]).map(parseFloat);this.context.cartTotalAfterApply=0,this.context.cartTotal=o.reduce((t,o,n)=>(1==n&&(t*=e[n-1]),r[n]||(o=0),o*e[n]+t))}catch(t){}return[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const t=this.context.cartTotalAfterApply||this.context.cartTotal;return c.log("getCartTotal: "+t)(),t}))}beforeApplyingCoupon(){}applyCoupon(t){return __awaiter(this,void 0,void 0,(function*(){const o=a.getAllFormData(p("form[name='ShoppingCartForm']"));o.couponCode=t;let e=yield a.ajax("POST",`https://${location.host}/store/`,!1,{contentType:"application/x-www-form-urlencoded; charset=UTF-8",data:o});if(e.error)throw Error(`ERROR: ${this.constructor.name}.applyCoupon() | coupon apply request error | ${e.error}`);if("string"==typeof e.response)try{const o=e.response.match(/discount_id: \[(.*?)\],/)[1].replace(/"/g,"").split(",");if(yield a.wait(200),console.log(t),console.log(o),o.includes(t)){const t=parseFloat(e.response.match(/order_price_minus_discount:"(.*?)"/)[1]);return this.context.cartTotalAfterApply=t,{cartTotalAfterApply:t}}}catch(t){}return{discount:0}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),c.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const l=window.Fatcoupon.StoreConnector})();
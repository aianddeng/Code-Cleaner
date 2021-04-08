 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(o,e)=>{for(var n in e)t.o(e,n)&&!t.o(o,n)&&Object.defineProperty(o,n,{enumerable:!0,get:e[n]})},o:(t,o)=>Object.prototype.hasOwnProperty.call(t,o),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},o={};t.r(o),t.d(o,{default:()=>d});var __awaiter=function(t,o,e,n){return new(e||(e=Promise))((function(r,a){function fulfilled(t){try{step(n.next(t))}catch(t){a(t)}}function rejected(t){try{step(n.throw(t))}catch(t){a(t)}}function step(t){var o;t.done?r(t.value):(o=t.value,o instanceof e?o:new e((function(t){t(o)}))).then(fulfilled,rejected)}step((n=n.apply(t,o||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:e,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:a,UIHelpers:s,Cookies:i,Settings:c,AjaxMethod:l,Logger:p,$:u}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new r(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{dev:["5ed7d3719089d6159354333c"],prod:["5ed0b7f057659f0011be1b63"]},pageSelector:"#cart-items-form,#spc-coupon-code",cartTotalSelector:".order-total",errorSelector:'.coupon-message.error[data-wa-event_type="visible"]',couponAppliedNumber:2,redirectToPageAfterApplying:"https://www.sanuk.com/cart",timeouts:{collectAndClearAppliedCoupons:2e4,getCartTotal:1e4,beforeApplyingCoupon:5e3,applyCoupon:2e4,afterApplyingCoupon:7e3}},this.functions={getCartData:()=>__awaiter(this,void 0,void 0,(function*(){let t=yield a.ajax("GET",`https://${location.host}/on/demandware.store/Sites-SANUK-US-Site/default/SPC-UpdateCartSummary?spc=true`,!1);if(t.error)throw Error(`ERROR: ${this.constructor.name}.functions.getTotal() | cannot fetch basket data | ${t.error}`);if(t.response.coupons.length){let o=t.response.coupons.find(t=>0==t.applied);if(console.log(null==o?void 0:o.code),o&&o.code){let t=(yield this.functions.getCoupons()).find(t=>0==t.isApplied).uuid;this.context.couponsArr.push(t)}}return t.response})),getCoupons:()=>__awaiter(this,void 0,void 0,(function*(){let t=yield a.ajax("GET",`https://${location.host}/on/demandware.store/Sites-SANUK-US-Site/default/SPC-GetCouponsInBasket?spc=true`,!1);if(t.error)throw Error(`ERROR: ${this.constructor.name}.functions.getTotal() | cannot fetch basket data | ${t.error}`);return t.response})),getTotal:t=>{const o=u(t).find(this.metadata.cartTotalSelector);return a.parseUsdString(o[0].innerText)},stackingCalc:t=>{if(t<this.context.total){if(this.context.totalAfterApply&&t>=this.context.totalAfterApply)return this.context.isCartPage&&this.context.couponsArr.push("dwfrm_cart_coupons_i1_deleteCoupon"),{discount:0};this.context.stackNum++,this.context.totalAfterApply=t,console.log(t,"after first apply")}else this.context.isCartPage&&(this.context.stackNum>0?this.context.couponsArr.push("dwfrm_cart_coupons_i1_deleteCoupon"):this.context.couponsArr.push("dwfrm_cart_coupons_i0_deleteCoupon"));return this.context.stackNum===this.metadata.couponAppliedNumber?(this.context.total=this.context.totalAfterApply,console.log(t,"after second apply"),{cartTotalAfterApply:this.context.total}):{discount:0}}},this.context={total:null,totalAfterApply:null,couponsArr:[],stackNum:0,isCartPage:!0}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){let t=[];if(0===u("#cart-items-form").length){this.context.isCartPage=!1;let o=yield this.functions.getCoupons();if(0===o.length)return t;for(let e of o){let o=e.couponCode;t.push(o);yield a.ajax("GET",`https://${location.host}/on/demandware.store/Sites-SANUK-US-Site/default/COBilling-RemoveCoupon`,!1,{data:{couponCode:e.uuid,format:"ajax",fromPos:!1,orderNo:null,spc:!0}})}}else{let o=u(".rowcoupons");if(0===o.length)return t;for(const e of o){const o=u(e).find(".coupon-code .value").text().trim();t.push(o);const n={dwfrm_cart_couponCode:"",dwfrm_cart_coupons_i0_deleteCoupon:"Remove Coupon"};let{response:r}=yield a.ajax("POST",u("#cart-items-form").attr("action"),!1,{"content-type":"application/x-www-form-urlencoded; charset=UTF-8",data:n});this.context.total=this.functions.getTotal(r)}console.log(this.context.total,"after delete")}return t}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){return this.context.total||(this.context.isCartPage?this.context.total=yield n.getCartTotalBySelectorLoadPage(this.metadata.cartTotalSelector):this.context.total=(yield this.functions.getCartData()).total,console.log(this.context.total,"get")),this.context.total}))}beforeApplyingCoupon(){}applyCoupon(t){return __awaiter(this,void 0,void 0,(function*(){if("FatCoupon"===t)return this.context.total=this.context.totalAfterApply,console.log(this.context.total||0,`after ${this.context.stackNum} apply`),this.context.total?{cartTotalAfterApply:this.context.total}:{discount:0};if(this.context.isCartPage){const o=a.getAllFormData(u("#cart-items-form"));o.dwfrm_cart_couponCode=t,o.dwfrm_cart_addCoupon="dwfrm_cart_addCoupon";let{error:e,response:n}=yield a.ajax("POST",u("#cart-items-form").attr("action"),!1,{data:o,contentType:"application/x-www-form-urlencoded"});if(e)throw Error(`ERROR: ${this.constructor.name}.applyCoupon() | coupon apply request error | ${e}`);if("string"==typeof n){if(u(n).find(this.metadata.errorSelector).length)return{discount:0};let t=this.functions.getTotal(n);return yield a.wait(2*c.COUPON_APPLYING.DELAY_INSIDE_ACTION),this.functions.stackingCalc(t)}return{discount:0}}{let o=yield a.ajax("GET",`https://${location.host}/on/demandware.store/Sites-SANUK-US-Site/default/COBilling-ApplyCoupon`,!1,{data:{couponCode:t,format:"ajax",fromPos:!1,orderNo:null,spc:!0}});if(o.error)throw Error(`ERROR: ${this.constructor.name}.applyCoupon() | coupon apply request error | ${o.error}`);if(0==o.response.couponStatus){const t=(yield this.functions.getCartData()).total;return yield a.wait(2*c.COUPON_APPLYING.DELAY_INSIDE_ACTION),this.functions.stackingCalc(t)}return{discount:0}}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){if(this.context.couponsArr.length){if(this.context.isCartPage)for(const t of this.context.couponsArr){const o={dwfrm_cart_couponCode:""};o[t]="Remove Coupon",yield a.ajax("POST",u("#cart-items-form").attr("action"),!1,{"content-type":"application/x-www-form-urlencoded; charset=UTF-8",data:o})}else for(const t of this.context.couponsArr)yield a.ajax("GET",`https://${location.host}/on/demandware.store/Sites-SANUK-US-Site/default/COBilling-RemoveCoupon`,!1,{data:{couponCode:t,format:"ajax",fromPos:!1,orderNo:null,spc:!0}});this.context.couponsArr.length=0}}))}}(!1)),p.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const d=window.Fatcoupon.StoreConnector})();
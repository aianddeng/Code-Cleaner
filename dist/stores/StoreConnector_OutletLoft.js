 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(o,e)=>{for(var n in e)t.o(e,n)&&!t.o(o,n)&&Object.defineProperty(o,n,{enumerable:!0,get:e[n]})},o:(t,o)=>Object.prototype.hasOwnProperty.call(t,o),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},o={};t.r(o),t.d(o,{default:()=>u});var __awaiter=function(t,o,e,n){return new(e||(e=Promise))((function(r,i){function fulfilled(t){try{step(n.next(t))}catch(t){i(t)}}function rejected(t){try{step(n.throw(t))}catch(t){i(t)}}function step(t){var o;t.done?r(t.value):(o=t.value,o instanceof e?o:new e((function(t){t(o)}))).then(fulfilled,rejected)}step((n=n.apply(t,o||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:e,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:i,UIHelpers:c,Cookies:l,Settings:a,AjaxMethod:s,Logger:p,$:d}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new r(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{dev:["5e7d6da92586a055efd71dc3"],prod:["5e82f893bd820800116c6625"]},pageSelector:".order-total",cartTotalSelector:".order-total",redirectToPageAfterApplying:location.origin+"/cart",couponAppliedNumber:2,timeouts:{collectAndClearAppliedCoupons:25e3,getCartTotal:15e3,beforeApplyingCoupon:6e3,applyCoupon:15e3,afterApplyingCoupon:15e3}},this.functions={},this.context={total:null,totalAfterApply:null,couponsArr:[],stackNum:0,device:"desktop"}}collectAndClearAppliedCoupons(t=!1){return __awaiter(this,void 0,void 0,(function*(){let t=[];const o=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent);this.context.device=o?"mobile":"desktop",d("[data-slnm-id=promotionalCodeInput]").length||(yield c.simulateClick(d(".promo-code-text"))),yield i.wait(2*a.COUPON_APPLYING.DELAY_INSIDE_ACTION);let e=d(".promo-code-loyalty");if(0===e.length)return t;for(let t of e){let o=t.innerText;o=o.substr(1,o.length-1);let e=yield i.ajax("GET",`https://${location.host}/cws/cart/removeCoupon.jsp?couponCode=${o}&device=${this.context.device}`,!1),{response:n}=e;"SUCCESS"===n.status&&(this.context.total=+n.checkout.ordSum.finalTotal),yield i.wait(4*a.COUPON_APPLYING.DELAY_INSIDE_ACTION)}return console.log(this.context.total,"after delete"),t}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){return this.context.total||(this.context.total=yield n.getCartTotalBySelector(this.metadata.cartTotalSelector),console.log(this.context.total,"get")),this.context.total}))}beforeApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}applyCoupon(t){return __awaiter(this,void 0,void 0,(function*(){if("FatCoupon"===t)return this.context.total=this.context.totalAfterApply,console.log(this.context.total||0,`after ${this.context.stackNum} apply`),this.context.total?{cartTotalAfterApply:this.context.total}:{discount:0};let o=yield i.ajax("GET",`https://${location.host}/cws/cart/claimCoupon.jsp?couponCode=${t}&loyaltyCoupon=false&device=${this.context.device}`);const{error:e,response:n}=o;if(yield i.wait(4*a.COUPON_APPLYING.DELAY_INSIDE_ACTION),"SUCCESS"===n.status){let o=i.parseUsdString(n.checkout.ordSum.finalTotal);if(o<this.context.total){if(this.context.totalAfterApply&&o>=this.context.totalAfterApply)return this.context.couponsArr.push(t),{discount:0};this.context.stackNum++,this.context.totalAfterApply=o,console.log(o,"after first apply"),yield i.wait(2*a.COUPON_APPLYING.DELAY_INSIDE_ACTION)}else this.context.couponsArr.push(t);if(this.context.stackNum===this.metadata.couponAppliedNumber)return this.context.total=this.context.totalAfterApply,console.log(o,"after second apply"),{cartTotalAfterApply:this.context.total}}return{discount:0}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){if(this.context.couponsArr.length){for(let t of this.context.couponsArr)yield i.ajax("GET",`https://${location.host}/cws/cart/removeCoupon.jsp?couponCode=${t}&device=${this.context.device}`,!1);yield i.wait(4*a.COUPON_APPLYING.DELAY_INSIDE_ACTION),this.context.couponsArr.length=0}}))}}(!1)),p.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const u=window.Fatcoupon.StoreConnector})();
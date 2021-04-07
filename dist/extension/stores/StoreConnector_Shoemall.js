 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(e,o)=>{for(var r in o)t.o(o,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:o[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{default:()=>s});var __awaiter=function(t,e,o,r){return new(o||(o=Promise))((function(n,a){function fulfilled(t){try{step(r.next(t))}catch(t){a(t)}}function rejected(t){try{step(r.throw(t))}catch(t){a(t)}}function step(t){var e;t.done?n(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(fulfilled,rejected)}step((r=r.apply(t,e||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:o,StoreConnectorHelpers:r,MultipageStoreConnectorWrapper:n,Helpers:a,Cookies:i,Logger:l,$:c}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new n(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{dev:["5edb171fa492a02558bf7f9d"],prod:["5ed0b7f057659f0011be1b66"]},pageSelector:"div.checkout-right-box-cover.clone.col-sm-12.visible-sm h3, #PromoCodeContainer label",cartTotalSelector:"div.total>span.pull-right>span",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:1e4,afterApplyingCoupon:5e3}},this.functions={getFromData:()=>__awaiter(this,void 0,void 0,(function*(){let t=yield a.ajax("GET",document.location.href,!1);if(t.error)throw Error(`ERROR: ${this.constructor.name}.getCartTotal() | cannot fetch basket data | ${t.error}`);let e={};return e=this.functions.getAllFormData(c(t.response).find("#couponform")),[e,c(t.response).find("#couponform").attr("action")]})),getAllFormData(t){var e={},o={};return t.find("input,select,textarea").each((function(t){o[t]=c(this)})),c.each(o,(function(){var t,o,r=c(this);if("submit"==r.attr("type")||"button"==r.attr("type"))return!0;if(void 0!==r.attr("name")&&""!=r.attr("name")?t=r.attr("name").trim():void 0!==r.attr("id")&&""!=r.attr("id")?t=r.attr("id").trim():void 0!==r.attr("class")&&""!=r.attr("class")&&(t=r.attr("class").trim()),void 0!==r.val()?o="checkbox"==r.attr("type")?r.parent().find('input[name="'+t+'"]:checked').val():"radio"==r.attr("type")?c('input[name="'+t+'"]:checked').val():r.val():null!=r.text()&&(o=r.text()),void 0===o&&(o=""),void 0!==t){var n=new Array;-1!==t.indexOf(" ")?n=t.split(/(\s+)/):n.push(t),c.each(n,(function(t,r){""!=(r=r.trim())&&(e[r]=o)}))}})),e}},this.context={}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){let t=[],e=c("div.successPromoCoupon>p>strong").last().text();if(0===e.length)return t;let o=e.split(" ")[2];if(t.push(o),console.log(o),0!=c(".payment-step.page-border.clearfix.review.top-mrgn-10.cursorPointerClass").length){let t=a.getAllFormData("#applyCouponForm");yield a.ajax("POST","https://www.shoemall.com/checkout/checkout.jsp?step=2",!1,{data:t})}else{let t=c("div.successPromoCoupon > a").last().attr("href");yield a.ajax("GET","https://www.shoemall.com"+t,!1)}return t}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){return yield r.getCartTotalBySelectorLoadPage(this.metadata.cartTotalSelector)}))}beforeApplyingCoupon(){}applyCoupon(t){return __awaiter(this,void 0,void 0,(function*(){if(0!=c(".payment-step.page-border.clearfix.review.top-mrgn-10.cursorPointerClass").length){let e=a.getAllFormData("#applyCouponForm");e["/atg/store/order/purchase/CouponFormHandler.couponCode"]=t;yield a.ajax("POST","https://www.shoemall.com/checkout/checkout.jsp?step=2",!1,{data:e})}else{let e=yield this.functions.getFromData();e[0]["/atg/store/order/purchase/CouponFormHandler.claimCoupon"]="submit",e[0]["/atg/store/order/purchase/CouponFormHandler.couponCode"]=t;let o=e[1];yield a.ajax("POST",`https://${location.host}${o}`,!1,{data:e[0]})}return{cartTotalAfterApply:yield this.getCartTotal()}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),l.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const s=window.Fatcoupon.StoreConnector})();
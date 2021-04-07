 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(o,e)=>{for(var n in e)t.o(e,n)&&!t.o(o,n)&&Object.defineProperty(o,n,{enumerable:!0,get:e[n]})},o:(t,o)=>Object.prototype.hasOwnProperty.call(t,o),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},o={};t.r(o),t.d(o,{default:()=>u});var __awaiter=function(t,o,e,n){return new(e||(e=Promise))((function(r,i){function fulfilled(t){try{step(n.next(t))}catch(t){i(t)}}function rejected(t){try{step(n.throw(t))}catch(t){i(t)}}function step(t){var o;t.done?r(t.value):(o=t.value,o instanceof e?o:new e((function(t){t(o)}))).then(fulfilled,rejected)}step((n=n.apply(t,o||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:e,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:i,UIHelpers:c,Cookies:s,Settings:a,AjaxMethod:p,Logger:l,$:d}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new r(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{dev:[""],prod:["5f54a25abf8efc00117e8857"]},pageSelector:"#couponField",cartTotalSelector:"#totalAmount",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:5e3,afterApplyingCoupon:1e4}},this.functions={sendRequest:(t="")=>__awaiter(this,void 0,void 0,(function*(){var o;const{error:e,response:n}=yield i.ajax("POST","/cart/updateorder",!1,{data:{"promotions[promotionName]":t,page:"cart",order_id:d("html").html().match(/"_id":(.*?),/)[1].replace(/"/g,"")},headers:{"x-csrf-token":d("[name=csrf-token]").attr("content"),noodle:d("html").html().match(/"Noodle":"(.*?)",/)[1]}});if(e)throw Error("ERROR: "+JSON.stringify(e));if(t&&(null===(o=n.response)||void 0===o?void 0:o.length)){const o=n.response[0].resource.productDiscount.details;for(const e of o)if(this.context.codes.push(e.promotionName),e.promotionName.toUpperCase()===t.toUpperCase())return-e.discountAmount}return 0}))},this.context={cartTotal:0,codes:[]}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){for(const t of d(".valid-coupon"))this.context.codes.push(d(t).text().trim());return yield this.afterApplyingCoupon(),this.context.codes}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const t=this.context.cartTotal;return this.context.cartTotal=0,l.log("getCartTotal: "+t)(),t}))}beforeApplyingCoupon(){}applyCoupon(t){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=yield this.functions.sendRequest(t),{cartTotalAfterApply:this.context.cartTotal}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){this.context.codes.length&&(yield this.functions.sendRequest()),this.context.codes=[]}))}}(!1)),l.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const u=window.Fatcoupon.StoreConnector})();
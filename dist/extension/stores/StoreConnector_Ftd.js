 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(e,o)=>{for(var r in o)t.o(o,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:o[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{default:()=>u});var __awaiter=function(t,e,o,r){return new(o||(o=Promise))((function(n,i){function fulfilled(t){try{step(r.next(t))}catch(t){i(t)}}function rejected(t){try{step(r.throw(t))}catch(t){i(t)}}function step(t){var e;t.done?n(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(fulfilled,rejected)}step((r=r.apply(t,e||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:o,StoreConnectorHelpers:r,MultipageStoreConnectorWrapper:n,Helpers:i,UIHelpers:a,Cookies:c,Settings:s,AjaxMethod:d,Logger:p,$:l}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new n(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{dev:[""],prod:["5f7056faf9e9f400110b6689"]},pageSelector:".gift-card-value-section, #gc-number-input",discountSelector:".gift-certificate-applied",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:15e3,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:15e3,afterApplyingCoupon:1e4}},this.functions={removeCode:(t="")=>__awaiter(this,void 0,void 0,(function*(){const{error:e,response:o}=yield i.ajax("DELETE",`https://api-gateway.ftd.com/ordering/ftd/api/carts/${c.readDocumentCookie("cartId")}/payments/giftcertificate/${t}`,!0,{headers:{carttoken:"bearer "+c.readDocumentCookie("cartToken"),"client-context":localStorage.getItem("client-context")}});if(e)throw Error("ERROR: "+JSON.stringify(e));null==o||o.success})),applyCode:(t="")=>__awaiter(this,void 0,void 0,(function*(){const e=l("html").html().match(/source":\["(.*?)".*?promo.*?\[(.*?)\]/)||[0,522,""],{error:o,response:r}=yield i.ajax("POST",`https://api-gateway.ftd.com/ordering/ftd/api/carts/${c.readDocumentCookie("cartId")}/payments/giftcertificate`,!0,{data:JSON.stringify({codeList:encodeURIComponent(`source: ["${e[1]}"], promo: [${e[2]?e[2]:""}]`),giftCodeId:t}),headers:{carttoken:"bearer "+c.readDocumentCookie("cartToken"),"client-context":localStorage.getItem("client-context")}});if(o)throw Error("ERROR: "+JSON.stringify(o));return(null==r?void 0:r.success)?yield this.functions.getCartData(t):0})),getCartData:(t="")=>__awaiter(this,void 0,void 0,(function*(){var e;const{error:o,response:r}=yield i.ajax("GET","/cart");if(o)throw Error("ERROR: "+JSON.stringify(o));return(null===(e=r.match(/cardNumber":"(.*?)"/))||void 0===e?void 0:e.pop().toUpperCase())===t.toUpperCase()?i.parseUsdString(l(this.metadata.discountSelector,r).first().text()):0}))},this.context={cartTotal:0}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=0,[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const t=this.context.cartTotal;return p.log("getCartTotal: "+t)(),t}))}beforeApplyingCoupon(){}applyCoupon(t){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=yield this.functions.applyCode(t),{cartTotalAfterApply:this.context.cartTotal}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),p.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const u=window.Fatcoupon.StoreConnector})();
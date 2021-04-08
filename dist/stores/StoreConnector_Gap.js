 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var o={d:(t,e)=>{for(var n in e)o.o(e,n)&&!o.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},o:(o,t)=>Object.prototype.hasOwnProperty.call(o,t),r:o=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(o,"__esModule",{value:!0})}},t={};o.r(t),o.d(t,{default:()=>u});var __awaiter=function(o,t,e,n){return new(e||(e=Promise))((function(i,r){function fulfilled(o){try{step(n.next(o))}catch(o){r(o)}}function rejected(o){try{step(n.throw(o))}catch(o){r(o)}}function step(o){var t;o.done?i(o.value):(t=o.value,t instanceof e?t:new e((function(o){o(t)}))).then(fulfilled,rejected)}step((n=n.apply(o,t||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:e,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:i,Helpers:r,UIHelpers:a,Cookies:p,Settings:c,AjaxMethod:l,Logger:d,$:s}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new i(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5e7c41ce5dbd010011bba85c","5efb812f4ac30700116c7c46","5ed0b7f057659f0011be1b5a","5f58697b5309a2001122f101","5f586a8a5309a2001122f105","5e9ea0c913920f0011cdfa63","5ed0b7f057659f0011be1b2d"]},pageSelector:"#ng-app, button#checkout-button",appliedCodeSelector:".promo-item-display-name",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:15e3,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:1e4,afterApplyingCoupon:5e3}},this.functions={removeCode:(o="")=>__awaiter(this,void 0,void 0,(function*(){yield r.ajax("POST",`/shopping-bag/xapi/remove-bag-promo-action/${this.context.token}/promo/${o}`,!0,{headers:{locale:"en_US",market:"US",brand:"AT",channel:"WEB"}})})),sendRequest:o=>__awaiter(this,void 0,void 0,(function*(){var t,e,n,i,a,p,c,l;const{error:d,response:u}=yield r.ajax("POST","/buy/resources/shoppingBag/v1/"+this.context.token,!0,{data:JSON.stringify({op:"apply",path:"/shoppingBag/applyPromo",value:o}),headers:{"bag-operation":"promo",accept:"application/json, text/plain, */*","content-type":"application/json-patch+json","x-http-method-override":"PATCH"}});if(d)throw Error(`ERROR: ${this.constructor.name}.functions.sendRequest()`);return this.context.codes=null===(e=null===(t=null==u?void 0:u.shoppingBag)||void 0===t?void 0:t.appliedPromotions)||void 0===e?void 0:e.filter(o=>!o.promoDiscountTotal&&"true"!==o.automatic).map(o=>o.code),"FatCoupon"===o&&(null===(a=null===(i=null===(n=null==u?void 0:u.shoppingBag)||void 0===n?void 0:n.appliedPromotions)||void 0===i?void 0:i.filter(o=>o.promoDiscountTotal&&"true"!==o.automatic))||void 0===a?void 0:a.length)||(null===(l=null===(c=null===(p=null==u?void 0:u.shoppingBag)||void 0===p?void 0:p.appliedPromotions)||void 0===c?void 0:c.filter(o=>o.promoDiscountTotal&&"true"!==o.automatic))||void 0===l?void 0:l.length)>=s(".product-list-container__item-container").length+1&&u.shoppingBag.appliedPromotions.map(o=>o.code.toUpperCase()).includes(o.toUpperCase())?-u.shoppingBag.appliedPromotions.filter(o=>o.promoDiscountTotal&&"true"!==o.automatic).map(o=>r.parseUsdString(o.promoDiscountTotal)).reduce((o,t)=>o+t):0}))},this.context={cartTotal:0,token:null,codes:[]}}collectAndClearAppliedCoupons(){var o,t;return __awaiter(this,void 0,void 0,(function*(){const e=[];this.context.cartTotal=0,this.context.token=null===(o=p.readDocumentCookie("unknownShopperId").match(/\w+/))||void 0===o?void 0:o.pop();for(const o of s(".promo-item-remove-button")){const n=null===(t=s(o).attr("aria-label"))||void 0===t?void 0:t.split(",").find(o=>!o.includes("promo")).trim();n&&!e.includes(n)&&(e.push(n),yield this.functions.removeCode(n))}return e}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const o=this.context.cartTotal;return d.log("getCartTotal: "+o)(),o}))}beforeApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}applyCoupon(o){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=yield this.functions.sendRequest(o),{cartTotalAfterApply:this.context.cartTotal}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){for(const o of this.context.codes)yield this.functions.removeCode(o);this.context.codes.length=0}))}}(!1)),d.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const u=window.Fatcoupon.StoreConnector})();
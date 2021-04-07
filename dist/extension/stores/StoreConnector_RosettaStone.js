 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var e={d:(t,o)=>{for(var r in o)e.o(o,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:o[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{default:()=>u});var __awaiter=function(e,t,o,r){return new(o||(o=Promise))((function(n,c){function fulfilled(e){try{step(r.next(e))}catch(e){c(e)}}function rejected(e){try{step(r.throw(e))}catch(e){c(e)}}function step(e){var t;e.done?n(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(fulfilled,rejected)}step((r=r.apply(e,t||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:o,StoreConnectorHelpers:r,MultipageStoreConnectorWrapper:n,Helpers:c,Logger:s,Cookies:a,UIHelpers:i,Settings:p,$:l}=window.Fatcoupon.ModulesImporter,checkPageAgain=()=>{for(let e=1e3;e<5e3&&(setTimeout(()=>{const e=document.createElement("div");document.body.append(e),e.remove()},e),!l("#maincontent").length);e+=1e3);};setTimeout(()=>{l("div.cart-icon").on("click",checkPageAgain)},500);window.Fatcoupon.StoreConnector=new n(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5f574dee5309a2001122f034"]},pageSelector:"#maincontent .promo-container",cartTotalSelector:".grand_total strong",timeouts:{collectAndClearAppliedCoupons:15e3,getCartTotal:15e3,beforeApplyingCoupon:15e3,applyCoupon:15e3,afterApplyingCoupon:15e3}},this.functions={getCodes:()=>{if(this.context.codes.length)return this.context.codes;let e=l("script");for(var t=0;t<e.length;t++)if(l(e[t]).text()){debugger;if(-1!==l(e[t]).text().search(/rs.promo/)){debugger;this.context.codes=c.substringBetween(l(e[t]).text(),"rs.promo","rs.pixp_promo");break}}}},this.context={cartTotal:null,cartTotalAfterApply:null,codes:[]}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){return this.functions.getCodes(),[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){if(this.context.cartTotalAfterApply)return this.context.cartTotalAfterApply;let e=yield c.ajax("GET","https://secure.rosettastone.com/us_en_store_view/checkout/cart/",!1),{error:t,response:o}=e;if(t)throw Error(`ERROR: ${this.constructor.name}.collectAndClearAppliedCoupons() | coupon apply request error | ${t}`);let r=+c.parseUsdString(l(o).find(this.metadata.cartTotalSelector).text());return console.log(r,"get"),r}))}beforeApplyingCoupon(){}applyCoupon(e){return __awaiter(this,void 0,void 0,(function*(){const t=new URL("https://secure.rosettastone.com/us_en_store_view/checkout/cart/verifypromo/");this.functions.getCodes(),t.searchParams.set("coupon_code",this.context.codes),t.searchParams.set("last_code",e),t.searchParams.set("remove_coupon","0");let o=(new Date).getTime();t.searchParams.set("_",""+o);const{error:r,response:n}=yield c.ajax("GET",t.href,!0,{headers:{accept:"application/json, text/javascript, */*; q=0.01"}});return n.valid?{discount:0}:(this.context.cartTotalAfterApply=yield this.getCartTotal(),{cartTotalAfterApply:this.context.cartTotal})}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),s.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const u=window.Fatcoupon.StoreConnector})();
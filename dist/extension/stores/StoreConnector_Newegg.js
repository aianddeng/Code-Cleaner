 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var o={d:(t,e)=>{for(var n in e)o.o(e,n)&&!o.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},o:(o,t)=>Object.prototype.hasOwnProperty.call(o,t),r:o=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(o,"__esModule",{value:!0})}},t={};o.r(t),o.d(t,{default:()=>u});var __awaiter=function(o,t,e,n){return new(e||(e=Promise))((function(r,i){function fulfilled(o){try{step(n.next(o))}catch(o){i(o)}}function rejected(o){try{step(n.throw(o))}catch(o){i(o)}}function step(o){var t;o.done?r(o.value):(t=o.value,t instanceof e?t:new e((function(o){o(t)}))).then(fulfilled,rejected)}step((n=n.apply(o,t||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:e,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:i,UIHelpers:a,Cookies:c,Settings:s,AjaxMethod:p,Logger:d,$:l}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new r(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5e9fe7a2c571ab001124bf45"]},pageSelector:".add-new-accordion-body, .item-title:contains(Promo Code)",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:1e4,afterApplyingCoupon:1e4}},this.functions={sendRequest:(o="",t=!0)=>__awaiter(this,void 0,void 0,(function*(){var e,n;const r=location.hostname.includes("m.newegg.com"),{error:a,response:c}=yield i.ajax("POST",r?"/m/ajax/initCartApi?params="+encodeURIComponent("CountryCode=USA&LanguageCode=en-US&RegionCode=USA"):"/shop/api/InitCartApi",!0,{data:JSON.stringify({Actions:[{ActionType:"InputPCode",JsonContent:JSON.stringify({ActionType:"InputPCode",[t?"Remove":"Append"]:[r?o:{PCode:o}]})}]})});if(a)throw Error("ERROR: "+JSON.stringify(a));if(o&&c){const t=(null===(e=null==c?void 0:c.CartInfo)||void 0===e?void 0:e.PromotionCodeInfos)||(null===(n=null==c?void 0:c.SummaryInfo)||void 0===n?void 0:n.PromotionCodeInfos);for(const e of t)if(this.context.applied.push(e.PromotionCode),e.PromotionCode.toUpperCase()===o.toUpperCase())return-e.TotalDiscount}return 0}))},this.context={cartTotal:0,applied:[]}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=0,yield this.functions.sendRequest(),yield this.afterApplyingCoupon(),[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const o=this.context.cartTotal;return d.log("getCartTotal: "+o)(),o}))}beforeApplyingCoupon(){}applyCoupon(o){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=yield this.functions.sendRequest(o,!1),{cartTotalAfterApply:this.context.cartTotal}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){for(const o of this.context.applied)yield this.functions.sendRequest(o);this.context.applied.length=0}))}}(!1)),d.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const u=window.Fatcoupon.StoreConnector})();
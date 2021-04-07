 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(o,e)=>{for(var r in e)t.o(e,r)&&!t.o(o,r)&&Object.defineProperty(o,r,{enumerable:!0,get:e[r]})},o:(t,o)=>Object.prototype.hasOwnProperty.call(t,o),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},o={};t.r(o),t.d(o,{default:()=>p});var __awaiter=function(t,o,e,r){return new(e||(e=Promise))((function(a,n){function fulfilled(t){try{step(r.next(t))}catch(t){n(t)}}function rejected(t){try{step(r.throw(t))}catch(t){n(t)}}function step(t){var o;t.done?a(t.value):(o=t.value,o instanceof e?o:new e((function(t){t(o)}))).then(fulfilled,rejected)}step((r=r.apply(t,o||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:e,StoreConnectorHelpers:r,MultipageStoreConnectorWrapper:a,Helpers:n,UIHelpers:c,Cookies:l,Settings:i,AjaxMethod:u,Logger:s,$:d}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new a(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5e8c10e782e5bf0011e5a68c"]},pageSelector:"#couponFld",cartTotalSelector:"strong#estimatedTotal",cartValueSelector:"span#orderSubTotal",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:1e4,beforeApplyingCoupon:1e4,applyCoupon:1e4,afterApplyingCoupon:1e4}},this.functions={},this.context={cartValue:null,cartTotal:null,cartTotalAfterApply:null,uuids:null}}collectAndClearAppliedCoupons(){var t,o;return __awaiter(this,void 0,void 0,(function*(){this.context.cartTotal=yield r.getCartTotalBySelector(this.metadata.cartTotalSelector),this.context.cartValue=yield r.getCartTotalBySelector(this.metadata.cartValueSelector),this.context.cartTotalAfterApply=0;let e=[];if(this.context.uuids)e=this.context.uuids;else for(const t of d(".js-remove-coupon")){let o=d(t).attr("data-uuid");e.push(o)}for(const r of e){let{error:e,response:a}=yield n.ajax("POST",(null===(t=d("html").html().match(/"cartAPI":"(.*?)"/))||void 0===t?void 0:t.pop())||"/on/demandware.store/Sites-crocs_us-Site/default/Cart-API",!1,{data:{uuid:r,action:"removecoupon",updates:"approaching|promos|shipping|delivery"}});if(e)throw Error(`ERROR: ${this.constructor.name}.collectAndClearAppliedCoupons() | coupon reset request error | ${e}`);(null===(o=null==a?void 0:a.data)||void 0===o?void 0:o.cartTotal)&&(this.context.cartTotal=a.data.cartTotal||0,this.context.cartValue=a.data.cartValue||0)}return[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const t=this.context.cartTotalAfterApply||this.context.cartTotal;return s.log("getCartTotal: "+t)(),t}))}beforeApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}applyCoupon(t){var o,e,r,a;return __awaiter(this,void 0,void 0,(function*(){const{error:c,response:l}=yield n.ajax("POST",(null===(o=d("html").html().match(/"cartAPI":"(.*?)"/))||void 0===o?void 0:o.pop())||"/on/demandware.store/Sites-crocs_us-Site/default/Cart-API",!1,{data:{coupon:t,action:"addcoupon",updates:"approaching|promos|shipping|delivery"}});if(c)throw Error(`ERROR: ${this.constructor.name}.collectAndClearAppliedCoupons() | coupon reset request error | ${c}`);return(null===(r=null===(e=null==l?void 0:l.data)||void 0===e?void 0:e.cartPromos)||void 0===r?void 0:r.couponItemPromos)&&(this.context.uuids=l.data.cartPromos.couponItemPromos.map(t=>t.uuid)),(null===(a=null==l?void 0:l.data)||void 0===a?void 0:a.cartTotal)&&l.data.cartTotal<this.context.cartTotal?(this.context.cartTotalAfterApply=this.context.cartTotal-Math.max(this.context.cartTotal-l.data.cartTotal,this.context.cartValue-l.data.cartValue,l.data.cartItems.map(t=>t.unitPromoDiscount).concat(0).reduce((t,o)=>t+o,0)),{cartTotalAfterApply:this.context.cartTotalAfterApply}):{discount:0}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){this.context.uuids&&(yield this.collectAndClearAppliedCoupons()),this.context.uuids=null}))}}(!1)),s.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const p=window.Fatcoupon.StoreConnector})();
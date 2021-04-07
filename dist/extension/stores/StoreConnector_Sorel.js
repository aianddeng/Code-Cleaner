 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var o={d:(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o:(o,e)=>Object.prototype.hasOwnProperty.call(o,e),r:o=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(o,"__esModule",{value:!0})}},e={};o.r(e),o.d(e,{default:()=>p});var __awaiter=function(o,e,t,n){return new(t||(t=Promise))((function(r,i){function fulfilled(o){try{step(n.next(o))}catch(o){i(o)}}function rejected(o){try{step(n.throw(o))}catch(o){i(o)}}function step(o){var e;o.done?r(o.value):(e=o.value,e instanceof t?e:new t((function(o){o(e)}))).then(fulfilled,rejected)}step((n=n.apply(o,e||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:t,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:i,UIHelpers:a,Cookies:c,Settings:d,AjaxMethod:s,Logger:l,$:u}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new r(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5fead78794204e00119a5ac2"]},pageSelector:"#couponCode:visible, .active .gift-card-promo-toggle:visible, .promo-code-control:visible",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:1e4,afterApplyingCoupon:1e4}},this.functions={removeCode:(o="",e="")=>__awaiter(this,void 0,void 0,(function*(){return yield i.ajax("GET","/on/demandware.store/Sites-Sorel_US-Site/en_US/Cart-RemoveCouponLineItem",!1,{data:{code:o,uuid:e}}),!0})),sendRequest:(o="")=>__awaiter(this,void 0,void 0,(function*(){var e,t;const{error:n,response:r}=yield i.ajax("GET","/on/demandware.store/Sites-Sorel_US-Site/en_US/Cart-AddCoupon",!1,{data:{csrf_token:u("[name=csrf_token]").first().val(),couponCode:o}});if(n)throw Error("ERROR: "+JSON.stringify(n));if(null===(t=null===(e=null==r?void 0:r.totals)||void 0===e?void 0:e.discounts)||void 0===t?void 0:t.length)for(const e of r.totals.discounts)if(e.valid&&e.applied&&e.couponCode.toUpperCase()===o.toUpperCase())return-Math.abs(e.relationship.map(o=>o.basePrice).reduce((o,e)=>o+e));return 0}))},this.context={cartTotal:0}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){const o=[];this.context.cartTotal=0;for(const e of u("[data-uuid][data-code]")){const t=u(e).attr("data-code"),n=u(e).attr("data-uuid");o.push(t),yield this.functions.removeCode(t,n)}return o}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const o=this.context.cartTotal;return l.log("getCartTotal: "+o)(),o}))}beforeApplyingCoupon(){}applyCoupon(o){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=yield this.functions.sendRequest(o),{cartTotalAfterApply:this.context.cartTotal}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),l.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const p=window.Fatcoupon.StoreConnector})();
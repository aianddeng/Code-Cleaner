 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var o={d:(t,e)=>{for(var n in e)o.o(e,n)&&!o.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},o:(o,t)=>Object.prototype.hasOwnProperty.call(o,t),r:o=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(o,"__esModule",{value:!0})}},t={};o.r(t),o.d(t,{default:()=>s});var __awaiter=function(o,t,e,n){return new(e||(e=Promise))((function(r,i){function fulfilled(o){try{step(n.next(o))}catch(o){i(o)}}function rejected(o){try{step(n.throw(o))}catch(o){i(o)}}function step(o){var t;o.done?r(o.value):(t=o.value,t instanceof e?t:new e((function(o){o(t)}))).then(fulfilled,rejected)}step((n=n.apply(o,t||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:e,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:i,UIHelpers:a,Cookies:c,Settings:d,AjaxMethod:l,Logger:u,$:p}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new r(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{dev:[""],prod:["5f0e351accf44c0011711c8a"]},pageSelector:"#promo-code-input-container:visible",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:1e4,afterApplyingCoupon:5e3}},this.functions={sendRequest:(o="")=>__awaiter(this,void 0,void 0,(function*(){var t,e,n;const r=p("input[name='_token']").first().attr("value"),{response:a}=yield i.ajax("POST","/getCookie",!1,{data:{_token:r}}),{error:c,response:d}=yield i.ajax("POST","/apply-discount",!1,{data:{unique_id:a,_token:r,discount_code:o}});if(c)throw Error("ERROR: "+JSON.stringify(c));return(null===(e=null===(t=null==d?void 0:d.data)||void 0===t?void 0:t.discount_code)||void 0===e?void 0:e.toUpperCase())===o.toUpperCase()?-(null===(n=null==d?void 0:d.data)||void 0===n?void 0:n.discount):0}))},this.context={cartTotal:0}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=0,[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const o=this.context.cartTotal;return u.log("getCartTotal: "+o)(),o}))}beforeApplyingCoupon(){}applyCoupon(o){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=yield this.functions.sendRequest(o),{cartTotalAfterApply:this.context.cartTotal}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),u.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const s=window.Fatcoupon.StoreConnector})();
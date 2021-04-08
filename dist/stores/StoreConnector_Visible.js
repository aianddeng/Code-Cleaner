 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(e,o)=>{for(var n in o)t.o(o,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:o[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{default:()=>u});var __awaiter=function(t,e,o,n){return new(o||(o=Promise))((function(r,i){function fulfilled(t){try{step(n.next(t))}catch(t){i(t)}}function rejected(t){try{step(n.throw(t))}catch(t){i(t)}}function step(t){var e;t.done?r(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(fulfilled,rejected)}step((n=n.apply(t,e||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:o,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:i,UIHelpers:a,Cookies:c,Settings:s,AjaxMethod:p,Logger:d,$:l}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new r(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5ff13a66ba3659001194d3af"]},pageSelector:"[data-testid=promotion-input]",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:1e4,afterApplyingCoupon:1e4}},this.functions={sendRequest:(t="",e=!0)=>__awaiter(this,void 0,void 0,(function*(){var o,n,r;const{error:a,response:s}=yield i.ajax("POST","https://api.bevisible.com/v1/bag/"+(e?"removeItems":"addItems"),!0,{data:JSON.stringify({items:[e?{id:t}:{code:t,type:"promo"}]}),headers:{authorization:"Bearer RAGSKsKEtCIoiDrwoRud61WjLFuj",cartid:c.readDocumentCookie("cartId")}});if(!e&&(null===(o=s.content.promosAdded)||void 0===o?void 0:o.map(t=>t.toUpperCase()).includes(t.toUpperCase())))try{return this.context.cartTotal-s.content.bag.items.map(e=>e.plan.discounts.filter(e=>e.name.toUpperCase()===t.toUpperCase()).map(t=>t.discount).reduce((t,e)=>t+e)).reduce((t,e)=>t+e)}catch(t){}return(null===(r=null===(n=null==s?void 0:s.content)||void 0===n?void 0:n.bag)||void 0===r?void 0:r.dueTodayTotal)||this.context.cartTotal||0}))},this.context={cartTotal:0,cartTotalAfterApply:0}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){this.context.cartTotal=yield this.functions.sendRequest("FakeCoupon",!1),this.context.cartTotalAfterApply=0;for(const t of l("[class*=PromoContainerWrapper] [data-testid*=Promo]")){const e=t.getAttribute("title").trim();this.context.cartTotal=yield this.functions.sendRequest("promo_"+e)}return[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const t=this.context.cartTotalAfterApply||this.context.cartTotal||0;return d.log("getCartTotal: "+t)(),t}))}beforeApplyingCoupon(){}applyCoupon(t){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotalAfterApply=yield this.functions.sendRequest(t,!1),{cartTotalAfterApply:this.context.cartTotalAfterApply}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),d.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const u=window.Fatcoupon.StoreConnector})();
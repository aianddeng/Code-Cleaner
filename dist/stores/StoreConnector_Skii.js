 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(e,o)=>{for(var r in o)t.o(o,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:o[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{default:()=>p});var __awaiter=function(t,e,o,r){return new(o||(o=Promise))((function(n,a){function fulfilled(t){try{step(r.next(t))}catch(t){a(t)}}function rejected(t){try{step(r.throw(t))}catch(t){a(t)}}function step(t){var e;t.done?n(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(fulfilled,rejected)}step((r=r.apply(t,e||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:o,StoreConnectorHelpers:r,MultipageStoreConnectorWrapper:n,Helpers:a,UIHelpers:i,Cookies:c,Settings:l,AjaxMethod:s,Logger:d,$:u}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new n(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{dev:[""],prod:["5ff166333bc39b00110266ed"]},pageSelector:"#couponcode:visible, [data-cart-totals]",cartTotalSelector:".cart-total-grandTotal",removeSelector:".cart-total a[href*=removecoupon]",reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:15e3,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:15e3,afterApplyingCoupon:1e4}},this.functions={getCartPage:()=>__awaiter(this,void 0,void 0,(function*(){const{error:t,response:e}=yield a.ajax("GET","/cart.php");if(t)throw Error("ERROR: "+JSON.stringify(t));return this.context.html=e,a.parseUsdString(u(this.metadata.cartTotalSelector,e).first().text())||this.context.cartTotal||0})),sendRequest:(t="")=>__awaiter(this,void 0,void 0,(function*(){var e,o;const r=(null===(e=u("html").html().match(/csrf_token":"(.*?)"/))||void 0===e?void 0:e.pop())||"",{error:n,response:i}=yield a.ajax("POST","/remote/v1/apply-code",!1,{data:{code:t},headers:{"x-xsrf-token":new Array(3).fill(r).join(", ")}});if(t&&"success"===(null===(o=null==i?void 0:i.data)||void 0===o?void 0:o.status)){const t=(yield this.functions.getCartPage())||this.context.cartTotal||0;return t===this.context.cartTotal?t-45:t}return this.context.cartTotal||0})),removeCode:(t="")=>__awaiter(this,void 0,void 0,(function*(){const{error:e,response:o}=yield a.ajax("GET",t);if(e)throw Error("ERROR: "+JSON.stringify(e))}))},this.context={cartTotal:0,cartTotalAfterApply:0,html:null}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){if(u(this.metadata.removeSelector,this.context.html||document).length)for(const t of u(this.metadata.removeSelector,this.context.html||document))yield this.functions.removeCode(u(t).attr("href"));return this.context.cartTotal=yield this.functions.getCartPage(),this.context.cartTotalAfterApply=0,[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const t=this.context.cartTotal;return d.log("getCartTotal: "+t)(),t}))}beforeApplyingCoupon(){}applyCoupon(t){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=yield this.functions.sendRequest(t),{cartTotalAfterApply:this.context.cartTotal}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),d.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const p=window.Fatcoupon.StoreConnector})();
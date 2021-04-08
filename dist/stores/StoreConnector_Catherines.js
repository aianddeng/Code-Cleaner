 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(o,e)=>{for(var n in e)t.o(e,n)&&!t.o(o,n)&&Object.defineProperty(o,n,{enumerable:!0,get:e[n]})},o:(t,o)=>Object.prototype.hasOwnProperty.call(t,o),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},o={};t.r(o),t.d(o,{default:()=>p});var __awaiter=function(t,o,e,n){return new(e||(e=Promise))((function(r,i){function fulfilled(t){try{step(n.next(t))}catch(t){i(t)}}function rejected(t){try{step(n.throw(t))}catch(t){i(t)}}function step(t){var o;t.done?r(t.value):(o=t.value,o instanceof e?o:new e((function(t){t(o)}))).then(fulfilled,rejected)}step((n=n.apply(t,o||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:e,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:i,UIHelpers:a,Cookies:c,Settings:s,AjaxMethod:u,Logger:d,$:l}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new r(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5ff131a1ba3659001194d16b"]},pageSelector:".cart-message, .couponsection.tab-section",cartTotalSelector:".order-value.value",reloadPageAfterApplying:!1,redirectToPageAfterApplying:location.pathname.includes("checkout")?location.origin+"/checkout":location.origin+"/cart",timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:1e4,beforeApplyingCoupon:1e4,applyCoupon:1e4,afterApplyingCoupon:1e4}},this.functions={removeCode:(t="")=>__awaiter(this,void 0,void 0,(function*(){const{response:o,error:e}=yield i.ajax("POST","/on/demandware.store/Sites-oss-Site/default/Cart-RemoveCouponJson",!1,{data:{uuid:t,format:"ajax"}});if(e)throw Error("ERROR: "+JSON.stringify(e));if(o)return i.parseUsdString(l(".customBasketTotal","<div>"+o+"</div>").val())||this.context.cartTotal||0})),sendRequest:(t="")=>__awaiter(this,void 0,void 0,(function*(){const{error:o,response:e}=yield i.ajax("GET","/on/demandware.store/Sites-oss-Site/default/Cart-AddCouponJson",!1,{data:{couponCode:t,format:"ajax"}});if(o)throw Error("ERROR: "+JSON.stringify(o));if(e){this.context.uuid.length=0;for(const t of l("[data-uuid]","<div>"+e+"</div>"))this.context.uuid.push(l(t).attr("data-uuid"));return i.parseUsdString(l(".customBasketTotal","<div>"+e+"</div>").val())||this.context.cartTotal||0}return this.context.cartTotal||0}))},this.context={uuid:[],cartTotal:0,cartTotalAfterApply:0}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotalAfterApply=0,this.context.cartTotal=yield this.functions.sendRequest(),this.context.uuid&&(yield this.afterApplyingCoupon()),[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const t=this.context.cartTotalAfterApply||this.context.cartTotal;return d.log("getCartTotal: "+t)(),t}))}beforeApplyingCoupon(){}applyCoupon(t){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotalAfterApply=yield this.functions.sendRequest(t),{cartTotalAfterApply:this.context.cartTotalAfterApply}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){for(const t of this.context.uuid)this.context.cartTotal=yield this.functions.removeCode(t);this.context.uuid.length=0}))}}(!1)),d.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const p=window.Fatcoupon.StoreConnector})();
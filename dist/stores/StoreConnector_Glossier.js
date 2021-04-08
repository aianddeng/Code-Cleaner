 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var t={d:(o,e)=>{for(var n in e)t.o(e,n)&&!t.o(o,n)&&Object.defineProperty(o,n,{enumerable:!0,get:e[n]})},o:(t,o)=>Object.prototype.hasOwnProperty.call(t,o),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},o={};t.r(o),t.d(o,{default:()=>u});var __awaiter=function(t,o,e,n){return new(e||(e=Promise))((function(r,a){function fulfilled(t){try{step(n.next(t))}catch(t){a(t)}}function rejected(t){try{step(n.throw(t))}catch(t){a(t)}}function step(t){var o;t.done?r(t.value):(o=t.value,o instanceof e?o:new e((function(t){t(o)}))).then(fulfilled,rejected)}step((n=n.apply(t,o||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:e,StoreConnectorHelpers:n,MultipageStoreConnectorWrapper:r,Helpers:a,UIHelpers:i,Cookies:c,Settings:s,AjaxMethod:l,Logger:p,$:d}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new r(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5f3cac088863980016d7a7cf"]},pageSelector:'[class^=CartScrollWindow] [color=validated]+button, button:contains("promo code"):visible,#promo-code:visible',reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:1e5,getCartTotal:1e5,beforeApplyingCoupon:5e3,applyCoupon:1e5,afterApplyingCoupon:1e4}},this.functions={getTotalPrice(t=null){return __awaiter(this,void 0,void 0,(function*(){if(null==t){const o=JSON.parse(localStorage.getItem("cache:glossier:cart"));this.cartData=o,t=yield a.ajax("GET",this.cartServiceUrl+"carts/"+o.id,!1,{headers:{authorization:"Bearer "+this.token}})}return t.response.totals.promotion/100}))},fetchToken(){return __awaiter(this,void 0,void 0,(function*(){const t=yield a.ajax("GET","https://www.glossier.com/api/client-session",!1);this.token=t.response.token}))},cartServiceUrl:"",campaignServiceUrl:"",token:"",cartData:{}},this.context={cartTotal:0}}collectAndClearAppliedCoupons(t=!1){return __awaiter(this,void 0,void 0,(function*(){this.context.cartTotal=0,d("[class^=CartScrollWindow] [color=validated]+button").length&&(yield i.simulateClick(d("[class^=CartScrollWindow] [color=validated]+button")),yield Promise.race([a.wait(6e3),a.waitForDisappear("[class^=CartScrollWindow] [color=validated]+button")]));const t=yield a.runCodeAtPageContext("callback(window.__routeInfo)");this.functions.cartServiceUrl="https://2c35w4rlf8.execute-api.us-east-1.amazonaws.com/prod/",this.functions.campaignServiceUrl=t.sharedData.config.campaign_service_url,yield this.functions.fetchToken(),yield this.functions.getTotalPrice();const o=this.functions.cartData;return(o.promotion?o.promotion.couponCode:null)&&(o.promotion={},o.totals.total+=o.totals.promotion,o.totals.promotion+=o.totals.promotion,delete o.totals.promotion,yield a.ajax("POST",this.functions.cartServiceUrl+"taxes",!0,{data:JSON.stringify(o),headers:{authorization:"Bearer "+this.functions.token}})),[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const t=this.context.cartTotal;return p.log("getCartTotal: "+t)(),t}))}beforeApplyingCoupon(){}applyCoupon(t){return __awaiter(this,void 0,void 0,(function*(){const o=this.functions.cartData;o.promotion={couponCode:t};let e=yield a.ajax("POST",this.functions.campaignServiceUrl+"apply",!0,{data:JSON.stringify(o),headers:{authorization:"Bearer "+this.functions.token}}),n=0;return e.response.forEach(e=>{if("activatedCampaign"==e.name)o.promotion={couponCode:t,activated:e.properties},o.promotion.activated.promotionType="couponCode",delete o.promotion.activated.type;else if("setDiscountPerItem"==e.name){const t=e.properties.amount;n=Math.round(o.totals.subtotal*t/100),o.totals.promotion=n,o.totals.total-=n,o.totals.payment-=n}}),e=yield a.ajax("POST",this.functions.cartServiceUrl+"carts",!0,{data:JSON.stringify(o),headers:{authorization:"Bearer "+this.functions.token}}),this.context.cartTotal=-Math.abs(yield this.functions.getTotalPrice()),{cartTotalAfterApply:this.context.cartTotal}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),p.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const u=window.Fatcoupon.StoreConnector})();
 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var e={d:(t,o)=>{for(var r in o)e.o(o,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:o[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{default:()=>l});var __awaiter=function(e,t,o,r){return new(o||(o=Promise))((function(n,i){function fulfilled(e){try{step(r.next(e))}catch(e){i(e)}}function rejected(e){try{step(r.throw(e))}catch(e){i(e)}}function step(e){var t;e.done?n(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(fulfilled,rejected)}step((r=r.apply(e,t||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:o,MultipageStoreConnectorWrapper:r,Helpers:n,Settings:i,Logger:a,$:s}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new r(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{dev:["5e79886e23aa402d91a55ba9"],prod:["5e7c4c745dbd010011bba86a"]},pageSelector:".c-checkout .OrderSummary",cartTotalSelector:".OrderSummary-list > .total ~ .value",reloadPageBeforeApplying:!1,reloadPageAfterApplying:!0,timeouts:{collectAndClearAppliedCoupons:3e4,getCartTotal:3e4,beforeApplyingCoupon:1e4,applyCoupon:3e4,afterApplyingCoupon:3e4}},this.functions={getToken:()=>__awaiter(this,void 0,void 0,(function*(){let e=yield n.runCodeAtPageContext("\n          callback(window.footlocker.globalstore.getState().session.csrfToken);\n        ");if(!e)throw Error("ERROR: token not found");return e})),getRemoveBtn:()=>{let e=s("button.remove");return 0!==e.length&&e.attr("title").split(" ")[1]}},this.context={appliedCoupon:null}}collectAndClearAppliedCoupons(e=!1){return __awaiter(this,void 0,void 0,(function*(){let t=[];yield n.wait(2*i.COUPON_APPLYING.DELAY_INSIDE_ACTION);let o=this.functions.getRemoveBtn();return e&&this.context.appliedCoupon&&t.push(this.context.appliedCoupon),o&&(yield n.ajax("DELETE",`https://${location.host}/api/users/carts/current/vouchers/${o}?timestamp=${Date.now()}`,!0,{headers:{"content-type":"application/json","x-csrf-token":yield this.functions.getToken(),"x-fl-request-id":n.generateUUIDv4()}})),yield n.wait(6*i.COUPON_APPLYING.DELAY_INSIDE_ACTION),t}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){let e=yield n.ajax("GET",`https://${location.host}/api/users/carts/current?timestamp=${Date.now()}`,!0,{headers:{"content-type":"application/json","x-csrf-token":yield this.functions.getToken(),"x-fl-request-id":n.generateUUIDv4()}});if(e.error)throw Error(`ERROR: ${this.constructor.name}.getCartTotal() | get cart request error | ${e.error}`);return console.log(e.response.totalPrice.value),e.response.totalPrice.value}))}beforeApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}applyCoupon(e){return __awaiter(this,void 0,void 0,(function*(){yield n.wait(2*i.COUPON_APPLYING.DELAY_INSIDE_ACTION);let t=yield n.ajax("POST",`https://${location.host}/api/users/carts/current/vouchers?timestamp=${Date.now()}`,!1,{headers:{"content-type":"application/json","x-csrf-token":yield this.functions.getToken(),"x-fl-request-id":n.generateUUIDv4()},data:JSON.stringify({voucherId:e})});if(yield n.wait(10*i.COUPON_APPLYING.DELAY_INSIDE_ACTION),t.error){if(t.error.jqXHR.responseJSON&&t.error.jqXHR.responseJSON.errors)return{discount:0};throw Error(`ERROR: ${this.constructor.name}.applyCoupon() | apply coupon request error | ${JSON.stringify(t.error)}`)}return this.context.appliedCoupon=e,{cartTotalAfterApply:yield this.getCartTotal()}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){this.context.appliedCoupon&&(yield this.collectAndClearAppliedCoupons(!0))}))}}(!1)),a.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const l=window.Fatcoupon.StoreConnector})();
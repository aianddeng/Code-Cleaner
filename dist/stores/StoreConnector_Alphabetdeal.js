 /**************************
 * Time: 07.04.21 13:35:56 *
 * Host: iMac-P            *
 * User: undefined         *
 **************************/

(()=>{"use strict";var o={d:(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o:(o,e)=>Object.prototype.hasOwnProperty.call(o,e),r:o=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(o,"__esModule",{value:!0})}},e={};o.r(e),o.d(e,{default:()=>d});var __awaiter=function(o,e,t,r){return new(t||(t=Promise))((function(n,i){function fulfilled(o){try{step(r.next(o))}catch(o){i(o)}}function rejected(o){try{step(r.throw(o))}catch(o){i(o)}}function step(o){var e;o.done?n(o.value):(e=o.value,e instanceof t?e:new t((function(o){o(e)}))).then(fulfilled,rejected)}step((r=r.apply(o,e||[])).next())}))};if(!window.Fatcoupon||!window.Fatcoupon.ModulesImporter)throw Error("window.Fatcoupon.ModulesImporter not set, store connector injection failed");const{StoreConnector,StoreConnectorFunctionResult:t,StoreConnectorHelpers:r,MultipageStoreConnectorWrapper:n,Helpers:i,UIHelpers:a,Cookies:s,Settings:c,AjaxMethod:p,Logger:l,$:u}=window.Fatcoupon.ModulesImporter;window.Fatcoupon.StoreConnector=new n(new class extends StoreConnector{constructor(){super(...arguments),this.metadata={storeIds:{prod:["5ef16d7df627230011e687d1"]},pageSelector:"#apply-coupon:visible, #txtPopupPromocode:visible",reloadPageAfterApplying:!1,timeouts:{collectAndClearAppliedCoupons:1e4,getCartTotal:5e3,beforeApplyingCoupon:5e3,applyCoupon:1e4,afterApplyingCoupon:1e4}},this.functions={sendRequest:(o="")=>__awaiter(this,void 0,void 0,(function*(){return u("#txtsPromocode, #mb-txtsPromocode, #txtPopupPromocode").val(o),yield i.runCodeAtPageContext("\n                try{\n                    validatesCoupon('notmobile');\n                }catch{}\n                try{\n                    validateCoupons();\n                }catch{}\n                callback(true);\n            "),yield i.waitForDisappear("#loading:visible"),yield Promise.race([i.waitFor("#promosLabelSuccess:visible, #promosLabelError:visible, #PopuppromoLabelError:visible, #PopuppromoLabelSuccess:visible"),i.wait(2e3)]),u("#txtsPromocode, #mb-txtsPromocode").length&&(yield i.runCodeAtPageContext("\n                    try{\n                        GetCartItemList();\n                    }catch{}\n                    callback(true);\n                "),yield i.waitForDisappear("#loading:visible"),yield Promise.race([i.waitFor("#promosLabelSuccess:visible, #promosLabelError:visible, #PopuppromoLabelError:visible, #PopuppromoLabelSuccess:visible"),i.wait(2e3)]),u("#txtsPromocode, #mb-txtsPromocode, #txtPopupPromocode").val().toUpperCase()===o.toUpperCase())||u("#txtsPromocode, #mb-txtsPromocode, #txtPopupPromocode").attr("value").toUpperCase()===o.toUpperCase()?-Math.abs(i.parseUsdString(u("#TotalPromoDiscounts, #Reg_TotalPromoDiscount").first().text())):0}))},this.context={cartTotal:0}}collectAndClearAppliedCoupons(){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=0,[]}))}getCartTotal(){return __awaiter(this,void 0,void 0,(function*(){const o=this.context.cartTotal;return l.log("getCartTotal: "+o)(),o}))}beforeApplyingCoupon(){}applyCoupon(o){return __awaiter(this,void 0,void 0,(function*(){return this.context.cartTotal=yield this.functions.sendRequest(o),{cartTotalAfterApply:this.context.cartTotal}}))}afterApplyingCoupon(){return __awaiter(this,void 0,void 0,(function*(){}))}}(!1)),l.borderedMessage("FatCoupon: store connector injected!","#a3cc91");const d=window.Fatcoupon.StoreConnector})();
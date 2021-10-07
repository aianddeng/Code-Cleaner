/**************************************
 * File: StoreConnector_CoachOutlet.js *
 * Time: 07.10.21 18:16:36             *
 * Host: iBook.local                   *
 * User: chase                         *
 **************************************/

;(() => {
  'use strict'
  var t = {
      d: (o, e) => {
        for (var n in e)
          t.o(e, n) &&
            !t.o(o, n) &&
            Object.defineProperty(o, n, { enumerable: !0, get: e[n] })
      },
      o: (t, o) => Object.prototype.hasOwnProperty.call(t, o),
      r: (t) => {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(t, '__esModule', { value: !0 })
      },
    },
    o = {}
  t.r(o), t.d(o, { default: () => p })
  var __awaiter = function (t, o, e, n) {
    return new (e || (e = Promise))(function (r, a) {
      function fulfilled(t) {
        try {
          step(n.next(t))
        } catch (t) {
          a(t)
        }
      }
      function rejected(t) {
        try {
          step(n.throw(t))
        } catch (t) {
          a(t)
        }
      }
      function step(t) {
        var o
        t.done
          ? r(t.value)
          : ((o = t.value),
            o instanceof e
              ? o
              : new e(function (t) {
                  t(o)
                })).then(fulfilled, rejected)
      }
      step((n = n.apply(t, o || [])).next())
    })
  }
  if (!window.Fatcoupon || !window.Fatcoupon.ModulesImporter)
    throw Error(
      'window.Fatcoupon.ModulesImporter not set, store connector injection failed'
    )
  const {
    StoreConnector,
    StoreConnectorFunctionResult: e,
    StoreConnectorHelpers: n,
    MultipageStoreConnectorWrapper: r,
    Helpers: a,
    UIHelpers: i,
    Cookies: d,
    Settings: l,
    AjaxMethod: c,
    Logger: u,
    $: s,
  } = window.Fatcoupon.ModulesImporter
  ;(window.Fatcoupon.StoreConnector = new r(
    new (class extends StoreConnector {
      constructor() {
        super(...arguments),
          (this.metadata = {
            storeIds: {
              prod: ['5e78494644864100113213f7', '5ee7e21d4b242600111c4674'],
            },
            pageSelector: '.cart-promo-reward button.promo-reward-btn',
            appliedSelector: '[data-uuid][data-code]',
            reloadPageAfterApplying: !0,
            timeouts: {
              collectAndClearAppliedCoupons: 2e4,
              getCartTotal: 1e4,
              beforeApplyingCoupon: 1e4,
              applyCoupon: 2e4,
              afterApplyingCoupon: 1e4,
            },
          }),
          (this.functions = {
            removeCode: (t) =>
              __awaiter(this, void 0, void 0, function* () {
                var o, e
                const { response: n } = yield a.ajax(
                  'GET',
                  '/on/demandware.store/Sites-coh_us_out-Site/en_US/Cart-RemoveCouponLineItem',
                  !1,
                  { data: { code: t.code, uuid: t.uuid } }
                )
                return (
                  (null === (o = null == n ? void 0 : n.totals) || void 0 === o
                    ? void 0
                    : o.grandTotalValue) ||
                  (null === (e = null == n ? void 0 : n.totals) || void 0 === e
                    ? void 0
                    : e.subTotalValue) ||
                  this.context.cartTotal ||
                  0
                )
              }),
            sendRequest: (t = '') =>
              __awaiter(this, void 0, void 0, function* () {
                var o, e, n, r
                const { response: i } = yield a.ajax(
                  'GET',
                  '/on/demandware.store/Sites-coh_us_out-Site/en_US/Cart-AddCoupon',
                  !1,
                  {
                    data: {
                      csrf_token: s('[name=csrf_token]').first().val(),
                      couponCode: t,
                    },
                  }
                )
                return (
                  (null ===
                    (e =
                      null === (o = null == i ? void 0 : i.totals) ||
                      void 0 === o
                        ? void 0
                        : o.discounts) || void 0 === e
                    ? void 0
                    : e.length) &&
                    (this.context.applied = i.totals.discounts.map((t) => ({
                      uuid: t.UUID,
                      code: t.couponCode,
                    }))),
                  (null === (n = null == i ? void 0 : i.totals) || void 0 === n
                    ? void 0
                    : n.grandTotalValue) ||
                    (null === (r = null == i ? void 0 : i.totals) ||
                    void 0 === r
                      ? void 0
                      : r.subTotalValue) ||
                    this.context.cartTotal ||
                    0
                )
              }),
          }),
          (this.context = { cartTotal: 0, cartTotalAfterApply: 0, applied: [] })
      }
      collectAndClearAppliedCoupons() {
        return __awaiter(this, void 0, void 0, function* () {
          const t = []
          s('[name=csrf_token]').length ||
            (yield i.simulateClick(s(this.metadata.pageSelector)),
            yield a.waitFor('[name=csrf_token]')),
            (this.context.cartTotal = a.parseUsdString(
              s('.grand-total').text()
            ))
          for (const o of s('.promos-rewards-coupon [data-uuid][data-code]')) {
            const e = {
              code: s(o).attr('data-code'),
              uuid: s(o).attr('data-uuid'),
            }
            t.push(e.code),
              (this.context.cartTotal = yield this.functions.removeCode(e))
          }
          return t
        })
      }
      getCartTotal() {
        return __awaiter(this, void 0, void 0, function* () {
          const t = this.context.cartTotal
          return u.log(`getCartTotal: ${t}`)(), t
        })
      }
      beforeApplyingCoupon() {}
      applyCoupon(t) {
        return __awaiter(this, void 0, void 0, function* () {
          return (
            (this.context.cartTotalAfterApply =
              yield this.functions.sendRequest(t)),
            { cartTotalAfterApply: this.context.cartTotalAfterApply }
          )
        })
      }
      afterApplyingCoupon() {
        return __awaiter(this, void 0, void 0, function* () {
          for (const t of this.context.applied)
            yield this.functions.removeCode(t)
          this.context.applied.length = 0
        })
      }
    })(!1)
  )),
    u.borderedMessage('FatCoupon: store connector injected!', '#a3cc91')
  const p = window.Fatcoupon.StoreConnector
})()

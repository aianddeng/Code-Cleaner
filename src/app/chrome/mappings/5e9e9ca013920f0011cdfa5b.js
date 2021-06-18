module.exports = {
  storeId: '5e9e9ca013920f0011cdfa5b',
  login: {
    url: 'https://www.farfetch.com/login.aspx',
    username: 'deng@fatcoupon.com',
    password: 'Az6dJfJafg_E_Qg',
    selector: {
      username: '#email-input-login, #login-email',
      password: '#password-input-login, #login-password',
      button:
        '#form_validate_sign_in .submit-button button, [data-tstid=slice-login-sign-in-button]',
    },
  },
  cart: async (page) => {
    await page.goto('https://www.farfetch.com/checkout/basket/GoToCheckout', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    })

    await page.waitForFunction(
      "location.origin.includes('secure.farfetch.com')",
      {
        timeout: 60000,
      }
    )

    return page.url()
  },
  useLocalScript: true,
}

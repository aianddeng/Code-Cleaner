module.exports = {
  storeId: '5e9e9ca013920f0011cdfa5b',
  cookie: true,
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
  cart: 'https://secure.farfetch.com/v2/Payment/',
}

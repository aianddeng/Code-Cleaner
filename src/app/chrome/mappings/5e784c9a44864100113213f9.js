module.exports = {
  storeId: '5e784c9a44864100113213f9',
  product: 'https://deals.dell.com/en-us/productdetail/8roq',
  button: [
    '[data-testid=addToCartButton]',
    '#affix-right-rail button.get-deal',
    '.accessories .btn + a.modal-proceed',
  ],
  cart: (page, config) => {
    return config.product.includes('deals.dell.com')
      ? 'https://www.dell.com/en-us/buy'
      : 'https://www.dell.com/en-us/buy?ref=homecart'
  },
}

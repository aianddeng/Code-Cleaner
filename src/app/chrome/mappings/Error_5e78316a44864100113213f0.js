const globalConfig = require('../../config/config.local')

module.exports = {
  storeId: '5e78316a44864100113213f0',
  product:
    'https://www.asos.com/us/asos-design/asos-design-barrel-gym-bag-in-black-nylon-with-contrast-puller/prd/20901985',
  button: '[data-test-id=add-button]',
  cart: async (page) => {
    await page.goto('https://www.asos.com/us/bag', {
      waitUntil: 'load',
    })

    await page.waitForSelector('.bag-total-button--checkout--total', {
      timeout: globalConfig.timeout,
    })
    await page.click('.bag-total-button--checkout--total')
    await page.waitForNavigation({
      waitUntil: 'load',
    })

    await page.waitForSelector('.qa-join-asos', {
      timeout: globalConfig.timeout,
    })
    await page.click('.qa-join-asos')
    await page.waitForNavigation({
      waitUntil: 'load',
    })

    await page.waitForSelector('.checkout-form input', {
      timeout: globalConfig.timeout,
    })
    await page.click('.checkout-form input')
    await page.waitForNavigation({
      waitUntil: 'load',
    })

    return 'https://secure.asos.com/us/'
  },
}

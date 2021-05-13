module.exports = {
  storeId: '5ed0b7f057659f0011be1b74',
  product:
    'https://shop.tracfone.com/shop/en/tracfonestore/phones/tf-samsung-galaxy-a50-s506dl',
  button: [
    '#select_phone_bundles_btn',
    '#hppPlan_NoCoverage',
    '#select_phone_bundles_btn_hpp',
    '#lto_selected_plan_continue_url a',
  ],
  cart: async (page) => {
    await page.goto('https://shop.tracfone.com/', {
      waitUntil: 'load',
      timeout: 60000,
    })
    return await page.$eval('a.carticon', (el) => el.getAttribute('href'))
  },
}

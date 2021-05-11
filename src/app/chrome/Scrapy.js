const puppeteer = require('puppeteer')
const globalConfig = require('../config/config.local')
const Helpers = require('../helpers/index')

class Scrapy {
  constructor(config, coupons, job, done) {
    this.backgroundPage = null
    this.lastMessage = null
    this.browser = null

    this.config = config
    this.coupons = coupons
    this.job = job
    this.done = done

    this.runNumber = 0

    if (typeof this.config.button === 'string') {
      this.config.button = [this.config.button]
    }
  }

  async watchJobState() {
    const queue = require('../jobs/queue')

    queue.once('paused', () => {
      setTimeout(() => {
        this.browser && this.browser.disconnect()
      }, 5 * 1000)
      this.done(new Error('Queue Paused'))
    })
  }

  async createBrowser() {
    let xvfb = null
    if (process.env.NODE_ENV === 'production') {
      const Xvfb = require('xvfb')
      xvfb = new Xvfb({
        reuse: true,
        silent: true,
      })
      xvfb.start((err) => err && console.log('Xvfb Error: ', err))
    }

    this.browser = await puppeteer.launch({
      headless: globalConfig.headless,
      defaultViewport: null,
      args: [
        '--disable-extensions-except=' + globalConfig.extensionPath,
        '--load-extension=' + globalConfig.extensionPath,
        process.env.NODE_ENV === 'production'
          ? '--display=' + xvfb._display
          : '',
        '--no-sandbox',
        '--hide-scrollbars',
        '--disable-blink-features=AutomationControlled',
      ],
    })

    // 浏览器调用disconnect时触发，统一关闭puppeteer
    this.browser.on('disconnected', async () => {
      this.browser && this.browser.close()

      // 这个判断主要针对开始扫描时手贱关闭浏览器的行为
      if ((await this.job.getState()) === 'active') {
        this.done(new Error('Browser Closed'))
      }
    })

    this.backgroundPage = await this.browser
      .targets()
      .find((target) => target.type() === 'background_page')
      .page()
  }

  async createNewpage(url = '', selector = '') {
    const page = await this.browser.newPage()
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36 Edg/89.0.774.68'
    )
    await page.evaluate(() => {
      Object.defineProperties(navigator, {
        webdriver: {
          get: () => false,
        },
      })
    })
    await page.evaluateOnNewDocument(() => {
      const newProto = navigator.__proto__
      delete newProto.webdriver
      navigator.__proto__ = newProto
      window.chrome = {}
      window.chrome.app = {
        InstallState: 'hehe',
        RunningState: 'haha',
        getDetails: 'xixi',
        getIsInstalled: 'ohno',
      }
      window.chrome.csi = function () {}
      window.chrome.loadTimes = function () {}
      window.chrome.runtime = function () {}
      Object.defineProperty(navigator, 'userAgent', {
        get: () =>
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36',
      })
      Object.defineProperty(navigator, 'plugins', {
        get: () => [
          {
            description: 'Portable Document Format',
            filename: 'internal-pdf-viewer',
            length: 1,
            name: 'Chrome PDF Plugin',
          },
        ],
      })
      Object.defineProperty(navigator, 'languages', {
        get: () => ['en-US', 'en'],
      })
      const originalQuery = window.navigator.permissions.query
      window.navigator.permissions.query = (parameters) =>
        parameters.name === 'notifications'
          ? Promise.resolve({ state: Notification.permission })
          : originalQuery(parameters)
    })
    await page.setRequestInterception(true)
    page.on('request', (req) => {
      if (
        ['image', 'media', 'font', 'stylesheet'].includes(req.resourceType())
      ) {
        req.respond({
          status: 200,
          body: '',
        })
      } else {
        req.continue()
      }
    })

    if (url) {
      await Promise.race([
        page.goto(url, {
          waitUntil: 'load',
          timeout: globalConfig.timeout,
        }),
        Helpers.wait(globalConfig.timeout / 1000 - 1),
      ])

      await this.job.log(
        JSON.stringify({
          label: Date.now(),
          content: `Browser page title: <${await page.title()}>`,
        })
      )

      if (selector) {
        await Promise.race([
          page.waitForSelector(selector, {
            timeout: globalConfig.timeout,
          }),
          Helpers.wait(globalConfig.timeout / 1000 - 1),
        ])

        await page.$eval(selector, (el) => el.removeAttribute('disabled'))
      }
    }
    await Helpers.wait(2)

    return page
  }

  async extensionLoaded() {
    await Promise.race([
      this.backgroundPage.waitForFunction(
        async (useLocalScript) => {
          await new Promise((resolve) => {
            const checkExtensionLoaded = () => {
              window &&
              window.controller &&
              window.controller.reduxStore &&
              window.controller.supportedStores
                ? resolve(true)
                : setTimeout(checkExtensionLoaded, 500)
            }
            setTimeout(checkExtensionLoaded, 500)
          })
          if (useLocalScript) window.Fatcoupon.env.script = 'local'
          return true
        },
        {
          timeout: globalConfig.timeout,
        },
        !!this.config.useLocalScript
      ),
      Helpers.wait(10),
    ])
  }

  async watchBackground() {
    await this.backgroundPage.evaluate(() => {
      const store = window.controller.reduxStore
      store.subscribe(async () => {
        // 获取当前标签页Id
        const currentTabId = await new Promise((resolve) => {
          chrome.tabs.query({ active: true }, (tabs) => {
            tabs && tabs.length && resolve(tabs[0].id)
          })
        })

        // 当前标签页state
        const currentTabData = store.getState().tabs[currentTabId]
        if (currentTabData) {
          if (currentTabData.phase === 4) {
            const codeMatch = currentTabData.applyPopup.code.match(
              /fatcoupon:(\w+?):(.+)/
            )
            if (codeMatch && currentTabData.applyPopup.curCouponIndex > -1) {
              console.log(
                JSON.stringify({
                  master: 'fatcoupon:clean-coupon',
                  storeId: currentTabData.storeId,
                  type:
                    codeMatch[1] === 'valid' ? 'applySuccess' : 'applyFailed',
                  code: codeMatch[2],
                })
              )
            }
          } else if (currentTabData.phase === 5) {
            console.log(
              JSON.stringify({
                master: 'fatcoupon:clean-coupon',
                storeId: currentTabData.storeId,
                type: 'applyDone',
              })
            )
          } else if (currentTabData.phase === 6) {
            console.log(
              JSON.stringify({
                master: 'fatcoupon:clean-coupon',
                storeId: currentTabData.storeId,
                type: 'errorDone',
              })
            )
          }
        }
      })
    })
  }

  async watchApplyCoupon() {
    this.backgroundPage.on('console', async (msg) => {
      const msgText = msg.text()
      if (
        msgText.includes('fatcoupon:clean-coupon') &&
        this.lastMessage !== msgText
      ) {
        this.lastMessage = msgText
        const data = JSON.parse(msgText)

        const currentCoupon = data.code

        if (data.storeId === this.config.storeId) {
          if (data.type === 'applyDone') {
            this.browser.disconnect()
            this.done()
          } else if (data.type === 'errorDone') {
            if (this.runNumber) {
              this.runNumber = 0
              this.lastMessage = null
              this.coupons = this.coupons.filter((el) => !el.validStatus)
              await this.handleApplyCoupon()
            } else {
              this.browser.disconnect()
              this.done(new Error('Extension Done'))
            }
          } else {
            this.runNumber += 1
            if (data.type === 'applyFailed') {
              this.job.data.coupons.find(
                (el) => el.code.toUpperCase() === currentCoupon.toUpperCase()
              ).validStatus = -1
              await this.job.update(this.job.data)
            } else if (data.type === 'applySuccess') {
              this.job.data.coupons.find(
                (el) => el.code.toUpperCase() === currentCoupon.toUpperCase()
              ).validStatus = 1
              await this.job.update(this.job.data)
            }
          }
        }
      }
    })
  }

  async handleLogin() {
    if (!this.config.login) return

    await this.job.log(
      JSON.stringify({
        label: Date.now(),
        content: 'Try login the website',
      })
    )

    const page = await this.createNewpage(
      this.config.login.url || this.config.cart,
      this.config.login.selector.username
    )

    if (this.config.login.urlAfterBtn) {
      page.waitForSelector(this.config.login.urlAfterBtn, {
        timeout: globalConfig.timeout,
      })
      await page.click(this.config.login.urlAfterBtn)
    }

    await Promise.all([
      page.waitForSelector(this.config.login.selector.username, {
        timeout: globalConfig.timeout,
      }),
      page.waitForSelector(this.config.login.selector.password, {
        timeout: globalConfig.timeout,
      }),
      page.waitForSelector(this.config.login.selector.button, {
        timeout: globalConfig.timeout,
      }),
    ])

    await page.type(
      this.config.login.selector.username,
      this.config.login.username
    )
    await page.type(
      this.config.login.selector.password,
      this.config.login.password
    )
    await page.click(this.config.login.selector.button)

    await Helpers.wait(2)
  }

  async handleAddProduct() {
    if (this.config.login) return

    await this.job.log(
      JSON.stringify({
        label: Date.now(),
        content: 'Try add product to cart',
      })
    )

    const page = await this.createNewpage(this.config.product)

    for (const selector of this.config.button) {
      await Promise.race([
        page.waitForSelector(selector, {
          timeout: globalConfig.timeout,
        }),
        Helpers.wait(globalConfig.timeout / 1000 - 1),
      ])

      try {
        await page.click(selector)
        await Helpers.wait(1)
      } catch {}

      try {
        await page.evaluate((selector) => {
          const button = document.querySelector(selector)
          button && button.click()
        }, selector)
        await Helpers.wait(1)
      } catch {}
    }
     
    if(!this.config.cart.startsWith('http')) {
      this.config.cart = await page.$eval(this.config.cart, (el) =>
        el.getAttribute('href')
      )

      if (!this.config.cart.startsWith('http')) {
        const url = new URL(this.config.product)

        if (this.config.cart.startsWith('//')) {
          this.config.cart = url.protocol + this.config.cart
        } else if (this.config.cart.startsWith('/')) {
          this.config.cart = url.origin + this.config.cart
        } else {
          this.config.cart = url.origin + '/' + this.config.cart
        }
      }
    }

    await Helpers.wait(2)
  }

  async handleApplyCoupon() {
    if (typeof this.config.cart === 'function') {
      const page = await this.createNewpage()
      this.config.cart = await this.config.cart(page)
    }

    // 等待加载完店铺信息，防止反复更改折扣码
    await Promise.race([
      this.backgroundPage.waitForFunction(
        async (config) => {
          return await new Promise((resolve) => {
            const store = window.controller.reduxStore
            const checkStoreState = () => {
              const ready = store.getState().stores[config.storeId]

              if (ready && ready.coupons) {
                store.getState().stores[config.storeId].coupons = config.coupons

                resolve(true)
              } else {
                setTimeout(checkStoreState, 500)
              }
            }
            setTimeout(checkStoreState, 500)
          })
        },
        {
          timeout: globalConfig.timeout,
        },
        {
          coupons: this.coupons,
          storeId: this.config.storeId,
        }
      ),
      Helpers.wait(10),
    ])

    // 关闭其他页面（除了tab），打开新的页面
    await Promise.all(
      this.browser
        .targets()
        .filter((target) => target.type() === 'page')
        .slice(1)
        .map((target) => target.page().then((page) => page.close()))
    )

    const page = await this.createNewpage(
      this.config.cart,
      this.config.cartAfterButton ? '' : '#fatcoupon-root'
    )

    if (this.config.cartAfterButton) {
      await page.evaluate((selector) => {
        const button = document.querySelector(selector)
        button && button.click()
      }, this.config.cartAfterButton)
      await Helpers.wait(2)
    }

    await page.waitForFunction(
      () =>
        document
          .querySelector('#fatcoupon-root')
          .shadowRoot.querySelector('.coupons-found-popup-label + button'),
      {
        timeout: globalConfig.timeout,
      }
    )

    await page.evaluate(() => {
      const button = document
        .querySelector('#fatcoupon-root')
        .shadowRoot.querySelector('.coupons-found-popup-label + button')
      button && button.click()
    })
  }

  async start() {
    if (!this.coupons.length) {
      this.done()
      return
    }
    await this.watchJobState()

    try {
      await this.createBrowser()
      await this.job.log(
        JSON.stringify({
          label: Date.now(),
          content: 'Created a new browser instance',
        })
      )
      await this.extensionLoaded()
      await this.job.log(
        JSON.stringify({
          label: Date.now(),
          content: 'Loaded fatcoupon extension',
        })
      )

      await this.watchBackground()
      await this.watchApplyCoupon()
      await this.job.log(
        JSON.stringify({
          label: Date.now(),
          content: 'Watch the extension redux events',
        })
      )

      await this.handleLogin()
      await this.handleAddProduct()
      await this.handleApplyCoupon()
      await this.job.log(
        JSON.stringify({
          label: Date.now(),
          content: 'Starting test promo code...',
        })
      )
    } catch (e) {
      this.browser.disconnect()
      await this.job.log(
        JSON.stringify({
          label: Date.now(),
          content: e.message,
        })
      )
      this.done(new Error(e.message))
    }
  }
}

module.exports = Scrapy

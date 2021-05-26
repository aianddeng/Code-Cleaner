const fs = require('fs').promises
const path = require('path')
const axios = require('axios')

class Mappings {
  static async dumpMappings() {
    const files = await fs.readdir(
      path.join(__dirname, '../', 'chrome', 'mappings')
    )

    const mappings = (
      await Promise.all(
        files
          .filter(
            (el) =>
              !(
                el.startsWith('Error') ||
                el.startsWith('Wait') ||
                !el.endsWith('js') ||
                el === '_index.js'
              )
          )
          .map((el) =>
            import(path.join(__dirname, '../', 'chrome', 'mappings', el)).then(
              (res) => res.default
            )
          )
      )
    ).map((el) =>
      el.cart && typeof el.cart === 'function'
        ? {
            ...el,
            cart: el.cart.toString(),
          }
        : el
    )

    return JSON.stringify(mappings)
  }

  static async loadMappings() {
    const redis = require('../db/redis')

    let mappings = JSON.parse((await redis.get('fatcoupon:mappings')) || '{}')

    if (!mappings || !Object.keys(mappings).length) {
      const mappingsString = await Mappings.dumpMappings()
      await redis.set('fatcoupon:mappings', mappingsString)

      mappings = JSON.parse(mappingsString)
    }

    mappings = mappings.map((el) =>
      el.cart && el.cart.includes('async') ? { ...el, cart: eval(el.cart) } : el
    )

    return mappings
  }

  static async uploadMappings(cdn = false) {
    console.log('Start Upload Store Mappings...')

    const mappings = await Mappings.dumpMappings()

    const { data } = await axios.put(
      `http://${cdn ? '34.123.138.160' : 'localhost'}/api/mappings`,
      {
        mappings,
        key: 'FatCouponDeng',
      }
    )
    console.log(data)

    console.log('Upload Done...')
  }
}

module.exports = Mappings

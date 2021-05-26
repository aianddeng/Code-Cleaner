const Mappings = require('./Mappings')

const upload = async () => {
  await Mappings.uploadMappings(true)
}
upload()

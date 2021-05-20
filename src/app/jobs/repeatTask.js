const axios = require('axios')

module.exports = async (job) => {
  console.log('Create a new job from repeat-task.')

  const { storeId, storeName } = job.data

  const { data } = await axios.put('/api/tasks', {
    storeId,
    storeName,
  })
}

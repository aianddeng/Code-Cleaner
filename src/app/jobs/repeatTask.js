const axios = require('axios')

module.exports = async ({ data: { storeId, storeName } }) => {
  console.log('Create a new job from repeat-task.', Date.now())

  const { data } = await axios.put('/api/tasks', {
    storeId,
    storeName,
    priority: 1, // 重复任务低优先级
  })
}

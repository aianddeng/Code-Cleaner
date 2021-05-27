const axios = require('axios')

module.exports = async ({ data }) => {
  console.log('Create a new job from repeat-task.', Date.now())

  await axios.put('/api/tasks', {
    ...data,
    priority: 1, // 重复任务低优先级
  })
}

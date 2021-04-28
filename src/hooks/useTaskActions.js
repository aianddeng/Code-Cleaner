import useActionLoading from '@hook/useActionLoading'
import { useCallback } from 'react'
import Router from 'next/router'
import { mutate } from 'swr'
import axios from 'axios'

import { message } from 'antd'

const useTaskActions = () => {
  const { actionKey, checkLoading, pushLoading, popLoading } = useActionLoading(
    'taskActions'
  )

  const handleRetryTask = useCallback(async (id, props) => {
    pushLoading(id)
    message.loading({
      content: 'Waiting...',
      duration: 0,
      key: actionKey.current,
    })

    // 重新运行任务并重载任务列表
    await axios.post('/api/tasks/' + id)

    await mutate('/api/tasks/' + id)
    if (props) {
      await mutate(['/api/tasks', props.size, props.index])
    }

    message.success({
      content: `Switch the task: ${id}`,
      duration: 6,
      key: actionKey.current,
    })
    popLoading(id)
  })

  const handleRemoveTask = useCallback(async (id, props) => {
    pushLoading(id)
    message.loading({
      content: 'Waiting...',
      duration: 0,
      key: actionKey.current,
    })

    // 删除任务并重新加载任务列表
    await axios.delete('/api/tasks/' + id)

    if (props) {
      await mutate(['/api/tasks', props.size, props.index])
    }

    message.success({
      content: `Delete the task: ${id}`,
      duration: 6,
      key: actionKey.current,
    })
    popLoading(id)

    // 如果是任务页，跳转到tasks页面
    await Router.push('/tasks')
  }, [])

  const handleDeactiveCode = useCallback(async (id, couponIds) => {
    pushLoading(couponIds.join(','))
    message.loading({
      content: 'Waiting...',
      duration: 0,
      key: actionKey.current,
    })

    await axios.delete('/api/coupons', {
      data: {
        taskId: id,
        coupons: couponIds,
      },
    })
    await mutate('/api/tasks/' + id)

    message.success({
      content: `Deactive codes total: ${couponIds.length}`,
      duration: 6,
      key: actionKey.current,
    })
    popLoading(couponIds.join(','))
  }, [])

  const handleControllerTask = useCallback(async (props) => {
    pushLoading('controller')
    message.loading({
      content: 'Waiting...',
      duration: 0,
      key: actionKey.current,
    })

    await axios.post('/api/tasks')
    if (props) {
      await mutate(['/api/tasks', props.size, props.index])
    }

    message.success({
      content: `Pause / Resume the task process.`,
      duration: 6,
      key: actionKey.current,
    })
    popLoading('controller')
  })

  return {
    checkLoading,
    handleRetryTask,
    handleRemoveTask,
    handleDeactiveCode,
    handleControllerTask,
  }
}

export default useTaskActions

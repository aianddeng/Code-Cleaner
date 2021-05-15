import { useCallback, useEffect } from 'react'
import useSWR from 'swr'
import axios from 'axios'

import { notification } from 'antd'

const openNotificationWithIcon = (props) => {
  const { type, message, description } = props

  notification[type]({
    message,
    description,
    duration: 6,
  })
}

const useMessagePop = () => {
  const { data: serverMessage } = useSWR('/api/message', {
    refreshInterval: 1 * 1000,
  })

  const pushLocalMessage = useCallback(async (el) => {
    await axios.put('/api/message', {
      ...el,
    })
  })

  useEffect(() => {
    if (serverMessage && serverMessage.type) {
      openNotificationWithIcon(serverMessage)
    }
  }, [serverMessage])

  return { pushLocalMessage }
}

export default useMessagePop

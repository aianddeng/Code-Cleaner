import { useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'
import axios from 'axios'

import { notification } from 'antd'

const openNotificationWithIcon = (props) => {
  const { type, message, description } = props

  notification[type]({
    message,
    description,
    duration: 3,
  })
}

const useMessages = () => {
  const [messages, setMessages] = useState([])

  const { data: serverMessage } = useSWR('/api/message', {
    refreshInterval: 1 * 1000,
  })

  const pushLocalMessage = useCallback(async (data) => {
    await axios.put('/api/message', data)
  })

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  useEffect(() => {
    setMessages(JSON.parse(localStorage.getItem('messages') || '[]'))
  }, [])

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages))
  }, [messages])

  useEffect(() => {
    if (serverMessage && serverMessage.type) {
      setMessages([serverMessage, ...messages])
      openNotificationWithIcon({
        type: serverMessage.type,
        message: serverMessage.type,
        description:
          serverMessage.type === 'success'
            ? `Task <${serverMessage.storeName}> (id: ${serverMessage.id}) is completed. Check it now.`
            : `Task <${serverMessage.storeName}> (id: ${serverMessage.id}) is failed. Retry it now.`,
      })
    }
  }, [serverMessage])

  return { messages, pushLocalMessage, clearMessages }
}

export default useMessages

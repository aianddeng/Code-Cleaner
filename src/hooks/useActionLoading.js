import { useRef, useState } from 'react'

const useActionLoading = (key) => {
  const actionKey = useRef(key)

  const [actionLoading, setActionLoading] = useState([])

  const checkLoading = (value) => {
    return actionLoading.includes(value)
  }

  const pushLoading = (value) => {
    setActionLoading([...actionLoading, value])
  }

  const popLoading = (value) => {
    setActionLoading(actionLoading.slice().filter((el) => el !== value))
  }

  return { actionKey, checkLoading, pushLoading, popLoading }
}

export default useActionLoading

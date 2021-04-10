import { useRef, useState } from 'react'

const useActionLoading = key => {
    const actionKey = useRef(key)

    const [actionLoading, dispatchActionLoading] = useState([])

    const checkLoading = value => {
        return actionLoading.includes(value)
    }

    const pushLoading = value => {
        dispatchActionLoading([...actionLoading, value])
    }

    const popLoading = value => {
        dispatchActionLoading(actionLoading.slice().filter(el => el !== value))
    }

    return { actionKey, checkLoading, pushLoading, popLoading }
}

export default useActionLoading

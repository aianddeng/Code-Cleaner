import { useState } from 'react'

const useActionLoading = () => {
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

    return { checkLoading, pushLoading, popLoading }
}

export default useActionLoading

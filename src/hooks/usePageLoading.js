import { useState, useCallback } from 'react'
import Router, { useRouter } from 'next/router'

const usePageLoading = () => {
    const router = useRouter()
    const [loading, dispatchLoading] = useState(false)

    const handleRedirect = useCallback(async path => {
        if (!loading && path !== router.route) {
            dispatchLoading(true)
            await Router.push(path)
        }
    })

    return { loading, handleRedirect }
}

export default usePageLoading

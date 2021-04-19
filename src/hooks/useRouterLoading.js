import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const useRouterLoading = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const enLoading = (url, { shallow }) => {
      if (!loading && !shallow && url !== router.asPath) {
        setLoading(true)
      }
    }

    const deLoading = () => {
      setLoading(false)
    }

    router.events.on('routeChangeStart', enLoading)
    router.events.on('routeChangeComplete', deLoading)

    return () => {
      router.events.off('routeChangeStart', enLoading)
      router.events.off('routeChangeComplete', deLoading)
    }
  })

  return { router, loading }
}

export default useRouterLoading

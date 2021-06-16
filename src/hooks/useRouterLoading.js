import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const useRouterLoading = () => {
  const router = useRouter()
  const [routerLoading, setRouterLoading] = useState(false)
  const exceptParams = ['settings', 'messages']

  useEffect(() => {
    const enLoading = (url) => {
      if (url !== router.asPath) {
        if (
          !exceptParams.some(
            (el) =>
              url.includes(el + '=true') || router.asPath.includes(el + '=true')
          )
        ) {
          setRouterLoading(true)
        }
      }
    }

    const deLoading = () => {
      setRouterLoading(false)
    }

    router.events.on('routeChangeStart', enLoading)
    router.events.on('routeChangeComplete', deLoading)

    return () => {
      router.events.off('routeChangeStart', enLoading)
      router.events.off('routeChangeComplete', deLoading)
    }
  }, [router.asPath])

  return { routerLoading }
}

export default useRouterLoading

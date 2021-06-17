import { useState, useCallback, useEffect } from 'react'
import Router, { useRouter } from 'next/router'

const useSideBarLoader = (key) => {
  const router = useRouter()
  const [visible, setVisible] = useState(null)

  const handleSwitchVisible = useCallback(() => {
    setVisible(!visible)
    const query = router.query
    if (visible) {
      delete query[key]
      Router.push(
        {
          pathname: router.pathname,
          query,
        },
        undefined,
        {
          shallow: true,
        }
      )
    } else {
      Router.push(
        {
          pathname: router.pathname,
          query: {
            ...query,
            [key]: true,
          },
        },
        undefined,
        {
          shallow: true,
        }
      )
    }
  }, [visible, router])

  useEffect(() => {
    setVisible(router.query[key] === 'true')
  }, [router.query])

  return { visible, handleSwitchVisible }
}

export default useSideBarLoader

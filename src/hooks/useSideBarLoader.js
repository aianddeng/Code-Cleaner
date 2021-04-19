import { useState, useCallback, useEffect } from 'react'
import Router, { useRouter } from 'next/router'

const useSideBarLoader = () => {
  const router = useRouter()
  const [visible, setVisible] = useState(null)

  const handleSwitchVisible = useCallback(() => {
    setVisible(!visible)
    const query = router.query
    if (visible) {
      delete query.settings
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
            settings: true,
          },
        },
        undefined,
        {
          shallow: true,
        }
      )
    }
  })

  useEffect(() => {
    if (router.query.settings === 'true') setVisible(true)
  }, [])

  return { visible, handleSwitchVisible }
}

export default useSideBarLoader

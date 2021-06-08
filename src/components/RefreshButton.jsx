import { useRouter } from 'next/router'
import { useState, useCallback } from 'react'
import { Button } from 'antd'
import { CloudSyncOutlined } from '@ant-design/icons'

const RefreshButton = () => {
  const router = useRouter()
  const [refreshLoading, setRefreshLoading] = useState(false)
  const refreshData = useCallback(async () => {
    setRefreshLoading(true)
    await router.replace(router.asPath)
    setRefreshLoading(false)
  }, [router.asPath])

  return (
    <Button
      type="primary"
      onClick={refreshData}
      loading={refreshLoading}
      icon={<CloudSyncOutlined />}
    >
      Refresh Data
    </Button>
  )
}

export default RefreshButton

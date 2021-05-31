import useSWR from 'swr'
import axios from 'axios'
import moment from 'moment'
import Head from 'next/head'
import Link from 'next/link'
import { useCallback } from 'react'
import useActionLoading from '@hook/useActionLoading'

import {
  Button,
  Card,
  Badge,
  Statistic,
  message,
  Popconfirm,
  Empty,
} from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons'

const RepeatSection = () => {
  const { actionKey, checkLoading, pushLoading, popLoading } =
    useActionLoading('removeRepeatTask')

  const { data, mutate } = useSWR('/api/tasks/repeat', {
    refreshInterval: 5 * 1000,
  })

  const handleRemoveRepeatTask = useCallback(async (key, storeName) => {
    pushLoading(key)
    message.loading({
      content: 'Waiting...',
      duration: 0,
      key: actionKey.current,
    })

    const { data } = await axios.post('/api/tasks/repeat', {
      key,
    })
    await mutate(data, false)

    message.success({
      content: `Remove the repeat task: ${storeName}`,
      duration: 6,
      key: actionKey.current,
    })
    popLoading(key)
  })

  return (
    <>
      <Head>
        <title>Repeat Task List - Fatcoupon</title>
      </Head>
      <div>
        <h1>Repeat Task List</h1>
        {data ? (
          data.datas.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
              {data.datas.slice().map((el, index) => (
                <Card
                  type="inner"
                  title={el.storeName}
                  key={el.storeId}
                  actions={[
                    <Button>
                      <Link
                        href={{
                          pathname: '/tasks',
                          query: { storeId: el.storeId },
                        }}
                      >
                        Check Store Tasks
                      </Link>
                    </Button>,
                    <Popconfirm
                      okText="Yes"
                      cancelText="No"
                      title="Are you sure to delete this repeat task?"
                      onConfirm={() =>
                        handleRemoveRepeatTask(el.key, el.storeName)
                      }
                    >
                      <Button danger loading={checkLoading(el.key)}>
                        Remove
                      </Button>
                    </Popconfirm>,
                  ]}
                  extra={
                    <Badge
                      status={!index ? 'processing' : 'default'}
                      text={el.rule}
                    />
                  }
                >
                  {!index ? (
                    <Statistic.Countdown
                      title="Next"
                      value={el.next}
                      format="HH:mm:ss"
                      valueStyle={{
                        textAlign: 'center',
                      }}
                    />
                  ) : (
                    <Statistic
                      prefix={<ClockCircleOutlined />}
                      suffix="..."
                      title="Waiting"
                      value={moment.duration(el.next - Date.now()).humanize()}
                    />
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>
              <Button type="link">
                <Link href="/">Create Now</Link>
              </Button>
            </Empty>
          )
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
            <Card type="inner" loading></Card>
            <Card type="inner" loading></Card>
          </div>
        )}
      </div>
    </>
  )
}

export default RepeatSection

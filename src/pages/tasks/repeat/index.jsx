import { useSWRInfinite } from 'swr'
import axios from 'axios'
import moment from 'moment'
import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useRef } from 'react'
import useActionLoading from '@hook/useActionLoading'

import {
  Button,
  Card,
  Badge,
  Statistic,
  message,
  Popconfirm,
  Empty,
  List,
  Spin,
} from 'antd'
import { ClockCircleOutlined, LoadingOutlined } from '@ant-design/icons'

const Countdown = dynamic(() => import('@comp/Countdown'), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center">
      <LoadingOutlined />
    </div>
  ),
})

const fetcher = (url) => axios.get(url).then((res) => res.data)

const RepeatSection = ({ initialData }) => {
  const { actionKey, checkLoading, pushLoading, popLoading } =
    useActionLoading('removeRepeatTask')

  const { data, mutate, isValidating, size, setSize } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      return previousPageData && !previousPageData.nextPage
        ? null
        : `/api/tasks/repeat?page=${pageIndex + 1}&size=10`
    },
    fetcher,
    {
      initialData: [initialData],
      revalidateOnMount: true,
      refreshInterval: 5 * 1000,
    }
  )

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

  const loadMoreElement = useRef(null)

  useEffect(() => {
    if (loadMoreElement.current) {
      const loadMore = () => {
        if (
          !isValidating &&
          loadMoreElement.current.getBoundingClientRect().top <
            window.innerHeight
        ) {
          setSize(size + 1)
          document.removeEventListener('scroll', loadMore)
        }
      }
      document.addEventListener('scroll', loadMore)

      return () => {
        document.removeEventListener('scroll', loadMore)
      }
    }
  }, [isValidating, size, loadMoreElement.current])

  return (
    <>
      <Head>
        <title>Repeat Task List - Fatcoupon</title>
      </Head>
      <div>
        {data.map((el) => el.datas).flat().length ? (
          <div>
            <List
              split={false}
              grid={{
                gutter: 8,
                xs: 1,
                sm: 2,
                md: 2,
                lg: 2,
                xl: 3,
                xxl: 4,
              }}
              header={<h1>Repeat Task List</h1>}
              footer={
                data.slice(-1).pop().nextPage ? (
                  <div className="text-center" ref={loadMoreElement}>
                    <Spin />
                  </div>
                ) : null
              }
              dataSource={data.map((el) => el.datas).flat()}
              renderItem={(el, index) => (
                <List.Item>
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
                          <a>Check Store Tasks</a>
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
                    {index ? (
                      <Statistic
                        prefix={<ClockCircleOutlined />}
                        suffix="..."
                        title="Waiting"
                        value={moment.duration(el.next - Date.now()).humanize()}
                      />
                    ) : (
                      <Countdown
                        title="Next"
                        value={el.next}
                        format="HH:mm:ss"
                        valueStyle={{
                          textAlign: 'center',
                        }}
                      />
                    )}
                  </Card>
                </List.Item>
              )}
            />
          </div>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>
            <Button type="link">
              <Link href="/">
                <a>Create Now</a>
              </Link>
            </Button>
          </Empty>
        )}
      </div>
    </>
  )
}

export const getServerSideProps = async () => {
  const { data } = await axios.get('/api/tasks/repeat')

  return {
    props: {
      initialData: data,
    },
  }
}

export default RepeatSection

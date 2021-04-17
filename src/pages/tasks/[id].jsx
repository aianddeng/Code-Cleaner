import { useState, useCallback, useEffect } from 'react'
import {
  Card,
  Button,
  Result,
  notification,
  Popconfirm,
  message,
  Progress,
} from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import Head from 'next/head'
import axios from 'axios'
import useSWR, { mutate } from 'swr'
import Wrapper from '../../components/Wrapper'
import useActionLoading from '../../hooks/useActionLoading'

const openNotificationWithIcon = (type, message, description) => {
  notification[type]({
    message,
    description,
    duration: 1 * 60,
  })
}

const TaskManage = ({ data: initialData }) => {
  const { actionKey, checkLoading, pushLoading, popLoading } = useActionLoading(
    'removeCode'
  )

  const router = useRouter()

  const [tab, dispatchTab] = useState({
    key: 'All',
  })

  const [coupons, dispatchCoupons] = useState([])

  const { data } = useSWR('/api/tasks/' + router.query.id, {
    initialData,
    refreshInterval: 5000,
  })

  useEffect(() => {
    handleTabChange(tab.key)
  }, [data])

  const handleTabChange = useCallback(
    (key) => {
      dispatchTab({ key })

      if (
        initialData.coupons.slice().filter((el) => !el.validStatus).length &&
        !data.coupons.slice().filter((el) => !el.validStatus).length
      ) {
        openNotificationWithIcon(
          'success',
          'Store: ' + data.storeName,
          'This task is finished now. Please check out that coupon is valid right.'
        )
      }

      if (key === 'All') {
        dispatchCoupons(
          data.coupons
            .slice()
            .sort((a, b) => (b.validStatus || 0) - (a.validStatus || 0))
        )
      } else if (key === 'Valid') {
        dispatchCoupons(
          data.coupons.slice().filter((el) => el.validStatus === 1)
        )
      } else if (key === 'Invalid') {
        dispatchCoupons(
          data.coupons.slice().filter((el) => el.validStatus === -1)
        )
      } else if (key === 'Repeat') {
        const couponsSlice = data.coupons.slice().map((el) => el.code)

        const repeatCoupons = couponsSlice.filter(
          (code) =>
            couponsSlice.indexOf(code) !== couponsSlice.lastIndexOf(code)
        )

        dispatchCoupons(
          data.coupons
            .slice()
            .filter((el) => repeatCoupons.includes(el.code))
            .sort((a, b) => {
              if (a.code < b.code) {
                return -1
              }
              if (a.code > b.code) {
                return 1
              }
              return 0
            })
        )
      } else if (key === 'Waiting') {
        dispatchCoupons(data.coupons.slice().filter((el) => !el.validStatus))
      }
    },
    [coupons]
  )

  const handleDeactiveCode = useCallback(async (couponId = 'all') => {
    pushLoading(couponId)
    message.loading({
      content: 'Waiting...',
      duration: 0,
      key: actionKey.current,
    })

    await axios.delete('/api/coupons', {
      data:
        couponId === 'all'
          ? {
              taskId: router.query.id,
            }
          : {
              taskId: router.query.id,
              coupons: [couponId],
            },
    })

    message.success({
      content: `Remove the code: ${couponId}`,
      duration: 6,
      key: actionKey.current,
    })
    await mutate('/api/tasks/' + router.query.id)
    popLoading(couponId)
  }, [])

  return (
    <Wrapper>
      <Head>
        <title>Task Info - FatCoupon</title>
      </Head>
      <Card
        title={'Store: ' + data.storeName}
        tabList={[
          { key: 'All', tab: `All(${data.allLength})` },
          {
            key: 'Valid',
            tab: `Valid(${data.validLength})`,
          },
          {
            key: 'Invalid',
            tab: `Invalid(${data.invalidLength})`,
          },
          {
            key: 'Waiting',
            tab: `Waiting(${
              data.allLength - data.validLength - data.invalidLength
            })`,
          },
          {
            key: 'Repeat',
            tab: `Repeat${tab.key === 'Repeat' ? `(${coupons.length})` : ''}`,
          },
        ]}
        activeTabKey={tab.key}
        onTabChange={(key) => handleTabChange(key)}
      >
        <Progress
          showInfo={false}
          percent={
            ((data.validLength + data.invalidLength) / data.allLength) * 100
          }
          status="exception"
          strokeColor="rgba(239, 68, 68)"
          success={{
            percent: (data.validLength / data.allLength) * 100,
            strokeColor: 'rgba(59, 130, 246)',
          }}
          className="mb-5 px-1"
        />
        {coupons.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {data.status === 'finished' && false && (
              <Card
                onClick={() => handleDeactiveCode()}
                key="removeAll"
                className="cursor-pointer flex justify-center items-center border-2 border-red-500 m-1 text-lg text-red-500"
              >
                Remove All Invlid Code
              </Card>
            )}
            {coupons.slice().map((el) => (
              <Card
                className={[
                  'm-1',
                  !el.validStatus && 'border-gray-200',
                  el.validStatus === 1 && 'border-blue-500',
                  el.validStatus === -1 && 'border-red-500',
                ]}
                hoverable
                key={el.id}
                actions={[
                  <Button>Manage</Button>,
                  <Popconfirm
                    title="Are you sure to deactive this code?"
                    onConfirm={() => handleDeactiveCode(el.id)}
                    disabled={el.validStatus !== -1 || el.deactiveStatus}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      danger
                      loading={checkLoading(el.id)}
                      disabled={el.validStatus !== -1 || el.deactiveStatus}
                    >
                      Deactive
                    </Button>
                  </Popconfirm>,
                ]}
              >
                <Card.Meta
                  title={el.code}
                  description={
                    <p className="whitespace-nowrap">
                      {el.description
                        ? el.description.trim()
                        : 'FatCoupon Code'}
                    </p>
                  }
                />
              </Card>
            ))}
          </div>
        ) : (
          <Result
            icon={<SmileOutlined />}
            title="Great, we have done all the coupons!"
            extra={<Button type="primary">Back</Button>}
          />
        )}
      </Card>
    </Wrapper>
  )
}

export const getServerSideProps = async (context) => {
  const taskId = context.query.id
  const { data } = await axios.get('/api/tasks/' + taskId)

  return {
    props: {
      data,
    },
  }
}

export default TaskManage

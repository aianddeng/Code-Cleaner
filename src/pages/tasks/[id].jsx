import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'
import axios from 'axios'
import useActionLoading from '@hook/useActionLoading'

import {
  Card,
  Button,
  Result,
  notification,
  Popconfirm,
  message,
  Progress,
  Modal,
  Transfer,
} from 'antd'
import { SmileOutlined } from '@ant-design/icons'

const openNotificationWithIcon = (type, message, description) => {
  notification[type]({
    message,
    description,
    duration: 1 * 60,
  })
}

const TaskManage = ({ data: initialData }) => {
  const router = useRouter()
  const currentId = router.query.id

  const { actionKey, checkLoading, pushLoading, popLoading } = useActionLoading(
    'removeCode'
  )

  const [refreshInterval, setRefreshInterval] = useState(5000)
  const { data, mutate } = useSWR('/api/tasks/' + currentId, {
    initialData,
    refreshInterval,
  })

  const [isModal, setIsModal] = useState(false)

  const [tab, setTab] = useState({
    key: 'All',
  })

  const [coupons, setCoupons] = useState([])

  useEffect(() => {
    handleTabChange(tab.key)

    if (
      initialData.coupons.slice().filter((el) => !el.validStatus).length &&
      data.state === 'completed'
    ) {
      openNotificationWithIcon(
        'success',
        'Store: ' + data.storeName,
        'This task is finished now. Please check out that coupon is valid right.'
      )
    }

    if (data.state === 'completed' && refreshInterval) {
      setRefreshInterval(0)
    }
  }, [data])

  const handleTabChange = useCallback(
    (key) => {
      setTab({ key })

      if (key === 'All') {
        setCoupons(
          data.coupons
            .slice()
            .sort((a, b) => (b.validStatus || 0) - (a.validStatus || 0))
        )
      } else if (key === 'Valid') {
        setCoupons(
          data.coupons
            .slice()
            .filter((el) => el.validStatus === 1)
            .sort((a, b) => (b.validStatus || 0) - (a.validStatus || 0))
        )
      } else if (key === 'Invalid') {
        setCoupons(
          data.coupons
            .slice()
            .filter((el) => el.validStatus <= -1)
            .sort((a, b) => (b.validStatus || 0) - (a.validStatus || 0))
        )
      } else if (key === 'Repeat') {
        const couponsSlice = data.coupons.slice().map((el) => el.code)

        const repeatCoupons = couponsSlice.filter(
          (code) =>
            couponsSlice.indexOf(code) !== couponsSlice.lastIndexOf(code)
        )

        setCoupons(
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
        setCoupons(data.coupons.slice().filter((el) => !el.validStatus))
      }
    },
    [data]
  )

  const handleDeactiveCode = useCallback(async (couponIds) => {
    pushLoading(couponIds.join(','))
    message.loading({
      content: 'Waiting...',
      duration: 0,
      key: actionKey.current,
    })

    await axios.delete('/api/coupons', {
      data: {
        taskId: currentId,
        coupons: couponIds,
      },
    })

    await mutate()
    message.success({
      content: `Deactive codes total: ${couponIds.length}`,
      duration: 6,
      key: actionKey.current,
    })
    popLoading(couponIds.join(','))
  }, [])

  const [allDeactivateCode, setAllDeactivateCode] = useState([])
  const [targetDeactivateCode, setTargetDeactivateCode] = useState([])
  const filterDeactivateCode = useCallback(() => {
    const coupons = data.coupons
    const couponsSlice = coupons.slice().map((el) => el.code)

    const repeatCoupons = coupons.filter(
      (el, index) => couponsSlice.indexOf(el.code) !== index
    )
    const invalidCoupons = coupons.filter((el) => el.validStatus === -1)

    setAllDeactivateCode([...repeatCoupons, ...invalidCoupons])
    setTargetDeactivateCode(
      [...repeatCoupons, ...invalidCoupons].map((el) => el.id)
    )
  }, [data])

  return (
    <>
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
            <Modal
              centered
              title="Choice promo code that need deactive"
              visible={isModal}
              onOk={() => {
                handleDeactiveCode(targetDeactivateCode)
                setIsModal(false)
              }}
              onCancel={() => {
                setIsModal(false)
              }}
            >
              <Transfer
                oneWay
                titles={['Keep', 'Deactive']}
                listStyle={{
                  width: 600,
                  height: 400,
                }}
                rowKey={(el) => el.id}
                dataSource={allDeactivateCode}
                render={(el) => ({
                  label: el.code,
                  value: el.id,
                })}
                targetKeys={targetDeactivateCode}
                onChange={(nextTargetKeys) => {
                  setTargetDeactivateCode(nextTargetKeys)
                }}
              />
            </Modal>
            <Card
              onClick={() => {
                filterDeactivateCode()
                setIsModal(true)
              }}
              key="removeAll"
              className="cursor-pointer flex justify-center items-center border-1 border-red-500 m-1 text-lg text-red-500"
            >
              Remove All Invlid Code
            </Card>
            {coupons.slice().map((el) => (
              <Card
                style={{
                  animationIterationCount: 1,
                }}
                className={[
                  'm-1 cursor-pointer transition-all',
                  !el.validStatus && 'border-gray-200',
                  el.validStatus === 1 && 'border-blue-500',
                  el.validStatus === -1 && 'border-red-500',
                  el.validStatus !== -2 && 'hover:shadow-xl',
                  el.validStatus === -2 &&
                    'filter blur-sm shadow-md cursor-not-allowed select-none',
                ]}
                key={el.id}
                actions={
                  el.validStatus === -2
                    ? []
                    : [
                        <Button>Manage</Button>,
                        <Popconfirm
                          title="Are you sure to deactive this code?"
                          onConfirm={() => handleDeactiveCode([el.id])}
                          disabled={el.validStatus !== -1}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button
                            danger
                            loading={checkLoading(el.id)}
                            disabled={el.validStatus !== -1}
                          >
                            Deactive
                          </Button>
                        </Popconfirm>,
                      ]
                }
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
            extra={
              <Link href="/tasks">
                <Button type="primary">Back</Button>
              </Link>
            }
          />
        )}
      </Card>
    </>
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

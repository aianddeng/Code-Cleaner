import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'
import axios from 'axios'

import { Card, Button, Result, Progress } from 'antd'
import { MehOutlined } from '@ant-design/icons'
import TaskSummary from '@comp/TaskSummary'
import TaskCards from '@comp/TaskCards'

const TaskManage = ({ data: initialData }) => {
  const router = useRouter()
  const currentId = router.query.id

  // 加载任务详情
  const [refreshInterval, setRefreshInterval] = useState(2000)
  const { data } = useSWR('/api/tasks/' + currentId, {
    initialData,
    refreshInterval,
    revalidateOnMount: true,
  })

  // 标签切换
  const [tab, setTab] = useState({
    key: 'Summary',
  })

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
      } else if (key === 'Waiting') {
        setCoupons(data.coupons.slice().filter((el) => !el.validStatus))
      } else if (key === 'Summary') {
      }
    },
    [data]
  )

  const [coupons, setCoupons] = useState([])

  useEffect(() => {
    handleTabChange(tab.key)

    if (data.state === 'completed' && refreshInterval) {
      setRefreshInterval(0)
    } else if (data.state !== 'completed' && !refreshInterval) {
      setRefreshInterval(2000)
    }
  }, [data])

  return (
    <>
      <Head>
        <title>Task Info - FatCoupon</title>
      </Head>
      <Card
        title={'Store: ' + data.storeName}
        tabList={[
          {
            key: 'Summary',
            tab: 'Summary',
          },
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
            tab: `Waiting (${
              data.allLength - data.validLength - data.invalidLength
            })`,
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
        {tab.key === 'Summary' ? (
          <TaskSummary data={data} />
        ) : coupons.length ? (
          <TaskCards id={currentId} coupons={coupons} />
        ) : (
          <Result
            status="info"
            icon={<MehOutlined />}
            title="Ops, not found any coupons in this tab!"
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

  return data.id
    ? {
        props: {
          data,
        },
      }
    : {
        redirect: {
          destination: '/tasks',
          permanent: false,
        },
      }
}

export default TaskManage

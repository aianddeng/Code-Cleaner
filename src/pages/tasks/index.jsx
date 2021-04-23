import { useCallback, useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'
import axios from 'axios'
import moment from 'moment'
import usePageSize from '@hook/usePageSize'
import useActionLoading from '@hook/useActionLoading'

import { Table, Button, message, Popconfirm, Progress } from 'antd'
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons'

const Tasks = ({ data: initialData }) => {
  const { actionKey, checkLoading, pushLoading, popLoading } = useActionLoading(
    'removetask'
  )

  const { index, size, setPageSize } = usePageSize()

  const {
    data: { total, datas: taskList, paused },
    mutate,
  } = useSWR(`/api/tasks?size=${size}&index=${index}`, {
    initialData,
    refreshInterval: 1000,
  })

  // cache the next page
  useSWR(`/api/tasks?size=${size}&index=${index + 1}`)

  const [taskState, setTaskState] = useState([
    {
      text: 'Active',
      value: 'active',
    },
    {
      text: 'Completed',
      value: 'completed',
    },
    {
      text: 'Delayed',
      value: 'delayed',
    },
    {
      text: 'Failed',
      value: 'failed',
    },
    {
      text: 'Paused',
      value: 'paused',
    },
    {
      text: 'Waiting',
      value: 'waiting',
    },
  ])

  useEffect(() => {
    setTaskState(
      Array.from(new Set(taskList.slice().map((el) => el.state)))
        .map((state) => ({
          text: [...state]
            .map((el, index) => (index ? el : el.toUpperCase()))
            .join(''),
          value: state,
        }))
        .sort((a, b) => (a < b ? -1 : 1))
    )
  }, [taskList])

  const handleRemoveTask = useCallback(async (id) => {
    pushLoading(id)
    message.loading({
      content: 'Waiting...',
      duration: 0,
      key: actionKey.current,
    })

    await axios.delete('/api/tasks/' + id)

    await mutate()
    message.success({
      content: `Switch the task: ${id}`,
      duration: 6,
      key: actionKey.current,
    })
    popLoading(id)
  }, [])

  const handleControllerTask = useCallback(async () => {
    pushLoading('controller')
    message.loading({
      content: 'Waiting...',
      duration: 0,
      key: actionKey.current,
    })

    await axios.post('/api/tasks', {
      action: paused ? 'resume' : 'pause',
    })

    await mutate()
    message.success({
      content: `Pause / Resume the task process.`,
      duration: 6,
      key: actionKey.current,
    })
    popLoading('controller')
  })

  const handleRetryTask = useCallback(async (id) => {
    pushLoading(id)
    message.loading({
      content: 'Waiting...',
      duration: 0,
      key: actionKey.current,
    })

    await axios.post('/api/tasks/' + id)

    await mutate()
    message.success({
      content: `Switch the task: ${id}`,
      duration: 6,
      key: actionKey.current,
    })
    popLoading(id)
  })

  return (
    <>
      <Head>
        <title>Task List - Fatcoupon</title>
      </Head>
      <Table
        sticky
        bordered
        rowKey="id"
        dataSource={taskList}
        scroll={{ y: 420, x: 600 }}
        title={() => (
          <div className="flex">
            <h2>Task List</h2>
            <div className="ml-auto space-x-2">
              <Button
                type="primary"
                loading={checkLoading('controller')}
                icon={paused ? <PlayCircleOutlined /> : <PauseCircleOutlined />}
                onClick={() => handleControllerTask()}
              >
                {paused ? 'Resume' : 'Pause'}
              </Button>
            </div>
          </div>
        )}
        pagination={{
          total,
          showSizeChanger: true,
          defaultPageSize: size,
          onChange: (index, size) => {
            setPageSize({ index, size })
          },
        }}
      >
        <Table.Column
          key="id"
          title="ID / Title"
          dataIndex="id"
          render={(value, record) => (
            <p>
              {value} - {record.storeName}
            </p>
          )}
        />
        <Table.Column
          key="state"
          title="Task State"
          dataIndex="state"
          filters={taskState}
          onFilter={(value, record) => record.state === value}
        />
        <Table.Column
          key="failedReason"
          title="Failed Reason"
          dataIndex="failedReason"
          render={(value, record) =>
            value ? `${value}(tries: ${record.attemptsMade})` : '-'
          }
          responsive={['xl']}
        />
        <Table.Column
          key="coupons"
          title="Coupons"
          dataIndex="promotype"
          render={(value, record) => {
            return (
              <ul className="m-0 p-0 list-none">
                <li>All: {record.allLength}</li>
                <li className="text-blue-500">
                  Valid: {record.validLength || '-'}
                </li>
                <li className="text-red-500">
                  Invalid: {record.invalidLength || '-'}
                </li>
                <li className="text-gray-500">Promotype: {value || 'all'}</li>
                <li>
                  <Progress
                    size="small"
                    showInfo={false}
                    percent={
                      ((record.validLength + record.invalidLength) /
                        record.allLength) *
                      100
                    }
                    status="exception"
                    strokeColor="rgba(239, 68, 68)"
                    success={{
                      percent: (record.validLength / record.allLength) * 100,
                      strokeColor: 'rgba(59, 130, 246)',
                    }}
                  />
                </li>
              </ul>
            )
          }}
        />
        <Table.Column
          key="createdAt"
          title="Processed / Finished"
          dataIndex="finishedOn"
          render={(value, record) => (
            <>
              <p>
                {moment(record.processedOn || record.createdOn).format(
                  'YYYY-MM-DD HH:mm:ss'
                )}
              </p>
              <p>{value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : '-'}</p>
            </>
          )}
          responsive={['lg']}
        />
        <Table.Column
          key="actions"
          title="Actions"
          dataIndex="id"
          fixed="right"
          render={(value, record) => (
            <div className="flex flex-col space-y-2">
              <Button type="primary">
                <Link href={'/tasks/' + value}>Manage</Link>
              </Button>
              <Button
                loading={checkLoading(value)}
                disabled={record.state !== 'failed'}
                onClick={() => handleRetryTask(value)}
              >
                Retry
              </Button>
              <Popconfirm
                disabled={record.state === 'active'}
                okText="Yes"
                cancelText="No"
                title="Are you sure to delete this task?"
                onConfirm={() => handleRemoveTask(value)}
              >
                <Button
                  danger
                  block
                  disabled={record.state === 'active'}
                  loading={checkLoading(value)}
                >
                  Delete
                </Button>
              </Popconfirm>
            </div>
          )}
        />
      </Table>
    </>
  )
}

export const getServerSideProps = async () => {
  const { data } = await axios.get('/api/tasks?size=10&index=1')

  return {
    props: {
      data,
    },
  }
}

export default Tasks

import { useCallback } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'
import axios from 'axios'
import moment from 'moment'
import usePageSize from '../../hooks/usePageSize'
import useActionLoading from '../../hooks/useActionLoading'

import { Table, Button, message, Popconfirm, Progress } from 'antd'

const Tasks = ({ data: initialData }) => {
  const { actionKey, checkLoading, pushLoading, popLoading } = useActionLoading(
    'removetask'
  )

  const { index, size, dispatchPageSize } = usePageSize()

  const {
    data: { total, datas: taskList },
    mutate,
  } = useSWR(`/api/tasks?size=${size}&index=${index}`, {
    initialData,
    refreshInterval: 1000,
  })

  const handleEditTask = useCallback(async (taskId, type) => {
    pushLoading(taskId)
    message.loading({
      content: 'Waiting...',
      duration: 0,
      key: actionKey.current,
    })

    if (type === 'remove') {
      await axios.delete('/api/tasks', {
        data: {
          taskId,
        },
      })
    } else if (type === 'disable') {
      await axios.post('/api/tasks', {
        taskId,
      })
    }

    await mutate()
    message.success({
      content: `Switch the task: ${taskId}`,
      duration: 6,
      key: actionKey.current,
    })
    popLoading(taskId)
  }, [])

  return (
    <>
      <Head>
        <title>Task List - Fatcoupon</title>
      </Head>
      <Table
        sticky
        bordered
        rowKey="_id"
        dataSource={taskList}
        scroll={{ y: 380, x: 800 }}
        title={() => <h2>Task List</h2>}
        pagination={{
          total,
          showSizeChanger: true,
          defaultPageSize: size,
          onChange: (index, size) => {
            dispatchPageSize({ index, size })
          },
        }}
      >
        <Table.Column key="_id" title="ID" dataIndex="_id" />
        <Table.Column
          key="storeName"
          title="Store Name"
          dataIndex="storeName"
        />
        <Table.Column key="status" title="Task Status" dataIndex="status" />
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
          title="Created / Finished"
          dataIndex="lastFinishedAt"
          render={(value, record) => (
            <>
              <p>{moment(record.createdAt).format('YYYY-MM-DD HH:mm:ss')}</p>
              <p>{value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : '-'}</p>
            </>
          )}
        />
        <Table.Column
          key="action"
          title="Action"
          dataIndex="_id"
          fixed="right"
          render={(value, record) => (
            <div className="flex flex-col space-y-2">
              <Button type="primary" loading={checkLoading(value)}>
                <Link href={'/tasks/' + value}>Manage</Link>
              </Button>
              <Button
                loading={checkLoading(value)}
                disabled={record.status === 'finished'}
                onClick={() => handleEditTask(value, 'disable')}
              >
                {record.disabled ? 'Continue' : 'Disable'}
              </Button>
              <Popconfirm
                okText="Yes"
                cancelText="No"
                title="Are you sure to delete this task?"
                onConfirm={() => handleEditTask(value, 'remove')}
              >
                <Button danger loading={checkLoading(value)}>
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
  const { data } = await axios.get('/api/tasks')

  return {
    props: {
      data,
    },
  }
}

export default Tasks

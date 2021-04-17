import axios from 'axios'
import moment from 'moment'
import useSWR, { mutate } from 'swr'
import { useCallback, useState } from 'react'
import { Table, Button, message, Popconfirm, Progress } from 'antd'
import Head from 'next/head'
import useActionLoading from '../../hooks/useActionLoading'
import usePageLoading from '../../hooks/usePageLoading'
import usePageSize from '../../hooks/usePageSize'
import Wrapper from '../../components/Wrapper'

const Tasks = ({ data: initialData }) => {
  const { actionKey, checkLoading, pushLoading, popLoading } = useActionLoading(
    'removetask'
  )

  const { index, size, dispatchPageSize } = usePageSize()

  const {
    data: { total, datas: taskList },
  } = useSWR(`/api/tasks?size=${size}&index=${index}`, {
    initialData,
    refreshInterval: 1000,
  })

  const { loading, handleRedirect } = usePageLoading()

  const handleDeleteTask = useCallback(async (taskId) => {
    pushLoading(taskId)
    message.loading({
      content: 'Waiting...',
      duration: 0,
      key: actionKey.current,
    })

    await axios.delete('/api/tasks', {
      data: {
        taskId,
      },
    })

    message.success({
      content: `Remove the task: ${taskId}`,
      duration: 6,
      key: actionKey.current,
    })
    await mutate(`/api/tasks?size=${size}&page=${index}`)
    popLoading(taskId)
  }, [])

  const handleDisableTask = useCallback(async (taskId) => {
    pushLoading(taskId)
    message.loading({
      content: 'Waiting...',
      duration: 0,
      key: actionKey.current,
    })

    await axios.post('/api/tasks', {
      taskId,
    })

    message.success({
      content: `Switch the task: ${taskId}`,
      duration: 6,
      key: actionKey.current,
    })
    await mutate(`/api/tasks?size=${size}&page=${index}`)
    popLoading(taskId)
  }, [])

  return (
    <Wrapper defaultLoading={loading}>
      <Head>
        <title>Task List - Fatcoupon</title>
      </Head>
      <Table
        dataSource={taskList}
        rowKey="_id"
        title={() => <h2>Task List</h2>}
        pagination={{
          total,
          showSizeChanger: true,
          defaultPageSize: size,
          onChange: (index, size) => {
            dispatchPageSize({ index, size })
          },
        }}
        bordered
        scroll={{ y: 380, x: 800 }}
        sticky
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
            <div className="flex flex-col space-y-1">
              <Button
                type="primary"
                loading={checkLoading(value)}
                onClick={() => handleRedirect('/tasks/' + value)}
              >
                Manage
              </Button>
              <Button
                disabled={record.status === 'finished'}
                loading={checkLoading(value)}
                onClick={() => handleDisableTask(value)}
              >
                {record.disabled ? 'Continue' : 'Disable'}
              </Button>
              <Popconfirm
                title="Are you sure to delete this task?"
                onConfirm={() => handleDeleteTask(value)}
                okText="Yes"
                cancelText="No"
              >
                <Button danger loading={checkLoading(value)}>
                  Delete
                </Button>
              </Popconfirm>
            </div>
          )}
        />
      </Table>
    </Wrapper>
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

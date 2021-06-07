import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios from 'axios'
import moment from 'moment'
import { Table, Button } from 'antd'
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons'
import useTaskActions from '@hook/useTaskActions'
import { useEffect, useState } from 'react'

import CouponState from '@comp/CouponState'
import TaskActions from '@comp/TaskActions'

const defineStates = [
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
]

const fetcher = (url, page, size, storeId, states) =>
  axios
    .get(url, {
      params: {
        page,
        size,
        storeId,
        states,
      },
    })
    .then((res) => res.data)

const TaskTable = ({
  page,
  size,
  storeId,
  states,
  initialData,
  setInitialData,
  dispatchQuery,
}) => {
  const { data, mutate } = useSWR(
    ['/api/tasks', page, size, storeId, states],
    fetcher,
    {
      initialData,
      refreshInterval: 2000,
      revalidateOnMount: true,
    }
  )
  const { total, datas, paused } = data

  const { checkLoading, handleControllerTask } = useTaskActions(mutate)

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(false)
    setInitialData(data)
  }, [data])

  const router = useRouter()

  return (
    <Table
      sticky
      bordered
      rowKey="id"
      dataSource={datas}
      loading={loading}
      scroll={{ y: 420, x: 600 }}
      title={() => (
        <div className="flex">
          <h2>Task List {storeId ? `- ID: ${storeId}` : null}</h2>
          <div className="ml-auto space-x-2">
            <Button hidden={!Object.keys(router.query).length}>
              <Link href="/tasks">
                <a>Show All</a>
              </Link>
            </Button>
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
        total: Number(total),
        current: Number(page),
        pageSize: Number(size),
        defaultPageSize: Number(size),
        showSizeChanger: true,
      }}
      onChange={(pagination, filters) => {
        setLoading(true)
        dispatchQuery({
          type: 'change',
          data: {
            page: pagination.current,
            size: pagination.pageSize,
            states: filters.state,
          },
        })
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
        filters={defineStates}
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
        render={(_, record) => <CouponState {...record} />}
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
            {value ? (
              <TaskActions data={record} showManage={true} mutate={mutate} />
            ) : null}
          </div>
        )}
      />
    </Table>
  )
}

export default TaskTable

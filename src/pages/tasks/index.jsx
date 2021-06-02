import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios from 'axios'
import moment from 'moment'
import usePageSize from '@hook/usePageSize'
import useTaskActions from '@hook/useTaskActions'

import { Table, Button, Progress } from 'antd'
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons'
import TaskActions from '@comp/TaskActions'

const fetcher = (url, size, index, storeId, states) =>
  axios
    .get(url, { params: { size, index, storeId, states } })
    .then((res) => res.data)

const Tasks = ({ initialData }) => {
  const { checkLoading, handleControllerTask } = useTaskActions()

  // 任务列表
  const router = useRouter()
  const {
    states: queryStates,
    storeId,
    index: queryIndex,
    size: querySize,
  } = router.query

  const [states, setStates] = useState(
    queryStates ? queryStates.split(',') : []
  )
  const { index, size, setPageSize } = usePageSize(queryIndex, querySize)

  const {
    data: { total, datas: taskList, paused },
  } = useSWR(
    ['/api/tasks', size, index, storeId, states ? states.join(',') : null],
    fetcher,
    {
      initialData,
      revalidateOnMount: true,
      refreshInterval: 1 * 1000,
    }
  )

  useSWR(
    () =>
      total > index * size
        ? [
            '/api/tasks',
            size,
            index + 1,
            storeId,
            states ? states.join(',') : null,
          ]
        : null,
    fetcher
  )

  // 列表筛选
  const [taskStates] = useState([
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
                hidden={
                  !Object.keys(router.query).filter((el) => el !== 'settings')
                    .length
                }
              >
                <Link href="/tasks">
                  <a>Show All</a>
                </Link>
              </Button>
              <Button
                type="primary"
                loading={checkLoading('controller')}
                icon={paused ? <PlayCircleOutlined /> : <PauseCircleOutlined />}
                onClick={() =>
                  handleControllerTask({ size, index, storeId, states })
                }
              >
                {paused ? 'Resume' : 'Pause'}
              </Button>
            </div>
          </div>
        )}
        pagination={{
          total,
          current: Number(index),
          pageSize: Number(size),
          showSizeChanger: true,
          defaultPageSize: size,
        }}
        onChange={(pagination, filters) => {
          setPageSize({ index: pagination.current, size: pagination.pageSize })
          setStates(filters.state)
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
          filters={taskStates}
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
              {value ? (
                <TaskActions
                  data={record}
                  showManage={true}
                  size={size}
                  index={index}
                  storeId={storeId}
                  states={states}
                />
              ) : (
                false
              )}
            </div>
          )}
        />
      </Table>
    </>
  )
}

export const getServerSideProps = async ({ query }) => {
  const { size, index, storeId, states } = query

  const { data } = await axios.get('/api/tasks', {
    params: { size, index, storeId, states },
  })

  return {
    props: {
      initialData: data,
    },
  }
}

export default Tasks

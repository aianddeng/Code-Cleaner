import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios from 'axios'
import moment from 'moment'
import { useEffect, useState, useCallback } from 'react'
import useTaskActions from '@hook/useTaskActions'

import { Table, Button, Popover, Input } from 'antd'
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons'
import CouponState from '@comp/CouponState'
import TaskActions from '@comp/TaskActions'

function getTableScroll() {
  // 32 pagination height
  // 16 * 2 pagination margin
  // 70 footer height
  const bottomHeight = 32 + 16 * 2 + 70

  const topHeight = document
    .getElementsByClassName('ant-table-thead')[0]
    .getBoundingClientRect().bottom

  const height = `calc(100vh - ${topHeight}px - ${bottomHeight}px - 1rem)`

  return window.innerHeight < 768 ? null : height
}

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

const fetcher = (url, page, size, storeId, states, filter) =>
  axios
    .get(url, {
      params: {
        page,
        size,
        storeId,
        states,
        filter,
      },
    })
    .then((res) => res.data)

const TaskTable = ({
  page,
  size,
  storeId,
  states,
  filter,
  initialData,
  setInitialData,
  dispatchQuery,
}) => {
  const [scrollY, setScrollY] = useState('')
  useEffect(() => {
    setScrollY(getTableScroll())
  }, [])

  useSWR(['/api/tasks', page + 1, size, storeId, states, filter], fetcher)
  const { data, mutate, isValidating } = useSWR(
    ['/api/tasks', page, size, storeId, states, filter],
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

  useEffect(() => {
    if (!isValidating) {
      setLoading(false)
      setInitialData(data)
    }
  }, [isValidating])

  const router = useRouter()

  const handleFilterStore = useCallback(
    (filter) => {
      setLoading(true)
      dispatchQuery({
        type: 'change',
        data: {
          filter,
        },
      })
    },
    [loading]
  )

  return (
    <>
      <Input.Search
        enterButton
        className="mb-3"
        placeholder="Search Now"
        list="countries"
        onSearch={(e) => handleFilterStore(e)}
      />
      <Table
        sticky
        bordered
        rowKey="id"
        dataSource={datas}
        loading={loading}
        scroll={{ x: !!datas.length, y: scrollY }}
        title={() => (
          <div className="flex flex-col md:flex-row">
            <h2>Task List {storeId ? `- ID: ${storeId}` : null}</h2>
            <div className="ml-auto space-x-2">
              <Button
                hidden={
                  !Object.keys(router.query).filter(
                    (el) => !(el === 'settings' || el === 'messages')
                  ).length
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
          title="ID / Store"
          dataIndex="id"
          render={(value, record) => (
            <p className="mb-0">
              {value} - {record.storeName}
            </p>
          )}
        />
        <Table.Column
          key="state"
          title="State"
          dataIndex="state"
          filters={defineStates}
          responsive={['md']}
          render={(value, record) =>
            value === 'failed' ? (
              <Popover
                placement="topLeft"
                content={
                  <div className="max-w-xs">
                    <p>{record.failedReason}</p>
                    <p>Tries: {record.attemptsMade}</p>
                  </div>
                }
                title="Failed Reason"
              >
                <a>{value}</a>
              </Popover>
            ) : (
              value
            )
          }
        />
        <Table.Column
          key="coupons"
          title="Coupons"
          dataIndex="promotype"
          render={(_, record) => <CouponState {...record} />}
        />
        <Table.Column
          key="createdAt"
          title="Created / Finished"
          dataIndex="finishedOn"
          render={(value, record) => (
            <div className="space-y-1">
              <p className="m-0">
                {moment(record.createdOn).format('YYYY-MM-DD HH:mm:ss')}
              </p>
              <p className="m-0">
                {value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : '-'}
              </p>
            </div>
          )}
          responsive={['lg']}
        />
        <Table.Column
          key="actions"
          title="Actions"
          dataIndex="id"
          fixed="right"
          render={(value, record) => (
            <div className="flex flex-row flex-wrap max-w-xs">
              {value ? <TaskActions data={record} mutate={mutate} /> : null}
            </div>
          )}
        />
      </Table>
    </>
  )
}

export default TaskTable

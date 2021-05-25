import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'

import { Input, Table, Button } from 'antd'
const TaskSubmit = dynamic(() => import('@comp/TaskSubmit'))

const Index = ({ initialData }) => {
  const [storesList, setStoresList] = useState(initialData)

  const handleFilterStore = useCallback(
    (value) => {
      if (value) {
        const matchValue = new RegExp(value.replace(/\s/g, ''), 'i')
        const matchStore = initialData.filter((el) =>
          (el.name + el.domain + el.id).replace(/\s/g, '').match(matchValue)
        )
        setStoresList(matchStore)
      } else {
        setStoresList(initialData)
      }
    },
    [storesList]
  )

  const [isModal, setIsModal] = useState(false)
  const [taskData, setTaskData] = useState({
    storeId: null,
    storeName: null,
  })

  return (
    <>
      <Head>
        <title>Store List - Fatcoupon</title>
      </Head>
      {taskData.storeId ? (
        <TaskSubmit
          isModal={isModal}
          setIsModal={setIsModal}
          taskData={taskData}
        />
      ) : null}
      <Input.Search
        enterButton
        className="mb-3"
        placeholder="Search Now"
        onSearch={(e) => handleFilterStore(e)}
        onBlur={(e) => handleFilterStore(e.target.value)}
      />
      <Table
        sticky
        bordered
        rowKey="id"
        dataSource={storesList}
        scroll={{ y: 380, x: 300 }}
        title={() => <h2>Store List</h2>}
        pagination={{
          showSizeChanger: true,
          defaultPageSize: 50,
        }}
      >
        <Table.Column key="id" title="ID" dataIndex="id" responsive={['md']} />
        <Table.Column
          key="name"
          title="Store Name"
          dataIndex="name"
          sortDirections={['descend', 'ascend']}
          sorter={(a, b) => {
            return a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
          }}
          showSorterTooltip={{
            title: 'sort mappings store name',
          }}
        />
        <Table.Column
          key="domain"
          title="Website Domain"
          dataIndex="domain"
          responsive={['md']}
        />
        <Table.Column
          fixed="right"
          key="mapping"
          title="Actions"
          dataIndex="mapping"
          defaultSortOrder="descend"
          sortDirections={['descend']}
          sorter={(a, b) => Number(a.mapping) - Number(b.mapping)}
          showSorterTooltip={{
            title: 'sort mappings store actions',
          }}
          render={(value, record) => (
            <div className="space-y-2 flex flex-col md:flex-row md:space-x-2 md:space-y-0">
              <Button
                type="primary"
                disabled={!value}
                onClick={() => {
                  setTaskData({
                    storeId: record.id,
                    storeName: record.name,
                  })
                  setIsModal(true)
                }}
              >
                Add To Task
              </Button>
              <Button>
                <Link
                  href={{
                    pathname: '/tasks',
                    query: { storeId: record.id },
                  }}
                >
                  Check Store Tasks
                </Link>
              </Button>
            </div>
          )}
        />
      </Table>
    </>
  )
}

export const getServerSideProps = async () => {
  const { data } = await axios.get('/api/stores')

  return {
    props: {
      initialData: data,
    },
  }
}

export default Index

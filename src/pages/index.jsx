import { useState, useCallback, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'

import { Input, Table, Button, Dropdown, Menu } from 'antd'
import { FileAddOutlined, FolderViewOutlined } from '@ant-design/icons'

import RefreshButton from '@comp/RefreshButton'
const TaskSubmit = dynamic(() => import('@comp/TaskSubmit'))

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

const Index = ({ initialData }) => {
  const [scrollY, setScrollY] = useState('')
  useEffect(() => {
    setScrollY(getTableScroll())
  }, [])

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
    productLink: null,
  })
  const [selectStoreIds, setSelectStoreIds] = useState([])

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
        list="countries"
        onSearch={(e) => handleFilterStore(e)}
        onBlur={(e) => handleFilterStore(e.target.value)}
      />
      <datalist id="countries">
        {initialData.map((el) => (
          <option key={el.id} value={el.name} />
        ))}
      </datalist>
      <Table
        sticky
        bordered
        rowKey="id"
        rowSelection={{
          type: 'checkbox',
          fixed: true,
          preserveSelectedRowKeys: true,
          selectedRowKeys: selectStoreIds,
          onChange: (ids, records) => setSelectStoreIds(ids),
          getCheckboxProps: (record) => ({
            disabled: !record.mapping,
          }),
        }}
        dataSource={storesList}
        scroll={{ x: 375, y: scrollY }}
        title={() => (
          <div className="flex flex-col md:flex-row">
            <h2>Stores List</h2>
            <div className="ml-auto space-y-2 md:space-y-0 md:space-x-2">
              <RefreshButton />
              <Dropdown.Button
                type="primary"
                disabled={!selectStoreIds.length}
                onClick={() => {
                  setTaskData({
                    storeId: selectStoreIds.join(','),
                  })
                  setIsModal(true)
                }}
                overlay={
                  <Menu>
                    <Menu.Item key="1" onClick={() => setSelectStoreIds([])}>
                      Clear Select
                    </Menu.Item>
                  </Menu>
                }
              >
                Batch Add Tasks
              </Dropdown.Button>
            </div>
          </div>
        )}
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
                icon={<FileAddOutlined />}
                type="primary"
                disabled={!value}
                onClick={() => {
                  setTaskData({
                    storeId: record.id,
                    storeName: record.name,
                    productLink: record.product,
                  })
                  setIsModal(true)
                }}
              >
                Add To Task
              </Button>
              <Link
                href={{
                  pathname: '/tasks',
                  query: { storeId: record.id },
                }}
              >
                <Button icon={<FolderViewOutlined />}>Check Tasks</Button>
              </Link>
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

import { useState, useCallback } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { mutate } from 'swr'
import axios from 'axios'
import useActionLoading from '@hook/useActionLoading'

import { Input, Table, Button, message, Dropdown, Menu, Modal } from 'antd'

const Index = ({ initialData }) => {
  const { actionKey, checkLoading, pushLoading, popLoading } =
    useActionLoading('addtotasks')

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

  const handleSubmitTask = useCallback(async (storeId, storeName) => {
    pushLoading(storeId)
    message.loading({
      content: 'Waiting...',
      duration: 0,
      key: actionKey.current,
    })

    const { data } = await axios.put('/api/tasks', {
      storeId,
      storeName,
    })
    await mutate(['/api/tasks', 10, 1, undefined])

    message.success({
      content: `Create a new task: ${data.id}`,
      duration: 6,
      key: actionKey.current,
    })

    popLoading(storeId)
  }, [])

  const [isModal, setIsModal] = useState(false)
  const [productInfo, setProductInfo] = useState({})

  const handleEditProduct = useCallback(async () => {
    await axios.put('/api/product', productInfo)
  }, [productInfo])

  return (
    <>
      <Modal
        centered
        title="Enter product link and submit"
        okText="Submit"
        visible={isModal}
        onOk={() => {
          handleEditProduct()
          setIsModal(false)
        }}
        onCancel={() => {
          setIsModal(false)
        }}
      >
        <Input
          placeholder="Product Link"
          value={productInfo.link}
          onChange={(e) =>
            setProductInfo({
              ...productInfo,
              link: e.target.value,
            })
          }
        />
      </Modal>
      <Head>
        <title>Store List - Fatcoupon</title>
      </Head>
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
              <Dropdown.Button
                type="primary"
                disabled={!value}
                // loading={checkLoading(record.id)}
                onClick={() => handleSubmitTask(record.id, record.name)}
                overlay={
                  <Menu
                    onClick={() => {
                      setIsModal(true)
                      setProductInfo({ storeId: record.id })
                    }}
                  >
                    <Menu.Item key="1">Edit Product Link</Menu.Item>
                  </Menu>
                }
              >
                Add To Tasks
              </Dropdown.Button>
              <Button>
                <Link
                  href={{
                    pathname: '/tasks',
                    query: { storeId: record.id },
                  }}
                >
                  Check Store
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

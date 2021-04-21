import { useState, useCallback } from 'react'
import Head from 'next/head'
import { mutate } from 'swr'
import axios from 'axios'
import useActionLoading from '@hook/useActionLoading'

import { Input, Table, Button, message } from 'antd'

const Index = ({ stores: initialData }) => {
  const { actionKey, checkLoading, pushLoading, popLoading } = useActionLoading(
    'addtotasks'
  )

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

    message.success({
      content: `Create a new task: ${data.id}`,
      duration: 6,
      key: actionKey.current,
    })

    mutate('/api/tasks?size=10&index=1')
    popLoading(storeId)
  }, [])

  return (
    <>
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
        scroll={{ y: 380, x: 600 }}
        title={() => <h2>Store List</h2>}
        pagination={{
          showSizeChanger: true,
          defaultPageSize: 50,
        }}
      >
        <Table.Column key="id" title="ID" dataIndex="id" responsive={['md']} />
        <Table.Column key="name" title="Store Name" dataIndex="name" />
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
            title: 'sort mappings store',
          }}
          render={(value, record) => (
            <Button
              type="primary"
              disabled={!value}
              loading={checkLoading(record.id)}
              onClick={() => handleSubmitTask(record.id, record.name)}
            >
              Add to Tasks
            </Button>
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
      stores: data,
    },
  }
}

export default Index

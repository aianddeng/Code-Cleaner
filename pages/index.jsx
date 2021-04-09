import axios from 'axios'
import { useRef, useState, useCallback } from 'react'
import { Input, Table, Button, message } from 'antd'
import useActionLoading from '../hooks/useActionLoading'
import Head from 'next/head'
import Wrapper from '../components/wrapper'

const Index = ({ stores }) => {
    const actionKey = useRef('addtotasks')
    const [storesList, dispatchStoresList] = useState(stores)
    const { checkLoading, pushLoading, popLoading } = useActionLoading()

    const onSearch = useCallback(
        value => {
            if (value) {
                const matchValue = new RegExp(value.replace(/\s/g, ''), 'i')
                const matchStore = stores.filter(el =>
                    (el.name + el.domain + el.id)
                        .replace(/\s/g, '')
                        .match(matchValue)
                )
                dispatchStoresList(matchStore)
            } else {
                dispatchStoresList(stores)
            }
        },
        [storesList]
    )

    const onChange = useCallback(
        e => {
            const { value } = e.target
            onSearch(value)
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
            content: `Create a new task: ${data._id}`,
            duration: 2.5,
            key: actionKey.current,
        })
        popLoading(storeId)
    }, [])

    return (
        <Wrapper>
            <Head>
                <title>Store List - Fatcoupon</title>
            </Head>
            <Input.Search
                placeholder="Search Now"
                onSearch={e => onSearch(e)}
                onBlur={e => onChange(e)}
                enterButton
                style={{
                    marginBottom: 12,
                }}
            />
            <Table
                dataSource={storesList}
                rowKey="id"
                title={() => <h2>Store List</h2>}
                pagination={{
                    showSizeChanger: true,
                    defaultPageSize: 50,
                }}
                scroll={{ y: 400, x: 600 }}
                sticky
            >
                <Table.Column key="id" title="ID" dataIndex="id" />
                <Table.Column key="name" title="Store Name" dataIndex="name" />
                <Table.Column
                    key="domain"
                    title="Website Domain"
                    dataIndex="domain"
                />
                <Table.Column
                    key="mapping"
                    title="Action"
                    dataIndex="mapping"
                    render={(value, record) => (
                        <Button
                            type="primary"
                            disabled={!value}
                            loading={checkLoading(record.id)}
                            onClick={() =>
                                handleSubmitTask(record.id, record.name)
                            }
                        >
                            Add to Tasks
                        </Button>
                    )}
                    sorter={(a, b) => Number(a.mapping) - Number(b.mapping)}
                    defaultSortOrder="descend"
                    sortDirections={['descend']}
                    showSorterTooltip={{
                        title: 'sort mappings store',
                    }}
                    fixed="right"
                />
            </Table>
        </Wrapper>
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

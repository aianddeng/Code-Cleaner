import { useRef, useState, useCallback } from 'react'
import { Input, Table, Space, Button, message } from 'antd'
import axios from 'axios'

const { Search } = Input

const Index = ({ stores }) => {
    const key = useRef('addtotasks')

    const [storesList, dispatchStoresList] = useState(stores)

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
        message.loading({
            content: 'Waiting...',
            duration: 0,
            key: key.current,
        })

        const { data } = await axios.put('http://localhost:3000/api/tasks', {
            storeId,
            storeName,
        })
        await new Promise(resolve => setTimeout(resolve, 500))

        message.success({
            content: `Create a new task: ${data._id}`,
            duration: 2.5,
            key: key.current,
        })
    }, [])

    return (
        <div
            style={{
                padding: '12px',
                width: '100vw',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div
                style={{
                    width: '1024px',
                }}
            >
                <Space direction="vertical">
                    <Search
                        placeholder="input search text"
                        onSearch={e => onSearch(e)}
                        onBlur={e => onChange(e)}
                        enterButton
                    />
                    <Table
                        dataSource={storesList}
                        rowKey="id"
                        title={() => <h2>Store List</h2>}
                        pagination={{
                            showSizeChanger: true,
                            defaultPageSize: 50,
                        }}
                        scroll={{ y: 400 }}
                        bordered
                    >
                        <Table.Column key="id" title="ID" dataIndex="id" />
                        <Table.Column
                            key="name"
                            title="Store Name"
                            dataIndex="name"
                        />
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
                                    disabled={!value}
                                    onClick={() =>
                                        handleSubmitTask(record.id, record.name)
                                    }
                                >
                                    Add to Tasks
                                </Button>
                            )}
                            sorter={(a, b) =>
                                Number(a.mapping) - Number(b.mapping)
                            }
                            defaultSortOrder="descend"
                            sortDirections={['descend']}
                            showSorterTooltip={{
                                title: 'sort mappings store',
                            }}
                        />
                    </Table>
                </Space>
            </div>
        </div>
    )
}

export const getServerSideProps = async () => {
    const { data } = await axios.get('http://localhost:3000/api/stores')

    return {
        props: {
            stores: data,
        },
    }
}

export default Index

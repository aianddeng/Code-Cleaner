import axios from 'axios'
import moment from 'moment'
import useSWR, { mutate } from 'swr'
import { useRef, useCallback } from 'react'
import { Table, Button, message } from 'antd'
import useActionLoading from '../hooks/useActionLoading'
import Head from 'next/head'
import Wrapper from '../components/wrapper'

const fetcher = async url => {
    const { data } = await axios.get('/api' + url)
    return data
}

const Tasks = ({ data: initialData }) => {
    const actionKey = useRef('removetask')
    const { checkLoading, pushLoading, popLoading } = useActionLoading()

    const { data: taskList } = useSWR('/tasks', fetcher, {
        initialData,
        refreshInterval: 2000,
    })

    const handleRemoveTask = useCallback(async taskId => {
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
            duration: 2.5,
            key: actionKey.current,
        })
        popLoading(taskId)
        mutate('/tasks')
    }, [])

    return (
        <Wrapper>
            <Head>
                <title>Current Task List - Fatcoupon</title>
            </Head>
            <Table
                dataSource={taskList}
                rowKey="_id"
                title={() => <h2>Task List</h2>}
                pagination={{
                    showSizeChanger: true,
                    defaultPageSize: 10,
                }}
                scroll={{ y: 400, x: 800 }}
                sticky
            >
                <Table.Column key="_id" title="ID" dataIndex="_id" />
                <Table.Column
                    key="storeName"
                    title="Store Name"
                    dataIndex="storeName"
                />
                <Table.Column
                    key="status"
                    title="Task Status"
                    dataIndex="status"
                />
                <Table.Column
                    key="coupons"
                    title="Coupons"
                    dataIndex="coupons"
                    render={(coupons, record) => {
                        const validLength = record.validCoupons.length
                        const invalidLength = record.invalidCoupons.length
                        const allLength = coupons.length

                        return validLength || invalidLength ? (
                            <div>
                                <ul
                                    style={{
                                        margin: 0,
                                        padding: 0,
                                    }}
                                >
                                    <li
                                        style={{
                                            listStyle: 'none',
                                        }}
                                    >
                                        All: {allLength}
                                    </li>
                                    <li
                                        style={{
                                            listStyle: 'none',
                                        }}
                                    >
                                        Valid: {validLength}
                                    </li>
                                    <li
                                        style={{
                                            listStyle: 'none',
                                        }}
                                    >
                                        Invalid: {invalidLength}
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div>
                                <ul
                                    style={{
                                        margin: 0,
                                        padding: 0,
                                    }}
                                >
                                    <li
                                        style={{
                                            listStyle: 'none',
                                        }}
                                    >
                                        All: {allLength}
                                    </li>
                                </ul>
                            </div>
                        )
                    }}
                />
                <Table.Column
                    key="createdAt"
                    title="Created Time"
                    dataIndex="createdAt"
                    render={value =>
                        moment(value).format('YYYY-MM-DD HH:mm:ss')
                    }
                />
                <Table.Column
                    key="lastFinishedAt"
                    title="Last Finished Time"
                    dataIndex="lastFinishedAt"
                    render={value =>
                        value
                            ? moment(value).format('YYYY-MM-DD HH:mm:ss')
                            : '-'
                    }
                />
                <Table.Column
                    key="action"
                    title="Action"
                    dataIndex="_id"
                    render={(value, record) => (
                        <div>
                            <Button
                                block
                                style={{
                                    margin: '4px 0px',
                                }}
                                type="primary"
                                disabled={record.status === 'doing'}
                                loading={checkLoading(value)}
                                onClick={() => handleRemoveTask(value)}
                            >
                                Manage
                            </Button>
                            <Button
                                block
                                style={{
                                    margin: '4px 0px',
                                }}
                                disabled={record.status === 'doing'}
                                loading={checkLoading(value)}
                                onClick={() => handleRemoveTask(value)}
                            >
                                Disable
                            </Button>
                            <Button
                                block
                                danger
                                style={{
                                    margin: '4px 0px',
                                }}
                                disabled={record.status === 'doing'}
                                loading={checkLoading(value)}
                                onClick={() => handleRemoveTask(value)}
                            >
                                Remove
                            </Button>
                        </div>
                    )}
                    fixed="right"
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

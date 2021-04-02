import axios from 'axios'
import moment from 'moment'
import useSWR, { mutate } from 'swr'
import { useRef, useCallback } from 'react'
import { Table, Button, message } from 'antd'
import useActionLoading from '../hooks/useActionLoading'

const fetcher = async url => {
    const { data } = await axios.get('/api' + url)
    return data
}

const Tasks = ({ data: initialData }) => {
    const actionKey = useRef('removetask')
    const { checkLoading, pushLoading, popLoading } = useActionLoading()

    const { data: taskList } = useSWR('/tasks', fetcher, {
        initialData,
        refreshInterval: 10000,
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
        await new Promise(resolve => setTimeout(resolve, 800))

        message.success({
            content: `Remove the task: ${taskId}`,
            duration: 2.5,
            key: actionKey.current,
        })
        popLoading(taskId)
        mutate('/tasks')
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
                <Table
                    dataSource={taskList}
                    rowKey="_id"
                    title={() => <h2>Task List</h2>}
                    pagination={{
                        showSizeChanger: true,
                        defaultPageSize: 10,
                    }}
                    scroll={{ y: 400 }}
                    bordered
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
                        key="createdAt"
                        title="Created Time"
                        dataIndex="createdAt"
                        render={value =>
                            moment(value).format('YYYY-MM-DD HH:mm:ss')
                        }
                    />
                    <Table.Column
                        key="updatedAt"
                        title="Updated Time"
                        dataIndex="updatedAt"
                        render={value =>
                            moment(value).format('YYYY-MM-DD HH:mm:ss')
                        }
                    />
                    <Table.Column
                        key="action"
                        title="Action"
                        dataIndex="_id"
                        render={value => (
                            <Button
                                danger
                                loading={checkLoading(value)}
                                onClick={() => handleRemoveTask(value)}
                            >
                                Remove
                            </Button>
                        )}
                    />
                </Table>
            </div>
        </div>
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

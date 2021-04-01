import { useRef, useCallback, useState } from 'react'
import axios from 'axios'
import useSWR, { mutate } from 'swr'
import { Table, Button, message } from 'antd'
import moment from 'moment'

const fetcher = async url => {
    const { data } = await axios.get('http://localhost:3000/api' + url)
    return data
}

const Tasks = ({ data: initialData }) => {
    const key = useRef('removetask')

    const { data: taskList } = useSWR('/tasks', fetcher, {
        initialData,
        refreshInterval: 10000,
    })

    const [taskActionState, dispatchTaskActionState] = useState([])

    const handleRemoveTask = useCallback(
        async taskId => {
            dispatchTaskActionState([...taskActionState, taskId])

            message.loading({
                content: 'Waiting...',
                duration: 0,
                key: key.current,
            })

            const { data } = await axios.delete(
                'http://localhost:3000/api/tasks',
                {
                    data: {
                        taskId,
                    },
                }
            )
            await new Promise(resolve => setTimeout(resolve, 2500))

            message.success({
                content: `Remove the task: ${taskId}`,
                duration: 2.5,
                key: key.current,
            })
            mutate('/tasks')
            dispatchTaskActionState([
                ...taskActionState.slice().filter(el => el !== taskId),
            ])
            console.log(data)
        },
        [taskActionState]
    )

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
                    title={() => <h2>Tasks List</h2>}
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
                                loading={taskActionState.includes(value)}
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
    const data = await fetcher('/tasks')

    return {
        props: {
            data,
        },
    }
}

export default Tasks

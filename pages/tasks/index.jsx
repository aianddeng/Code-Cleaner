import axios from 'axios'
import moment from 'moment'
import useSWR, { mutate } from 'swr'
import { useState, useCallback } from 'react'
import { Table, Button, message } from 'antd'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import useActionLoading from '../../hooks/useActionLoading'
import Wrapper from '../../components/wrapper'

const fetcher = async url => {
    const { data } = await axios.get('/api' + url)
    return data
}

const Tasks = ({ data: initialData }) => {
    const router = useRouter()

    const {
        actionKey,
        checkLoading,
        pushLoading,
        popLoading,
    } = useActionLoading('removetask')

    const { data: taskList } = useSWR('/tasks', fetcher, {
        initialData,
        refreshInterval: 1000,
    })

    const handleRedirect = useCallback(async path => {
        await Router.push(path)
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

    const handleDisableTask = useCallback(async taskId => {
        pushLoading(taskId)
        message.loading({
            content: 'Waiting...',
            duration: 0,
            key: actionKey.current,
        })

        await axios.post('/api/tasks', {
            taskId,
        })

        message.success({
            content: `Switch the task: ${taskId}`,
            duration: 2.5,
            key: actionKey.current,
        })
        popLoading(taskId)
        mutate('/tasks')
    }, [])

    return (
        <Wrapper>
            <Head>
                <title>Task List - Fatcoupon</title>
            </Head>
            <Table
                dataSource={taskList}
                rowKey="_id"
                title={() => <h2>Task List</h2>}
                pagination={{
                    showSizeChanger: true,
                    defaultPageSize: 10,
                }}
                bordered
                scroll={{ y: 380, x: 800 }}
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
                    render={coupons => {
                        const allLength = coupons.length
                        const validLength = coupons.filter(
                            el => el.validStatus === 1
                        ).length
                        const invalidLength = coupons.filter(
                            el => el.validStatus === -1
                        ).length

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
                                loading={checkLoading(value)}
                                onClick={() =>
                                    handleRedirect('/tasks/' + value)
                                }
                            >
                                Manage
                            </Button>
                            <Button
                                block
                                style={{
                                    margin: '4px 0px',
                                }}
                                loading={checkLoading(value)}
                                onClick={() => handleDisableTask(value)}
                            >
                                {record.disabled ? 'Continue' : 'Disable'}
                            </Button>
                            <Button
                                block
                                danger
                                style={{
                                    margin: '4px 0px',
                                }}
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

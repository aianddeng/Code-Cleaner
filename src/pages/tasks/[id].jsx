import { useState, useCallback, useEffect } from 'react'
import {
    Card,
    Button,
    Result,
    notification,
    Popconfirm,
    message,
    Progress,
} from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import Head from 'next/head'
import axios from 'axios'
import useSWR, { mutate } from 'swr'
import Wrapper from '../../components/wrapper'
import useActionLoading from '../../hooks/useActionLoading'

const fetcher = async url => {
    const { data } = await axios.get('/api' + url)
    return data
}

const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
        message,
        description,
        duration: 1 * 60,
    })
}

const TaskManage = ({ data: initialData }) => {
    const {
        actionKey,
        checkLoading,
        pushLoading,
        popLoading,
    } = useActionLoading('removeCode')

    const router = useRouter()

    const [tab, dispatchTab] = useState({
        key: 'All',
    })

    const [coupons, dispatchCoupons] = useState([])

    const { data } = useSWR('/tasks/' + router.query.id, fetcher, {
        initialData,
        refreshInterval: 1000,
    })

    useEffect(() => {
        handleTabChange(tab.key)
    }, [data])

    const handleTabChange = useCallback(
        key => {
            dispatchTab({ key })

            if (
                initialData.coupons.slice().filter(el => !el.validStatus)
                    .length &&
                !data.coupons.slice().filter(el => !el.validStatus).length
            ) {
                openNotificationWithIcon(
                    'success',
                    'Store: ' + data.storeName,
                    'This task is finished now. Please check out that coupon is valid right.'
                )
            }

            if (key === 'All') {
                dispatchCoupons(
                    data.coupons
                        .slice()
                        .sort(
                            (a, b) =>
                                (b.validStatus || 0) - (a.validStatus || 0)
                        )
                )
            } else if (key === 'Valid') {
                dispatchCoupons(
                    data.coupons.slice().filter(el => el.validStatus === 1)
                )
            } else if (key === 'Invalid') {
                dispatchCoupons(
                    data.coupons.slice().filter(el => el.validStatus === -1)
                )
            } else if (key === 'Repeat') {
                const couponsSlice = data.coupons.slice().map(el => el.code)

                const repeatCoupons = couponsSlice.filter(
                    code =>
                        couponsSlice.indexOf(code) !==
                        couponsSlice.lastIndexOf(code)
                )

                dispatchCoupons(
                    data.coupons
                        .slice()
                        .filter(el => repeatCoupons.includes(el.code))
                        .sort((a, b) => {
                            if (a.code < b.code) {
                                return -1
                            }
                            if (a.code > b.code) {
                                return 1
                            }
                            return 0
                        })
                )
            } else if (key === 'Waiting') {
                dispatchCoupons(
                    data.coupons.slice().filter(el => !el.validStatus)
                )
            }
        },
        [coupons]
    )

    const handleDeactiveCode = useCallback(async couponId => {
        pushLoading(couponId)
        message.loading({
            content: 'Waiting...',
            duration: 0,
            key: actionKey.current,
        })

        await axios.delete('/api/coupons', {
            data: {
                taskId: router.query.id,
                coupons: [couponId],
            },
        })

        message.success({
            content: `Remove the code: ${couponId}`,
            duration: 2.5,
            key: actionKey.current,
        })
        await mutate('/tasks/' + router.query.id)
        popLoading(couponId)
    }, [])

    return (
        <Wrapper>
            <Head>
                <title>Task Info - FatCoupon</title>
            </Head>
            <Card
                style={{ width: '100%' }}
                title={'Store: ' + data.storeName}
                tabList={[
                    { key: 'All', tab: `All(${data.coupons.length})` },
                    {
                        key: 'Valid',
                        tab: `Valid${
                            tab.key === 'Valid' ? `(${coupons.length})` : ''
                        }`,
                    },
                    {
                        key: 'Invalid',
                        tab: `Invalid${
                            tab.key === 'Invalid' ? `(${coupons.length})` : ''
                        }`,
                    },
                    {
                        key: 'Waiting',
                        tab: `Waiting${
                            tab.key === 'Waiting' ? `(${coupons.length})` : ''
                        }`,
                    },
                    {
                        key: 'Repeat',
                        tab: `Repeat${
                            tab.key === 'Repeat' ? `(${coupons.length})` : ''
                        }`,
                    },
                ]}
                activeTabKey={tab.key}
                onTabChange={key => handleTabChange(key)}
            >
                <Progress
                    format={precent => Math.round(precent) + '%'}
                    percent={
                        (data.coupons.slice().filter(el => el.validStatus)
                            .length /
                            data.coupons.length) *
                        100
                    }
                    success={{
                        percent:
                            (data.coupons
                                .slice()
                                .filter(el => el.validStatus === 1).length /
                                data.coupons.length) *
                            100,
                        strokeColor: '#1890ff',
                    }}
                    strokeColor="#ff4d4f"
                    className="mb-5 px-1"
                />
                {coupons.length ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {coupons.slice().map(el => (
                            <Card
                                className="m-1"
                                style={{
                                    border:
                                        el.validStatus === 1
                                            ? '1px solid #1890ff'
                                            : el.validStatus === -1
                                            ? '1px solid #ff4d4f'
                                            : '1px solid #cccccc88',
                                }}
                                hoverable
                                size="default"
                                key={el.id}
                                actions={[
                                    <Button>Manage</Button>,
                                    <Popconfirm
                                        title="Are you sure to deactive this code?"
                                        onConfirm={() =>
                                            handleDeactiveCode(el.id)
                                        }
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button
                                            danger
                                            loading={checkLoading(el.id)}
                                            disabled={
                                                el.validStatus !== -1 ||
                                                el.deactiveStatus
                                            }
                                        >
                                            Deactive
                                        </Button>
                                    </Popconfirm>,
                                ]}
                            >
                                <Card.Meta
                                    title={el.code}
                                    description={
                                        <p
                                            style={{
                                                whiteSpace: 'nowrap',
                                                wordBreak: 'hyphenate',
                                            }}
                                        >
                                            {el.description
                                                ? el.description.trim()
                                                : 'FatCoupon Code'}
                                        </p>
                                    }
                                />
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Result
                        icon={<SmileOutlined />}
                        title="Great, we have done all the coupons!"
                        extra={<Button type="primary">Back</Button>}
                    />
                )}
            </Card>
        </Wrapper>
    )
}

export const getServerSideProps = async context => {
    const taskId = context.query.id
    const { data } = await axios.get('/api/tasks/' + taskId)

    return {
        props: {
            data,
        },
    }
}

export default TaskManage

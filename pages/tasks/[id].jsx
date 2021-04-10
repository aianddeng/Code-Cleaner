import { useState, useCallback, useEffect } from 'react'
import { Card, Space, Button, Result, Skeleton } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import axios from 'axios'
import useSWR from 'swr'
import Wrapper from '../../components/wrapper'

const fetcher = async url => {
    const { data } = await axios.get('/api' + url)
    return data
}

const TaskManage = ({ data: initialData }) => {
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
            } else {
                dispatchCoupons(
                    data.coupons.slice().filter(el => !el.validStatus)
                )
            }
        },
        [coupons]
    )

    return (
        <Wrapper>
            <Card
                style={{ width: '100%' }}
                title={'Store: ' + data.storeName}
                extra={<a href="#">More</a>}
                tabList={[
                    { key: 'All', tab: 'All' },
                    { key: 'Valid', tab: 'Valid' },
                    { key: 'Invalid', tab: 'Invalid' },
                    { key: 'Waiting', tab: 'Waiting' },
                    { key: 'Repeat', tab: 'Repeat' },
                ]}
                activeTabKey={tab.key}
                onTabChange={key => handleTabChange(key)}
            >
                {coupons.length ? (
                    <Space wrap>
                        {coupons.slice().map(el => (
                            <Card
                                style={{
                                    width: 300,
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
                                    <Button disabled={el.validStatus}>
                                        Disable
                                    </Button>,
                                    <Button
                                        danger
                                        disabled={el.validStatus === 1}
                                    >
                                        Delete
                                    </Button>,
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
                    </Space>
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

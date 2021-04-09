import { useState, useCallback, useEffect } from 'react'
import { Card, Avatar, Space, Button, Result } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import { withRouter } from 'next/router'
import axios from 'axios'
import useSWR, { mutate } from 'swr'
import Wrapper from '../../components/wrapper'

const fetcher = async url => {
    const { data } = await axios.get('/api' + url)
    return data
}

const TaskManage = ({ data: initialData, router }) => {
    const [tab, dispatchTab] = useState({
        key: 'All',
    })

    const { data } = useSWR('/coupons/' + router.query.id, fetcher, {
        initialData,
        refreshInterval: 1000,
    })

    const [coupons, dispatchCoupons] = useState([])

    const handleTabChange = useCallback(
        key => {
            dispatchTab({ key })

            if (key === 'All') {
                dispatchCoupons([
                    ...data.coupons
                        .slice()
                        .filter(el => data.validCoupons.includes(el.code)),
                    ...data.coupons
                        .slice()
                        .filter(el => data.invalidCoupons.includes(el.code)),
                    ...data.coupons
                        .slice()
                        .filter(
                            el =>
                                ![
                                    ...data.validCoupons,
                                    ...data.invalidCoupons,
                                ].includes(el.code)
                        ),
                ])
            } else if (key === 'Valid') {
                dispatchCoupons(
                    data.coupons
                        .slice()
                        .filter(el => data.validCoupons.includes(el.code))
                )
            } else if (key === 'Invalid') {
                dispatchCoupons(
                    data.coupons
                        .slice()
                        .filter(el => data.invalidCoupons.includes(el.code))
                )
            } else if (key === 'Waiting') {
                dispatchCoupons(
                    data.coupons
                        .slice()
                        .filter(
                            el =>
                                ![
                                    ...data.validCoupons,
                                    ...data.invalidCoupons,
                                ].includes(el.code)
                        )
                )
            }
        },
        [coupons]
    )

    useEffect(() => {
        dispatchCoupons([
            ...data.coupons
                .slice()
                .filter(el => data.validCoupons.includes(el.code)),
            ...data.coupons
                .slice()
                .filter(el => data.invalidCoupons.includes(el.code)),
            ...data.coupons
                .slice()
                .filter(
                    el =>
                        ![
                            ...data.validCoupons,
                            ...data.invalidCoupons,
                        ].includes(el.code)
                ),
        ])
    }, [data])

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
                                    border: data.validCoupons.includes(el.code)
                                        ? '1px solid #00bbb866'
                                        : data.invalidCoupons.includes(el.code)
                                        ? '1px solid #c71a7166'
                                        : '1px solid #cccccc66',
                                }}
                                hoverable
                                size="default"
                                actions={[
                                    <Button>Disable</Button>,
                                    <Button danger>Delete</Button>,
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
                                            {el.description}
                                        </p>
                                    }
                                />
                            </Card>
                        ))}
                    </Space>
                ) : (
                    <Result
                        style={{ margin: 'auto', width: '100%' }}
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
    const { data } = await axios.get('/api/coupons/' + taskId)

    return {
        props: {
            data,
        },
    }
}

export default withRouter(TaskManage)

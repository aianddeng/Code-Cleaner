import { useState, useCallback, useEffect } from 'react'
import { Layout, Menu, Breadcrumb, Skeleton } from 'antd'
import Router, { useRouter } from 'next/router'

const { Header, Content } = Layout

const Wrapper = ({ children }) => {
    const router = useRouter()

    const [loading, dispatchLoading] = useState(false)

    const handleRedirect = useCallback(async path => {
        if (!loading && path !== router.route) {
            dispatchLoading(true)
            await Router.push(path)
        }
    })

    useEffect(() => {
        console.log(loading)
    }, [loading])

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header
                className="header"
                style={{ position: 'fixed', zIndex: 1, width: '100%' }}
            >
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[router.route]}
                >
                    <Menu.Item onClick={() => handleRedirect('/')} key="/">
                        Store List
                    </Menu.Item>
                    <Menu.Item
                        onClick={() => handleRedirect('/tasks')}
                        key="/tasks"
                    >
                        Task List
                    </Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px', marginTop: 64 }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>FatCoupon</Breadcrumb.Item>
                    <Breadcrumb.Item>Clear Invalid Code</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div
                    style={{
                        backgroundColor: '#ffffff',
                        padding: 24,
                        minHeight: 380,
                    }}
                >
                    <Skeleton loading={loading} active />
                    <Skeleton loading={loading} active>
                        {children}
                    </Skeleton>
                </div>
            </Content>
        </Layout>
    )
}

export default Wrapper

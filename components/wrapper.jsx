import { useState, useCallback } from 'react'
import { Layout, Menu, Breadcrumb, Skeleton } from 'antd'
import Router, { withRouter } from 'next/router'

const { Header, Content } = Layout

const Wrapper = ({ children, router }) => {
    const [loading, dispatchLoading] = useState(false)

    const redirect = useCallback(async path => {
        dispatchLoading(true)
        await Router.push(path)
        dispatchLoading(false)
    })

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header className="header">
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[router.route]}
                >
                    <Menu.Item onClick={() => redirect('/')} key="/">
                        Store List
                    </Menu.Item>
                    <Menu.Item onClick={() => redirect('/tasks')} key="/tasks">
                        Task List
                    </Menu.Item>
                    <Menu.Item key="3">Other Page</Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <Skeleton loading={loading} active>
                            {children}
                        </Skeleton>
                    </Content>
                </Layout>
            </Content>
        </Layout>
    )
}

export default withRouter(Wrapper)

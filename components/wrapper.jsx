import { Layout, Menu, Breadcrumb } from 'antd'
import Link from 'next/link'
import { withRouter } from 'next/router'

const { Header, Content } = Layout

const Wrapper = ({ currentKey, children, router }) => (
    <Layout>
        <Header className="header">
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={[router.route]}
            >
                <Menu.Item key="/">
                    <Link href="/">Store List</Link>
                </Menu.Item>
                <Menu.Item key="/tasks">
                    <Link href="/tasks">Task List</Link>
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
                    {children}
                </Content>
            </Layout>
        </Content>
    </Layout>
)

export default withRouter(Wrapper)

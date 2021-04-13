import { useRouter } from 'next/router'
import { Layout, Menu, Breadcrumb, Skeleton, BackTop } from 'antd'
import usePageLoading from '../hooks/usePageLoading'

const { Header, Content } = Layout

const Wrapper = ({ defaultLoading, children }) => {
    const router = useRouter()
    const { loading, handleRedirect } = usePageLoading()

    return (
        <Layout className="min-h-screen">
            <Header className="fixed z-10 w-full p-0 md:pl-12 md:pr-12">
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
            <Content className="mt-16 pl-2 pr-2 md:pl-12 md:pr-12">
                <Breadcrumb className="mt-3 mb-3">
                    <Breadcrumb.Item>FatCoupon</Breadcrumb.Item>
                    <Breadcrumb.Item>Clear Invalid Code</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div className="bg-white p-2 md:p-6">
                    <Skeleton loading={defaultLoading || loading} active />
                    <Skeleton loading={defaultLoading || loading} active>
                        {children}
                    </Skeleton>
                </div>
            </Content>
            <BackTop />
        </Layout>
    )
}

export default Wrapper

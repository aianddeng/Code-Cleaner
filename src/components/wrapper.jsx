import { useState, useCallback, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import { Layout, Menu, Breadcrumb, Skeleton, BackTop, Spin } from 'antd'
import {
    SettingOutlined,
    UnorderedListOutlined,
    AppstoreAddOutlined,
} from '@ant-design/icons'
import usePageLoading from '../hooks/usePageLoading'
import dynamic from 'next/dynamic'
import SideBar from './SideBar'
// const SideBar = dynamic(() => import('./SideBar'))
const { Header, Content } = Layout

const Wrapper = ({ defaultLoading, children }) => {
    const router = useRouter()

    const { loading, handleRedirect } = usePageLoading()

    const [visible, dispatchVisible] = useState(null)

    const switchVisible = useCallback(() => {
        const query = router.query
        if (visible) {
            delete query.settings
            Router.push({
                pathname: router.pathname,
                query: {
                    ...router.query,
                },
            })
        } else {
            Router.push({
                pathname: router.pathname,
                query: {
                    ...router.query,
                    settings: true,
                },
            })
        }
        dispatchVisible(!visible)
    })

    useEffect(() => {
        if (router.query.settings === 'true') dispatchVisible(true)
    }, [])

    return (
        <Layout className="min-h-screen">
            <Header className="fixed z-10 w-full p-0 md:pl-12 md:pr-12">
                <Menu
                    className="flex"
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[router.route]}
                >
                    <Menu.Item
                        icon={
                            <AppstoreAddOutlined className="align-text-bottom" />
                        }
                        onClick={() => handleRedirect('/')}
                        key="/"
                    >
                        Store List
                    </Menu.Item>
                    <Menu.Item
                        icon={
                            <UnorderedListOutlined className="align-text-bottom" />
                        }
                        onClick={() => handleRedirect('/tasks')}
                        key="/tasks"
                    >
                        Task List
                    </Menu.Item>
                    <Menu.Item
                        className="ml-auto"
                        onClick={() => switchVisible()}
                        key="/settings"
                        icon={<SettingOutlined className="align-text-bottom" />}
                    />
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
            <aside>
                {visible !== null && (
                    <SideBar
                        visible={visible}
                        handleSwitchVisible={switchVisible}
                    />
                )}
            </aside>
            <BackTop />
        </Layout>
    )
}

export default Wrapper

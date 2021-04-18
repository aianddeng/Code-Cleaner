import Link from 'next/link'
import useRouterLoading from '../hooks/useRouterLoading'
import useSideBarLoader from '../hooks/useSideBarLoader'

import { Layout, Menu, Breadcrumb, Skeleton, BackTop } from 'antd'
import {
  SettingOutlined,
  UnorderedListOutlined,
  AppstoreAddOutlined,
} from '@ant-design/icons'
import SideBar from '../components/SideBar'

const { Header, Content } = Layout

const Wrapper = ({ children }) => {
  const { router, loading } = useRouterLoading()
  const { visible, handleSwitchVisible } = useSideBarLoader()

  return (
    <Layout className="min-h-screen">
      <Header className="fixed z-10 w-full p-0 md:px-12">
        <Menu
          className="flex"
          theme="dark"
          mode="horizontal"
          selectedKeys={[router.route]}
        >
          <Menu.Item
            icon={<AppstoreAddOutlined className="md:align-text-bottom" />}
            key="/"
          >
            <Link href="/">Store List</Link>
          </Menu.Item>
          <Menu.Item
            icon={<UnorderedListOutlined className="md:align-text-bottom" />}
            key="/tasks"
          >
            <Link href="/tasks">Task List</Link>
          </Menu.Item>
          <Menu.Item
            icon={<SettingOutlined className="md:align-text-bottom" />}
            key="/settings"
            className="ml-auto"
            onClick={() => handleSwitchVisible()}
          ></Menu.Item>
        </Menu>
      </Header>
      <Content className="mt-16 px-2 md:px-12">
        <Breadcrumb className="my-3">
          <Breadcrumb.Item>FatCoupon</Breadcrumb.Item>
          <Breadcrumb.Item>Clear Invalid Code</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className="bg-white p-2 md:p-6">
          <Skeleton loading={loading} active />
          <Skeleton loading={loading} active>
            {children}
          </Skeleton>
        </div>
      </Content>
      <aside>
        <SideBar visible={visible} handleSwitchVisible={handleSwitchVisible} />
        <BackTop />
      </aside>
    </Layout>
  )
}

export default Wrapper

import Link from 'next/link'
import useMessagePop from '@hook/useMessagePop'
import useRouterLoading from '@hook/useRouterLoading'
import useSideBarLoader from '@hook/useSideBarLoader'

import { Layout, Menu, Breadcrumb, Skeleton, BackTop } from 'antd'
import {
  SettingOutlined,
  UnorderedListOutlined,
  MenuUnfoldOutlined,
  AppstoreAddOutlined,
  UpOutlined,
} from '@ant-design/icons'
import SideBar from '@comp/SideBar'

const { Header, Content } = Layout

const Wrapper = ({ children }) => {
  const { pushLocalMessage } = useMessagePop()
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
          <Menu.Item icon={<AppstoreAddOutlined />} key="/">
            <Link href="/">Store List</Link>
          </Menu.Item>
          <Menu.Item icon={<UnorderedListOutlined />} key="/tasks">
            <Link href="/tasks">Task List</Link>
          </Menu.Item>
          <Menu.Item icon={<MenuUnfoldOutlined />} key="/tasks/repeat">
            <Link href="/tasks/repeat">Repeat List</Link>
          </Menu.Item>
          <Menu.Item
            icon={<SettingOutlined />}
            key="/settings"
            className="ml-auto"
            onClick={() => handleSwitchVisible()}
          ></Menu.Item>
        </Menu>
      </Header>
      <Content className="mt-16 px-2 md:px-12">
        <Breadcrumb className="my-3">
          <Breadcrumb.Item>FatCoupon</Breadcrumb.Item>
          <Breadcrumb.Item>Clean Invalid Code</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className="bg-white dark:bg-[#1f1f1f] p-2 md:p-6">
          <Skeleton loading={loading} active />
          <Skeleton loading={loading} active>
            {children}
          </Skeleton>
        </div>
      </Content>
      <aside>
        <SideBar visible={visible} handleSwitchVisible={handleSwitchVisible} />
        <BackTop>
          <div className="rounded bg-blue-500 w-10 h-10 text-white font-blod text-lg flex items-center justify-center">
            <UpOutlined />
          </div>
        </BackTop>
      </aside>
    </Layout>
  )
}

export default Wrapper

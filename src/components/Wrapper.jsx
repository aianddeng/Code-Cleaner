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
  CloudUploadOutlined,
} from '@ant-design/icons'
import SideBar from '@comp/SideBar'
import { useRouter } from 'next/router'

const { Header, Content, Footer } = Layout

const Wrapper = ({ children }) => {
  const router = useRouter()
  const { pushLocalMessage } = useMessagePop()
  const { routerLoading } = useRouterLoading()
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
            <Link href="/">
              <a>Store List</a>
            </Link>
          </Menu.Item>
          <Menu.Item icon={<UnorderedListOutlined />} key="/tasks">
            <Link href="/tasks">
              <a>Task List</a>
            </Link>
          </Menu.Item>
          <Menu.Item icon={<MenuUnfoldOutlined />} key="/tasks/repeat">
            <Link href="/tasks/repeat">
              <a>Repeat List</a>
            </Link>
          </Menu.Item>
          <Menu.Item icon={<CloudUploadOutlined />} key="/upload">
            <Link href="/upload">
              <a>Upload Scripts</a>
            </Link>
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
          <Breadcrumb.Item>FatCoupon Cleaner</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link href="/">
              <a>Store</a>
            </Link>
          </Breadcrumb.Item>
          {router.asPath
            .split('?')
            .shift()
            .split('/')
            .filter(Boolean)
            .map((el, index) => (
              <Breadcrumb.Item key={el}>
                <Link
                  href={
                    '/' +
                    router.asPath
                      .split('?')
                      .shift()
                      .split('/')
                      .filter(Boolean)
                      .slice(0, index + 1)
                      .join('/')
                  }
                >
                  <a>
                    {el
                      .split('')
                      .map((elem, index) => (index ? elem : elem.toUpperCase()))
                      .join('')}
                  </a>
                </Link>
              </Breadcrumb.Item>
            ))}
        </Breadcrumb>
        <div className="bg-white dark:bg-[#1f1f1f] p-4 rounded-md shadow-md">
          <Skeleton key="1" loading={routerLoading} active />
          <Skeleton key="2" loading={routerLoading} active>
            {children}
          </Skeleton>
        </div>
      </Content>
      <Footer>
        <p className="text-center mb-0">
          - Product By{' '}
          <Link href="https://fatcoupon.com">
            <a>FatCoupon</a>
          </Link>
        </p>
      </Footer>
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

import moment from 'moment'
import Link from 'next/link'
import useMessages from '@hook/useMessages'

import { Drawer, Comment, Tooltip, Button, Empty } from 'antd'
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  BellOutlined,
} from '@ant-design/icons'

const SideBarMessages = ({ visible, handleSwitchVisible }) => {
  const { messages, pushLocalMessage, clearMessages } = useMessages()

  return (
    <Drawer
      visible={visible}
      width={300}
      title={
        <Button icon={<BellOutlined />} type="text" className="pl-0">
          User Messages
        </Button>
      }
      onClose={() => handleSwitchVisible()}
      footer={
        <div className="flex justify-end space-x-4">
          <Button onClick={() => clearMessages()}>Clear all messages</Button>
        </div>
      }
    >
      {messages.length ? (
        messages.map((el) => (
          <Comment
            key={el.date}
            author={
              <Link
                href={{
                  pathname: '/tasks',
                  query: {
                    storeId: el.storeId,
                  },
                }}
                prefetch={false}
              >
                <a>
                  <span>{el.storeName}</span>
                </a>
              </Link>
            }
            avatar={
              el.type === 'success' ? (
                <CheckCircleTwoTone twoToneColor="#52c41a" />
              ) : (
                <CloseCircleTwoTone twoToneColor="#eb2f96" />
              )
            }
            content={
              el.type === 'success'
                ? `Task <${el.storeName}> (id: ${el.id}) is completed. Check it now.`
                : `Task <${el.storeName}> (id: ${el.id}) is failed. Retry it now.`
            }
            actions={[
              <Link
                href={{
                  pathname: '/tasks/[slug]',
                  query: {
                    slug: el.id,
                  },
                }}
                prefetch={false}
              >
                <span>Task ID: {el.id}</span>
              </Link>,
            ]}
            datetime={
              <Tooltip title={moment(el.date).format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment(el.date).fromNow()}</span>
              </Tooltip>
            }
          />
        ))
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </Drawer>
  )
}

export default SideBarMessages

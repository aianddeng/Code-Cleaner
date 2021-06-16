import moment from 'moment'
import Link from 'next/link'
import useMessages from '@hook/useMessages'

import { Drawer, Skeleton, Comment, Tooltip, Button } from 'antd'
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  BellOutlined,
} from '@ant-design/icons'

const SideBarMessages = ({ visible, handleSwitchVisible }) => {
  const { messages, pushLocalMessage } = useMessages()

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
    >
      <Skeleton loading={false} active>
        {messages.map((el) => (
          <Comment
            key={el.id}
            author={
              el.storeName
              // <Link
              //   href={{
              //     pathname: '/tasks',
              //     query: {
              //       storeId: '',
              //     },
              //   }}
              // >
              //   <span>{el.storeName}</span>
              // </Link>
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
                  pathname: '/tasks/' + el.id,
                  query: {
                    messages: true,
                  },
                }}
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
        ))}
      </Skeleton>
    </Drawer>
  )
}

export default SideBarMessages

import { useState, useCallback, useMemo } from 'react'
import { Button, Popconfirm, Modal, Transfer, Spin, Tooltip } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useTaskActions from '@hook/useTaskActions'

import {
  RedoOutlined,
  ProfileOutlined,
  DeleteOutlined,
  ClearOutlined,
  FolderViewOutlined,
} from '@ant-design/icons'
import axios from 'axios'

const TaskActions = ({ data, mutate }) => {
  const router = useRouter()
  const isListPage = useMemo(() => {
    return router.route === '/tasks'
  }, [router.route])

  const {
    checkLoading,
    handleRetryTask,
    handleRemoveTask,
    handleDeactiveCode,
  } = useTaskActions(mutate)

  const [isModal, setIsModal] = useState(false)
  const [filterLoading, setFilterLoading] = useState(false)
  const [allDeactivateCode, setAllDeactivateCode] = useState([])
  const [targetDeactivateCode, setTargetDeactivateCode] = useState([])
  const filterDeactivateCode = useCallback(
    async (storeId = '') => {
      setFilterLoading(true)
      let invalidCoupons = []
      if (data.coupons) {
        invalidCoupons = data.coupons.filter((el) => el.validStatus === -1)
      } else if (storeId) {
        const { data } = await axios.get('/api/tasks/' + storeId)
        invalidCoupons = data.coupons.filter((el) => el.validStatus === -1)
      }

      setAllDeactivateCode(invalidCoupons)
      setTargetDeactivateCode(invalidCoupons.map((el) => el.id))
      setFilterLoading(false)
    },
    [data]
  )

  return (
    <>
      {isListPage ? (
        <div className="flex-auto md:flex-none mr-2 mt-1 mb-1">
          <Link
            href={{
              pathname: '/tasks/[slug]',
              query: {
                slug: data.id,
              },
            }}
          >
            <Tooltip title={isListPage ? 'Manage' : null}>
              <Button
                block={!isListPage}
                shape={isListPage ? 'circle' : false}
                icon={<ProfileOutlined />}
                type="primary"
              >
                {isListPage ? null : 'Manage'}
              </Button>
            </Tooltip>
          </Link>
        </div>
      ) : (
        <div className="flex-auto md:flex-none mr-2 mt-1 mb-1">
          <Link
            href={{
              pathname: '/tasks',
              query: { storeId: data.storeId },
            }}
          >
            <Tooltip title={isListPage ? 'Check Tasks' : null}>
              <Button
                block={!isListPage}
                shape={isListPage ? 'circle' : false}
                icon={<FolderViewOutlined />}
                type="primary"
              >
                {isListPage ? null : 'Check Tasks'}
              </Button>
            </Tooltip>
          </Link>
        </div>
      )}
      <div className="flex-auto md:flex-none mr-2 mt-1 mb-1">
        <Modal
          centered
          title="Choice promo code that need deactive"
          okText="Submit"
          visible={isModal}
          onOk={() => {
            handleDeactiveCode(data.id, targetDeactivateCode)
            setIsModal(false)
          }}
          onCancel={() => {
            setIsModal(false)
          }}
        >
          <Spin spinning={filterLoading} delay={100}>
            <Transfer
              oneWay
              titles={['Keep', 'Deactive']}
              listStyle={{
                width: 600,
                height: 400,
              }}
              rowKey={(el) => el.id}
              dataSource={allDeactivateCode}
              render={(el) => ({
                label: el.code,
                value: el.id,
              })}
              targetKeys={targetDeactivateCode}
              onChange={(nextTargetKeys) => {
                setTargetDeactivateCode(nextTargetKeys)
              }}
            />
          </Spin>
        </Modal>
        <Tooltip title={isListPage ? 'Deactive Codes' : null}>
          <Button
            block={!isListPage}
            shape={isListPage ? 'circle' : false}
            icon={<ClearOutlined />}
            onClick={() => {
              filterDeactivateCode(data.id)
              setIsModal(true)
            }}
          >
            {isListPage ? null : 'Deactive Codes'}
          </Button>
        </Tooltip>
      </div>
      <div className="flex-auto md:flex-none mr-2 mt-1 mb-1">
        <Tooltip title={isListPage ? 'Retry' : null}>
          <Button
            block={!isListPage}
            shape={isListPage ? 'circle' : false}
            icon={<RedoOutlined />}
            loading={checkLoading(data.id)}
            disabled={data.state !== 'failed'}
            onClick={() => handleRetryTask(data.id)}
          >
            {isListPage ? null : 'Retry'}
          </Button>
        </Tooltip>
      </div>
      <div className="flex-auto md:flex-none mr-2 mt-1 mb-1">
        <Tooltip title={isListPage ? 'Delete' : null}>
          <Popconfirm
            disabled={data.state === 'active'}
            okText="Yes"
            cancelText="No"
            title="Are you sure to delete this task?"
            onConfirm={() => handleRemoveTask(data.id)}
          >
            <Button
              block={!isListPage}
              shape={isListPage ? 'circle' : false}
              icon={<DeleteOutlined />}
              disabled={data.state === 'active' || data.state === 'completed'}
              danger
              loading={checkLoading(data.id)}
            >
              {isListPage ? null : 'Delete'}
            </Button>
          </Popconfirm>
        </Tooltip>
      </div>
    </>
  )
}

export default TaskActions

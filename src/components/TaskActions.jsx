import { useState, useCallback, useEffect } from 'react'
import { Button, Popconfirm, Modal, Transfer } from 'antd'
import Link from 'next/link'

import useTaskActions from '@hook/useTaskActions'

const TaskActions = ({ data, showManage, mutate }) => {
  const {
    checkLoading,
    handleRetryTask,
    handleRemoveTask,
    handleDeactiveCode,
  } = useTaskActions(mutate)

  const [isModal, setIsModal] = useState(false)
  const [allDeactivateCode, setAllDeactivateCode] = useState([])
  const [targetDeactivateCode, setTargetDeactivateCode] = useState([])
  const filterDeactivateCode = useCallback(() => {
    const invalidCoupons = data.coupons.filter((el) => el.validStatus === -1)

    setAllDeactivateCode(invalidCoupons)
    setTargetDeactivateCode(invalidCoupons.map((el) => el.id))
  }, [data])

  useEffect(() => {
    return () => {}
  }, [])

  return (
    <>
      <div className="flex-auto">
        {showManage ? (
          <Button block type="primary">
            <Link
              href={{
                pathname: '/tasks/[slug]',
                query: {
                  slug: data.id,
                },
              }}
            >
              <a>Manage</a>
            </Link>
          </Button>
        ) : (
          <>
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
            </Modal>
            <Button
              block
              type="primary"
              onClick={() => {
                filterDeactivateCode()
                setIsModal(true)
              }}
            >
              Deactive All Invalid Coupons
            </Button>
          </>
        )}
      </div>
      <div className="flex-auto">
        <Button
          block
          loading={checkLoading(data.id)}
          disabled={data.state !== 'failed'}
          onClick={() => handleRetryTask(data.id)}
        >
          Retry
        </Button>
      </div>
      <div className="flex-auto">
        <Popconfirm
          disabled={data.state === 'active'}
          okText="Yes"
          cancelText="No"
          title="Are you sure to delete this task?"
          onConfirm={() => handleRemoveTask(data.id)}
        >
          <Button
            block
            disabled={data.state === 'active' || data.state === 'completed'}
            danger
            block={true}
            loading={checkLoading(data.id)}
          >
            Delete
          </Button>
        </Popconfirm>
      </div>
    </>
  )
}

export default TaskActions

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
      {showManage ? (
        <Button type="primary" className="flex-auto">
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
            className="flex-auto"
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
      <Button
        loading={checkLoading(data.id)}
        disabled={data.state !== 'failed'}
        onClick={() => handleRetryTask(data.id)}
        className="flex-auto"
      >
        Retry
      </Button>
      <Popconfirm
        disabled={data.state === 'active'}
        okText="Yes"
        cancelText="No"
        title="Are you sure to delete this task?"
        onConfirm={() => handleRemoveTask(data.id)}
      >
        <Button
          disabled={data.state === 'active' || data.state === 'completed'}
          danger
          block={true}
          loading={checkLoading(data.id)}
          className="flex-auto"
        >
          Delete
        </Button>
      </Popconfirm>
    </>
  )
}

export default TaskActions

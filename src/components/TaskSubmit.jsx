import { useState, useCallback, useEffect } from 'react'
import axios from 'axios'
import useActionLoading from '@hook/useActionLoading'

import { Input, message, Modal, Radio, Form } from 'antd'

const { useForm } = Form

const TaskSubmit = ({ isModal, setIsModal, taskData }) => {
  const [form] = useForm()

  const { actionKey, checkLoading, pushLoading, popLoading } =
    useActionLoading('addtotask')

  const [showRepeatOptions, setShowRepeatOptions] = useState(false)
  const [changeProductLink, setChangeProductLink] = useState(false)

  const handleSubmitTask = useCallback(async () => {
    const formData = form.getFieldsValue()

    pushLoading(formData.storeId)
    message.loading({
      content: 'Waiting...',
      duration: 0,
      key: actionKey.current,
    })

    if (
      changeProductLink &&
      (formData.productLink.startsWith('http') || !formData.productLink)
    ) {
      await axios.put('/api/product', formData)
    }

    if (formData.taskType === 'once') {
      const { data } = await axios.put('/api/tasks', formData)

      message.success({
        content: `Create new task: ${data.ids.join(', ')}`,
        duration: 6,
        key: actionKey.current,
      })
    } else if (formData.taskType === 'repeat') {
      await axios.put('/api/tasks/repeat', formData)

      message.success({
        content: `Create new repeat task: ${
          formData.storeName || '<Bulk Task Submit>'
        }`,
        duration: 6,
        key: actionKey.current,
      })
    }

    popLoading(formData.storeId)
  }, [changeProductLink])

  useEffect(() => {
    setChangeProductLink(false)
    form.setFieldsValue(taskData)
  }, [taskData])

  useEffect(async () => {
    form.setFieldsValue({
      productLink: 'Loading...',
    })

    const { data } = await axios.get('/api/product', {
      params: {
        storeId: taskData.storeId,
      },
    })

    form.setFieldsValue(data)
  }, [taskData.storeId])

  return (
    <Modal
      centered
      confirmLoading={checkLoading(taskData.storeId)}
      title="Submit Clean Invalid Code Task"
      okText="Submit"
      visible={isModal}
      onOk={async () => {
        await handleSubmitTask()
        setIsModal(false)
      }}
      onCancel={() => {
        setIsModal(false)
      }}
    >
      <div className="max-h-[70vh] overflow-y-scroll">
        <h2 className="mb-6 font-normal">
          Store Name:
          <span className="font-bold">
            {taskData.storeName || '<Bulk Task Submit>'}
          </span>
        </h2>
        <Form
          form={form}
          preserve={false}
          layout="vertical"
          initialValues={{
            storeId: '',
            taskType: 'once',
            repeatRule: 'day',
            repeatTime: 'current',
            promoType: 'exclusive',
            autoDeactive: false,
            productLink: '',
          }}
        >
          <Form.Item label="Store ID" name="storeId" required>
            <Input disabled />
          </Form.Item>
          <Form.Item label="Task Type" name="taskType" required>
            <Radio.Group
              onChange={({ target: { value } }) =>
                setShowRepeatOptions(value === 'repeat')
              }
            >
              <Radio.Button value="once">Once</Radio.Button>
              <Radio.Button value="repeat">Repeat</Radio.Button>
            </Radio.Group>
          </Form.Item>
          {showRepeatOptions ? (
            <>
              <Form.Item label="Repeat Rule" name="repeatRule" required>
                <Radio.Group>
                  <Radio.Button value="hour">Each Hour</Radio.Button>
                  <Radio.Button value="day">Each Day</Radio.Button>
                  <Radio.Button value="week">Each Week</Radio.Button>
                  <Radio.Button value="more" disabled={true}>
                    More...
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="Repeat Time" name="repeatTime" required>
                <Radio.Group>
                  <Radio.Button value="zero">Zero</Radio.Button>
                  <Radio.Button value="current">Current</Radio.Button>
                  <Radio.Button value="more" disabled={true}>
                    More...
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>
            </>
          ) : null}
          <Form.Item label="Auto Deactive" name="autoDeactive" required>
            <Radio.Group>
              <Radio.Button value={true}>Yes</Radio.Button>
              <Radio.Button value={false}>No</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Promo Type" name="promoType" required>
            <Radio.Group>
              <Radio.Button value="all">All</Radio.Button>
              <Radio.Button value="public">Public</Radio.Button>
              <Radio.Button value="exclusive">Exclusive</Radio.Button>
            </Radio.Group>
          </Form.Item>
          {taskData.storeId.includes(',') ? null : (
            <Form.Item label="Product Link" name="productLink">
              <Input
                placeholder="Submit blank product link to use default"
                onChange={() => setChangeProductLink(true)}
              />
            </Form.Item>
          )}
        </Form>
      </div>
    </Modal>
  )
}

export default TaskSubmit

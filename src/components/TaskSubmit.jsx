import { useState, useCallback, useEffect } from 'react'
import axios from 'axios'
import { mutate } from 'swr'
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
      (changeProductLink && formData.productLink.startsWith('http')) ||
      !formData.productLink
    ) {
      await axios.put('/api/product', formData)
    }

    if (formData.taskType === 'once') {
      const { data } = await axios.put('/api/tasks', formData)
      await mutate(['/api/tasks', 10, 1, undefined])

      message.success({
        content: `Create a new task: ${data.id}`,
        duration: 6,
        key: actionKey.current,
      })
    } else if (formData.taskType === 'repeat') {
      const { data } = await axios.put('/api/tasks/repeat', formData)
      await mutate('/api/tasks/repeat', data, false)

      message.success({
        content: `Create a new repeat task: ${formData.storeName}`,
        duration: 6,
        key: actionKey.current,
      })
    }

    popLoading(formData.storeId)
  }, [changeProductLink])

  useEffect(() => {
    setChangeProductLink(false)
    form.setFieldsValue({
      productLink: '',
    })
    form.setFieldsValue(taskData)

    if (taskData && taskData.storeId) {
      axios
        .get('/api/product', {
          params: {
            storeId: taskData.storeId,
          },
        })
        .then((res) =>
          form.setFieldsValue({
            productLink: res.data.productLink,
          })
        )
    }
  }, [taskData])

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
      <div>
        <h2 className="mb-6 font-normal">
          Store Name: <span className="font-bold">{taskData.storeName}</span>
        </h2>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            storeId: '',
            taskType: 'once',
            repeatRule: 'day',
            repeatTime: 'current',
            autoDeactive: true,
            productLink: '',
          }}
        >
          <Form.Item lable="Store Name" name="storeName" className="hidden">
            <Input disabled />
          </Form.Item>
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
          <Form.Item label="Product Link" name="productLink">
            <Input
              placeholder="Submit blank product link to use default"
              onChange={() => setChangeProductLink(true)}
            />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}

export default TaskSubmit

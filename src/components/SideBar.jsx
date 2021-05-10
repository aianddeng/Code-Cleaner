import { useCallback } from 'react'
import useSWR from 'swr'
import axios from 'axios'

import { Drawer, Button, Form, Select, Input, Skeleton, Radio } from 'antd'

const { useForm } = Form

const SideBar = ({ visible, handleSwitchVisible }) => {
  const [form] = useForm()
  const { data, mutate } = useSWR('/api/settings')

  const handleSubmitSettings = useCallback(async () => {
    const { data: afterData } = await axios.post(
      '/api/settings',
      form.getFieldsValue()
    )

    if (afterData.themeType !== data.themeType) {
      location.reload()
      return
    }

    form.setFieldsValue(afterData)
    await mutate(afterData, false)
    await handleSwitchVisible()
  })

  const handleResetedSettings = useCallback(() => {
    form.resetFields()
  })

  return (
    <Drawer
      visible={visible}
      title="Global Settings"
      onClose={() => handleSwitchVisible()}
      footer={
        <div className="flex justify-end space-x-4">
          <Button onClick={() => handleResetedSettings()}>Reset</Button>
          <Button type="primary" onClick={() => handleSubmitSettings()}>
            Submit
          </Button>
        </div>
      }
    >
      <Skeleton loading={!data} active>
        <Form form={form} layout="vertical" initialValues={data}>
          <Form.Item name="promoType" label="Promo Code Type" required={true}>
            <Select placeholder="Please select a promocode type">
              <Select.Option value="all">ALL</Select.Option>
              <Select.Option value="public">PUBLIC</Select.Option>
              <Select.Option value="exclusive">EXCLUSIVE</Select.Option>
            </Select>
          </Form.Item>
          {/* <Form.Item
            name="concurrency"
            label="Server Concurrency"
            required={true}
          >
            <Input type="number" min="1" max="5" />
          </Form.Item> */}
          <Form.Item name="attempts" label="Task Attempts" required={true}>
            <Input type="number" min="1" max="100" />
          </Form.Item>
          <Form.Item name="themeType" label="Website Theme" required={true}>
            <Radio.Group placeholder="Please select a website theme">
              <Radio.Button value="white">White</Radio.Button>
              <Radio.Button value="dark">Dark</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Skeleton>
    </Drawer>
  )
}

export default SideBar

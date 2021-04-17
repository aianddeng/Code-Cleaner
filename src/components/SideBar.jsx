import { Drawer, Button, Form, Select, Input, Spin } from 'antd'
import useSWR, { mutate } from 'swr'
import { useCallback } from 'react'
import axios from 'axios'

const SideBar = ({ visible, handleSwitchVisible: switchVisible }) => {
  const [form] = Form.useForm()

  const { data } = useSWR('/api/settings')

  const handleSubmitSettings = useCallback(async () => {
    const values = form.getFieldsValue()
    const { data } = await axios.post('/api/settings', values)

    form.setFieldsValue(data)
    await mutate('/api/settings', data, false)
    await switchVisible()

    return true
  })

  const handleResetedSettings = useCallback(() => {
    form.resetFields()
  })

  return (
    <Drawer
      visible={visible}
      title="Global Settings"
      onClose={() => switchVisible()}
      footer={
        <div className="flex justify-end space-x-4">
          <Button onClick={() => handleResetedSettings()}>Reset</Button>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => handleSubmitSettings()}
          >
            Submit
          </Button>
        </div>
      }
    >
      {data ? (
        <Form form={form} layout="vertical" initialValues={data}>
          <Form.Item name="promoType" label="Promo Code Type" required={true}>
            <Select placeholder="Please select a promocode type">
              <Select.Option value="all">ALL</Select.Option>
              <Select.Option value="public">PUBLIC</Select.Option>
              <Select.Option value="exclusive">EXCLUSIVE</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="concurrency"
            label="Server Concurrency"
            required={true}
          >
            <Input type="number" min="1" max="3" />
          </Form.Item>
        </Form>
      ) : (
        <Spin className="block m-auto" />
      )}
    </Drawer>
  )
}

export default SideBar

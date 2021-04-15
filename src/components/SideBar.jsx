import { Drawer, Button, Form, Select, Spin } from 'antd'
import useSWR, { mutate } from 'swr'
import { useCallback } from 'react'
import axios from 'axios'

const SideBar = ({ visible, handleSwitchVisible: switchVisible }) => {
    const [form] = Form.useForm()

    const { data, error } = useSWR('/api/settings')

    const handleSubmitSettings = useCallback(async () => {
        const values = form.getFieldsValue()
        const { data } = await axios.post('/api/settings', values)

        form.setFieldsValue(data)
        mutate('/api/settings')
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
                    <Button onClick={() => handleResetedSettings()}>
                        Reset
                    </Button>
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
            {!data && !error ? (
                <Spin className="block m-auto" />
            ) : (
                <Form form={form} layout="vertical" initialValues={data}>
                    <Form.Item
                        name="promoType"
                        label="Promo Code Type"
                        required={true}
                    >
                        <Select placeholder="Please select a promocode type">
                            <Select.Option value="all">ALL</Select.Option>
                            <Select.Option value="public">PUBLIC</Select.Option>
                            <Select.Option value="exclusive">
                                EXCLUSIVE
                            </Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            )}
        </Drawer>
    )
}

export default SideBar

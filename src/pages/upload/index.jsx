import Head from 'next/head'
import { Upload } from 'antd'
import { CloudUploadOutlined, UploadOutlined } from '@ant-design/icons'

const UploadPage = () => {
  return (
    <>
      <Head>
        <title>Upload Scripts - Fatcoupon</title>
      </Head>
      <h2>Upload Scripts To Server</h2>
      <div className="space-y-4 md:space-y-0 md:space-x-8 md:flex md:flex-row md:justify-evenly md:p-4">
        <div className="w-auto md:w-96 lg:flex-grow lg:self-start">
          <Upload.Dragger
            name="mappings"
            accept="text/javascript"
            action="/api/upload"
            multiple
            directory
          >
            <p className="ant-upload-drag-icon">
              <UploadOutlined />
            </p>
            <p className="ant-upload-text">Upload Mappings</p>
          </Upload.Dragger>
        </div>
        <div className="w-auto md:w-96 lg:flex-grow lg:self-start">
          <Upload.Dragger
            name="connectors"
            accept="text/javascript"
            action="/api/upload"
            multiple
            directory
          >
            <p className="ant-upload-drag-icon">
              <CloudUploadOutlined />
            </p>
            <p className="ant-upload-text">Upload Connectors</p>
          </Upload.Dragger>
        </div>
      </div>
    </>
  )
}

export default UploadPage

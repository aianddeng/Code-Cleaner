import Head from 'next/head'
import { Upload } from 'antd'
import { CloudUploadOutlined } from '@ant-design/icons'

const UploadPage = ({ uploadActions }) => (
  <>
    <Head>
      <title>Upload Scripts - Fatcoupon</title>
    </Head>
    <h2>Upload Scripts To Server</h2>
    <div className="space-y-4 md:space-y-0 md:space-x-8 md:flex md:flex-row md:justify-evenly md:p-4">
      {uploadActions.map((el) => (
        <div
          className="w-auto md:w-96 lg:flex-grow lg:self-start"
          key={el.name}
        >
          <Upload.Dragger
            name={el.name}
            accept="text/javascript"
            action="/api/upload"
            multiple
            directory
          >
            <p className="ant-upload-drag-icon">
              <CloudUploadOutlined />
            </p>
            <p className="ant-upload-text">{el.text}</p>
          </Upload.Dragger>
        </div>
      ))}
    </div>
  </>
)

export const getStaticProps = () => {
  const uploadActions = [
    {
      name: 'mappings',
      text: 'Upload Mappings',
    },
    {
      name: 'cookies',
      text: 'Upload Cookies',
    },
    {
      name: 'connectors',
      text: 'Upload Connectors',
    },
  ]

  return {
    props: {
      uploadActions,
    },
  }
}

export default UploadPage

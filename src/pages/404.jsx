import Link from 'next/link'
import { Result, Button } from 'antd'

const NotFoundPage = () => (
  <Result
    status="404"
    title="NOT FOUND"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button type="primary">
        <Link href="/">Back Home</Link>
      </Button>
    }
  />
)

export default NotFoundPage

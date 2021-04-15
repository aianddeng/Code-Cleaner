import { Result, Button } from 'antd'
import Wrapper from '../components/Wrapper'
import usePageLoading from '../hooks/usePageLoading'

const NotFoundPage = () => {
    const { loading, handleRedirect } = usePageLoading()

    return (
        <Wrapper defaultLoading={loading}>
            <Result
                status="404"
                title="NOT FOUND"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Button onClick={() => handleRedirect('/')} type="primary">
                        Back Home
                    </Button>
                }
            />
        </Wrapper>
    )
}

export default NotFoundPage

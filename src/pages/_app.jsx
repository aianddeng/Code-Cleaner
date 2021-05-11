import Wrapper from '@comp/Wrapper'
import '../style/index.scss'

const MyApp = ({ Component, pageProps }) => (
  <Wrapper>
    <Component {...pageProps} />
  </Wrapper>
)

export default MyApp

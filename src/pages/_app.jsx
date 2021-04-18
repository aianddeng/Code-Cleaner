import 'antd/dist/antd.min.css'
import 'tailwindcss/tailwind.css'
import Wrapper from '../components/Wrapper'

const MyApp = ({ Component, pageProps }) => (
  <Wrapper>
    <Component {...pageProps} />
  </Wrapper>
)

export default MyApp

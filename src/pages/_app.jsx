import 'antd/dist/antd.min.css'
import 'tailwindcss/tailwind.css'
import '../style/global.css'
import Wrapper from '@comp/Wrapper'

const MyApp = ({ Component, pageProps }) => (
  <Wrapper>
    <Component {...pageProps} />
  </Wrapper>
)

export default MyApp
